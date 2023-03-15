const dataModels = {
  /*
  OfferAndRequest: {
    types: [
      'mp:GiftOffer',
      'mp:BarterOffer',
      'mp:LoanOffer',
      'mp:SaleOffer',
      'mp:Offer',
      'mp:GiftRequest',
      'mp:BarterRequest',
      'mp:LoanRequest',
      'mp:PurchaseRequest',
      'mp:Request',
    ],
    list: {
      dereference: ['mp:hasTimeCondition', 'mp:hasGeoCondition', 'mp:hasReciprocityCondition'],
    },
  },
  */
  offers: {
    types: ['mp:Offer'],
    list: {},
  },
  /*
  requests: {
    types: ['mp:GiftRequest', 'mp:BarterRequest', 'mp:LoanRequest', 'mp:PurchaseRequest', 'mp:Request'],
    list: {
      dereference: ['mp:hasTimeCondition', 'mp:hasGeoCondition', 'mp:hasReciprocityCondition'],
    },
  },
  */
  projects: {
    types: ['pair:Project'],
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
};

export default dataModels;
