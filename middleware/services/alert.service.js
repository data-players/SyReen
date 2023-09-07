const urlJoin = require("url-join");
const { Errors: E } = require("moleculer-web");
const { ACTOR_TYPES, ACTIVITY_TYPES } = require('@semapps/activitypub');
const { ControlledContainerMixin } = require('@semapps/ldp');
const { MIME_TYPES } = require('@semapps/mime-types');
const CONFIG = require("../config/config");

const BOT_SLUG = 'alert-bot';
const BOT_URI = urlJoin(CONFIG.HOME_URL, 'actors', BOT_SLUG);
const BOT_NAME = 'Alert Bot';

const RELAY_URI = urlJoin(CONFIG.HOME_URL, 'actors', 'relay');

// Taken from https://stackoverflow.com/a/21623206/7900695
const distanceBetweenPoints = (lat1, lon1, lat2, lon2) => {
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const a = 0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

const defaultToArray = value => (!value ? [] : Array.isArray(value) ? value : [value]);

const AlertService = {
  name: 'alert',
  mixins: [ControlledContainerMixin],
  settings: {
    path: '/alerts',
    acceptedTypes: ['syreen:Alert'],
    dereference: ['syreen:hasAddress'],
    permissions: {
      anyUser: {
        read: true,
        write: true,
        append: true
      }
    },
    newResourcesPermissions: webId => ({
      user: {
        uri: webId,
        read: true,
        write: true,
        control: true
      }
    })
  },
  dependencies: [
    'activitypub',
    'activitypub.follow', // Ensure the /followers and /following collection are registered
    'auth.account',
    'ldp.container',
    'ldp.registry'
  ],
  async started() {
    const botExist = await this.broker.call('auth.account.usernameExists', { username: BOT_SLUG });

    if (!botExist) {
      this.logger.info(`Bot ${BOT_URI} does not exist yet, creating it...`);

      const account = await this.broker.call(
        'auth.account.create',
        {
          username: BOT_SLUG,
          webId: BOT_URI
        },
        { meta: { isSystemCall: true } }
      );

      try {
        await this.broker.call('ldp.container.post', {
          containerUri: urlJoin(CONFIG.HOME_URL, 'actors'),
          slug: BOT_SLUG,
          resource: {
            '@context': 'https://www.w3.org/ns/activitystreams',
            type: ACTOR_TYPES.APPLICATION,
            preferredUsername: BOT_SLUG,
            name: BOT_NAME
          },
          contentType: MIME_TYPES.JSON,
          webId: 'system'
        });
      } catch(e) {
        // Delete account if resource creation failed, or it may cause problems when retrying
        await this.broker.call('auth.account.remove', { id: account['@id'] });
        throw e;
      }
    }

    // Wait until the actor is fully created
    this.botActor = await this.broker.call('activitypub.actor.awaitCreateComplete', { actorUri: BOT_URI });

    // Cache all categories for faster matching
    const categoriesContainer = await this.broker.call('ldp.container.get', {
      containerUri: urlJoin(CONFIG.HOME_URL, 'batiprix'),
      accept: MIME_TYPES.JSON,
      webId: 'system'
    });

    this.categories = categoriesContainer['ldp:contains'].map(resource => ({ id: resource.id, parent: resource['skos:broader'] }));

    this.logger.info(`Loaded in cache ${this.categories.length} Batiprix categories`);
  },
  actions: {
    async announce(ctx) {
      const { offer } = ctx.params;
      let actorsToNotify = [];

      console.log('announce', offer);

      const alertsContainer = await this.actions.list({ webId: 'system' }, { parentCtx: ctx });

      console.log('alertes', alertsContainer);

      const location = await ctx.call('activitypub.object.get', { objectUri: offer['syreen:hasLocation'] });

      console.log('location', location);
      
      for (let alert of alertsContainer['ldp:contains']) {
        if (this.matchLocation(location, alert) && this.matchCategory(offer, alert)) {
          console.log('Match!!', offer, alert)
          actorsToNotify.push(alert['syreen:actor']);
        }
      }

      console.log('actorsToNotify', actorsToNotify);

      if (actorsToNotify.length > 0) {
        await ctx.call(
          'activitypub.outbox.post',
          {
            collectionUri: this.botActor.outbox,
            type: ACTIVITY_TYPES.ANNOUNCE,
            object: offer.id,
            to: actorsToNotify
          },
          {
            meta: {
              webId: this.botActor.id
            }
          }
        );
      }
    }
  },
  hooks: {
    before: {
      async post(ctx) {
        const { resource } = ctx.params;
        if (resource['syreen:actor'] !== ctx.meta.webId) throw new E.ForbiddenError();
      }
    }
  },
  methods: {
    matchLocation(location, alert) {
      // If no location is set in the offer, it is not a geo-localized object
      if (!location) return false;
      // If no location is set in the alert, the user wants to be notified of all objects
      if (!alert['syreen:latitude'] || !alert['syreen:longitude']) return true;
      const distance = distanceBetweenPoints(
        parseFloat(alert['syreen:latitude']),
        parseFloat(alert['syreen:longitude']),
        parseFloat(location['vcard:hasAddress']?.['vcard:hasGeo']?.['vcard:latitude']),
        parseFloat(location['vcard:hasAddress']?.['vcard:hasGeo']?.['vcard:longitude'])
      );
      return distance <= parseInt(alert['syreen:radius']);
    },
    matchCategory(offer, alert) {
      // If no category is set in the offer, it is not a geo-localized object
      if (!offer['syreen:hasBatiprixCategory']) return false;
      // Backward compatibility. Ignore alerts with CSTB category
      if (!alert['syreen:hasBatiprixCategory'] && alert['syreen:hasCategory']) return false;
      // If no category is set in the alert, the user wants to be notified of all objects
      if (!alert['syreen:hasBatiprixCategory']) return true;
      // Look recursively through the categories
      return this.recursiveMatch(alert['syreen:hasBatiprixCategory'], offer['syreen:hasBatiprixCategory']);
    },
    recursiveMatch(alertCategoryUri, offerCategoryUri) {
      if (alertCategoryUri === offerCategoryUri) {
        return true;
      } else {
        // Look for the parent category of the offer
        const offerCategory = this.categories.find(c => c.id === offerCategoryUri);
        if (offerCategory && offerCategory.parent) {
          // Parent category found, see if it matches with alert category
          return this.recursiveMatch(alertCategoryUri, offerCategory.parent)
        } else {
          // Offer category has no parent. End search.
          return false;
        }
      }
    }
  },
  events: {
    async 'activitypub.inbox.received'(ctx) {
      const { recipients, activity } = ctx.params;

      if (
        recipients.includes(RELAY_URI) &&
        activity.type === ACTIVITY_TYPES.ANNOUNCE &&
        activity.object &&
        activity.object.type === ACTIVITY_TYPES.CREATE
      ) {
        const announcedObject = await ctx.call('activitypub.object.get', { objectUri: activity.object.object });
        if (announcedObject.type === 'syreen:Offer') {
          this.actions.announce({ offer: announcedObject }, { parentCtx: ctx });
        }
      }
    }
  }
};

module.exports = AlertService;
