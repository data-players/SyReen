const path = require('path');
const urlJoin = require('url-join');
const MailerService = require('moleculer-mail');
const CONFIG = require('../config/config');
const transport = require('../config/transport');

module.exports = {
  name: 'mailer',
  mixins: [MailerService],
  settings: {
    from: `${CONFIG.FROM_NAME} <${CONFIG.FROM_EMAIL}>`,
    transport,
    templateFolder: path.join(__dirname, "../templates"),
  },
  actions: {
    async requestJoin(ctx) {
      const { activity, actor, profile, location } = ctx.params;

      const acceptUrl = urlJoin(CONFIG.HOME_URL, '_system', 'accept', CONFIG.SECRET_KEY) + '?activityUri=' + encodeURIComponent(activity.id);
      const rejectUrl = urlJoin(CONFIG.HOME_URL, '_system', 'reject', CONFIG.SECRET_KEY) + '?activityUri=' + encodeURIComponent(activity.id);
      const contactUrl = `https://app.mypod.store/Profile/${encodeURIComponent(profile.id)}/show`;

      await ctx.call('mailer.send', {
        to: ['srosset81@gmail.com', 'coordination.chantier@syreen.fr', 'pascal.laine@syreen.fr', 'simon.louvet.pro@gmail.com'],
        template: 'join-request',
        data: {
          actor,
          profile,
          location,
          acceptUrl,
          rejectUrl,
          contactUrl
        }
      });
    },
    async errorJoin(ctx) {
      const { activity, actor } = ctx.params;

      const acceptUrl = urlJoin(CONFIG.HOME_URL, '_system', 'accept', CONFIG.SECRET_KEY) + '?activityUri=' + encodeURIComponent(activity.id);
      const rejectUrl = urlJoin(CONFIG.HOME_URL, '_system', 'reject', CONFIG.SECRET_KEY) + '?activityUri=' + encodeURIComponent(activity.id);

      await ctx.call('mailer.send', {
        to: ['srosset81@gmail.com'],
        template: 'join-error',
        data: {
          actor,
          acceptUrl,
          rejectUrl
        }
      });
    }
  }
};
