const { ACTOR_TYPES } = require("@semapps/activitypub");

module.exports = [
  {
    path: '/',
    readOnly: true
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
  },
  {
    path: '/categories',
    acceptedTypes: ['syreen:Category'],
    readOnly: true
  },
  {
    path: '/units',
    acceptedTypes: ['syreen:Unit'],
    readOnly: true
  },
  {
    path: '/stages',
    acceptedTypes: ['syreen:Stage'],
    readOnly: true
  },
  {
    path: '/types',
    acceptedTypes: ['syreen:ProjectType'],
    readOnly: true
  }
];
