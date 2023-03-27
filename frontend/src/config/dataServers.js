const dataServers = {
  pod: {
    pod: true,
    default: true,
    authServer: true,
    baseUrl: null, // Calculated from the token
    sparqlEndpoint: null,
    containers: {
      pod: {
        'mp:Offer': ['/offers'],
//      'mp:Request': ['/requests'],
        'pair:Project': ['/projects'],
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
        'mp:Offer': ['/offers'],
        'pair:Project': ['/projects'],
      }
    }
  }
};

export default dataServers;
