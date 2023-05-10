const path = require('path');
const urlJoin = require('url-join');
const MailerService = require('moleculer-mail');
const CONFIG = require('../config/config');

module.exports = {
  name: 'mailer',
  mixins: [MailerService],
  settings: {
    from: `${CONFIG.FROM_NAME} <${CONFIG.FROM_EMAIL}>`,
    transport: {
      host: CONFIG.SMTP_HOST,
      port: CONFIG.SMTP_PORT,
      secure: CONFIG.SMTP_SECURE,
      auth: {
        user: CONFIG.SMTP_USER,
        pass: CONFIG.SMTP_PASS,
      },
    },
    templateFolder: path.join(__dirname, "../templates"),
  },
  actions: {
    async requestJoin(ctx) {
      const { activity, actor, profile } = ctx.params;

      const acceptUrl = urlJoin(CONFIG.HOME_URL, '_system', 'accept', CONFIG.SECRET_KEY) + '?activityUri=' + encodeURIComponent(activity.id);
      const rejectUrl = urlJoin(CONFIG.HOME_URL, '_system', 'reject', CONFIG.SECRET_KEY) + '?activityUri=' + encodeURIComponent(activity.id);
      const contactUrl = `https://app.mypod.store/Profile/${encodeURIComponent(profile.id)}/show`;

      await ctx.call('mailer.send', {
        to: 'srosset81@gmail.com',
        template: 'join-request',
        data: {
          actor,
          profile,
          acceptUrl,
          rejectUrl,
          contactUrl
        }
      });
    }
  }
};
