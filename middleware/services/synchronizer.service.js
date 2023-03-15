const { SynchronizerService } = require('@semapps/activitypub');

module.exports = {
  mixins: [SynchronizerService],
  settings: {
    mirrorGraph: false,
    synchronizeContainers: false,
    attachToLocalContainers: true
  }
};
