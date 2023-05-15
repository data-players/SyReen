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
    baseUrl: 'https://data.syreen.fr',
    name: 'Aggregator',
    sparqlEndpoint: 'https://data.syreen.fr/sparql',
    containers: {
      aggregator: {
        'syreen:Offer': ['/offers'],
        'syreen:Project': ['/projects'],
        'syreen:ProjectType': ['/types'],
        'syreen:Stage': ['/stages'],
        'syreen:Unit': ['/units'],
        'syreen:Category': ['/categories'],
      }
    },
    noProxy: true // Never fetch with HTTP signature as it is not supported, and all data are public
  }
};

export default dataServers;
