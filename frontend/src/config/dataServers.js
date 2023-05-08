const dataServers = {
  pod: {
    pod: true,
    default: true,
    authServer: true,
    baseUrl: null, // Calculated from the token
    sparqlEndpoint: null,
    containers: {
      pod: {
        'syreen:Offer': ['/syreen/offers'],
        'syreen:Project': ['/syreen/projects'],
        'vcard:Location': ['/locations'],
        'vcard:Individual': ['/profiles'],
      },
    },
    uploadsContainer: '/files',
  },
  aggregator: {
    baseUrl: process.env.REACT_APP_AGGREGATOR_BASE_URL,
    noProxy: true // Never fetch with HTTP signature as it is not supported, and all data are public
  }
};

export default dataServers;
