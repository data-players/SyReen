const urlJoin = require('url-join');
const { MIME_TYPES } = require('@semapps/mime-types');
const { ACTOR_TYPES, ACTIVITY_TYPES, ActivitiesHandlerMixin } = require('@semapps/activitypub');
const CONFIG = require('../config/config');

const delay = t => new Promise(resolve => setTimeout(resolve, t));

const GROUP_SLUG = 'syreen';
const GROUP_URI = urlJoin(CONFIG.HOME_URL, 'actors', GROUP_SLUG);

const GroupService = {
  name: 'group',
  mixins: [ActivitiesHandlerMixin],
  dependencies: [
    'api',
    'activitypub',
    'activitypub.follow',
    'auth.account',
    'ldp.container',
    'ldp.registry'
  ],
  async started() {
    await this.broker.call('api.addRoute', {
      route: {
        path: '/_system',
        name: 'group-moderation',
        bodyParsers: { json: true },
        aliases: {
          'GET /accept/:secretKey': 'group.acceptJoin',
          'GET /reject/:secretKey': 'group.rejectJoin'
        }
      }
    });

    const groupExist = await this.broker.call('auth.account.usernameExists', { username: GROUP_SLUG });

    if (!groupExist) {
      this.logger.info(`Group ${GROUP_URI} does not exist yet, creating it...`);

      const account = await this.broker.call(
        'auth.account.create',
        {
          username: GROUP_SLUG,
          webId: GROUP_URI
        },
        { meta: { isSystemCall: true } }
      );

      try {
        await this.broker.call('ldp.container.post', {
          containerUri: urlJoin(CONFIG.HOME_URL, 'actors'),
          slug: GROUP_SLUG,
          resource: {
            '@context': 'https://www.w3.org/ns/activitystreams',
            type: ACTOR_TYPES.GROUP,
            preferredUsername: 'syreen',
            name: 'Syreen'
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
    this.groupActor = await this.broker.call('activitypub.actor.awaitCreateComplete', { actorUri: GROUP_URI });
  },
  actions: {
    async acceptJoin(ctx) {
      const { activityUri, secretKey } = ctx.params;

      if (secretKey !== CONFIG.SECRET_KEY) throw new Error('Invalid key provided');

      const activity = await ctx.call('activitypub.activity.get', {
        resourceUri: activityUri,
        webId: this.groupActor.id,
      });

      await ctx.call('activitypub.outbox.post', {
        collectionUri: this.groupActor.outbox,
        type: ACTIVITY_TYPES.ACCEPT,
        object: activity.id,
        to: activity.actor
      });

      await ctx.call('activitypub.follow.addFollower', {
        follower: activity.actor,
        following: GROUP_URI
      });

      await ctx.call('activitypub.outbox.post', {
        collectionUri: this.groupActor.outbox,
        type: ACTIVITY_TYPES.ANNOUNCE,
        object: {
          type: ACTIVITY_TYPES.JOIN,
          actor: activity.actor,
          object: this.groupActor.id,
        },
        to: this.groupActor.followers
      });

      // Reset meta set by activitypub.outbox.post
      ctx.meta = {};

      return 'OK';
    },
    async rejectJoin(ctx) {
      const { activityUri, secretKey } = ctx.params;

      if (secretKey !== CONFIG.SECRET_KEY) throw new Error('Invalid key provided');

      const activity = ctx.call('activitypub.activity.get', {
        resourceUri: activityUri,
        webId: this.groupActor.id,
      });

      await ctx.call('activitypub.outbox.post', {
        collectionUri: this.groupActor.outbox,
        type: ACTIVITY_TYPES.REJECT,
        object: activity.id,
        to: activity.actor
      });

      // Reset meta set by activitypub.outbox.post
      ctx.meta = {};

      return 'OK';
    }
  },
  activities: {
    joinGroup: {
      match: {
        type: ACTIVITY_TYPES.JOIN,
        object: GROUP_URI
      },
      async onReceive(ctx, activity) {
        // Wait 10s to ensure Syreen group has the right to fetch the actor's profile
        await delay(10000);

        const actor = await ctx.call('activitypub.actor.get', {
          actorUri: activity.actor,
          webId: this.groupActor.id,
        });

        const profile = await ctx.call('ldp.remote.get', {
          resourceUri: actor.url,
          webId: this.groupActor.id
        });

        if (!profile['vcard:hasAddress']) {
          await ctx.call('mailer.errorJoin', {
            activity,
            actor
          });
        } else {
          const location = await ctx.call('ldp.remote.get', {
            resourceUri: profile['vcard:hasAddress'],
            webId: this.groupActor.id
          });
  
          await ctx.call('mailer.requestJoin', {
            activity,
            actor,
            profile,
            location
          });
        }
      }
    },
    leaveGroup: {
      match: {
        type: ACTIVITY_TYPES.LEAVE,
        object: GROUP_URI
      },
      async onReceive(ctx, activity) {
        await ctx.call('activitypub.follow.removeFollower', {
          follower: activity.actor,
          following: GROUP_URI
        });

        await ctx.call('activitypub.outbox.post', {
          collectionUri: this.groupActor.outbox,
          type: ACTIVITY_TYPES.ANNOUNCE,
          object: {
            type: ACTIVITY_TYPES.LEAVE,
            actor: activity.actor,
            object: this.groupActor.id,
          },
          to: this.groupActor.followers
        });
      }
    },
    announceOffer: {
      match: {
        type: ACTIVITY_TYPES.ANNOUNCE,
        object: {
          type: 'syreen:Offer',
        },
        to: GROUP_URI
      },
      async onReceive(ctx, activity) {
        // Repost to group members
        await ctx.call('activitypub.outbox.post', {
          collectionUri: this.groupActor.outbox,
          type: ACTIVITY_TYPES.ANNOUNCE,
          object: activity.object.id,
          to: this.groupActor.followers
        });

        ctx.call('alert.announce', { offer: activity.object });
      }
    }
  }
};

module.exports = GroupService;
