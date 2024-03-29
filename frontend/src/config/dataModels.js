const dataModels = {
  offers: {
    types: ['syreen:Offer'],
    list: {},
  },
  projects: {
    types: ['syreen:Project'],
    list: {},
  },
  Actor: {
    types: ['as:Actor'],
    list: {},
  },
  Profile: {
    types: ['vcard:Individual'],
    list: {},
  },
  Location: {
    types: ['vcard:Location'],
    list: {
      servers: 'pod',
      blankNodes: ['vcard:hasAddress/vcard:hasGeo'],
    },
  },
  Alert: {
    types: ['syreen:Alert'],
    list: {
      servers: 'aggregator',
    },
    create: {
      server: 'aggregator'
    }
  },

  // Concepts :

  ProjectType: {
    types: ['syreen:ProjectType'],
    list: {},
  },
  Stage: {
    types: ['syreen:Stage'],
    list: {},
  },
  Unit: {
    types: ['syreen:Unit'],
    list: {},
  },
  Category: {
    types: ['syreen:Category'],
    list: {},
  },
  BatiprixCategory: {
    types: ['syreen:BatiprixCategory'],
    list: {},
  },
};

export default dataModels;
