const { ACTOR_TYPES } = require("@semapps/activitypub");

const defaultReadPermissions = { default: { read: true } };

module.exports = [
  {
    path: '/',
    readOnly: true
  },
  {
    path: '/offers',
    acceptedTypes: ['syreen:Offer'],
    permissions: defaultReadPermissions,
    readOnly: true
  },
  {
    path: '/projects',
    acceptedTypes: ['syreen:Project'],
    permissions: defaultReadPermissions,
    readOnly: true
  },
  {
    path: '/actors',
    acceptedTypes: [ACTOR_TYPES.APPLICATION],
    dereference: ['sec:publicKey', 'as:endpoints'],
    permissions: defaultReadPermissions,
    readOnly: true
  },
  {
    path: '/categories',
    acceptedTypes: ['syreen:Category'],
    permissions: defaultReadPermissions,
    readOnly: true
  },
  {
    path: '/batiprix',
    acceptedTypes: ['syreen:BatiprixCategory'],
    permissions: defaultReadPermissions,
    readOnly: true
  },
  {
    path: '/units',
    acceptedTypes: ['syreen:Unit'],
    permissions: defaultReadPermissions,
    readOnly: true
  },
  {
    path: '/stages',
    acceptedTypes: ['syreen:Stage'],
    permissions: defaultReadPermissions,
    readOnly: true
  },
  {
    path: '/types',
    acceptedTypes: ['syreen:ProjectType'],
    permissions: defaultReadPermissions,
    readOnly: true
  }
];
