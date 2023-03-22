const { AggregatorService } = require('@semapps/sync');

module.exports = {
  mixins: [AggregatorService],
  settings: {
    acceptFollowOffers: true,
    mirrorGraph: false
  }
};
