const CONFIG = require('./config');
const { ACTOR_TYPES } = require("@semapps/activitypub");

module.exports = [
  {
    path: '/'
  },
  {
    path: '/offers',
    acceptedTypes: ['mp:Offer'],
    readOnly: true
  },
  {
    path: '/actors',
    acceptedTypes: [ACTOR_TYPES.APPLICATION],
    dereference: ['sec:publicKey', 'as:endpoints'],
    readOnly: true
  }
];
