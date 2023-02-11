/*
const offerAndRequestConfig = {
  name: 'Annonce |||| Annonces',
  fields: {
    'pair:label': 'Titre',
    'pair:depictedBy': 'Image',
    'pair:description': 'Présentation',
    'dc:creator': 'Posté par',
    'dc:created': 'Date',
    'mp:hasGeoCondition.pair:hasLocation': 'Localisation',
    'mp:hasReciprocityCondition.mp:amount': 'Prix demandé',
    'mp:hasReciprocityCondition.mp:maxAmount': 'Prix maximum',
    'mp:hasReciprocityCondition.mp:currency': 'Devise',
    'mp:hasReciprocityCondition.mp:inExchangeOf': 'En échange de',
    'mp:hasTimeCondition.mp:maxDuration': 'Durée maximale du prêt',
    'mp:hasTimeCondition.mp:minDuration': 'Durée minimale du prêt',
    'mp:hasTimeCondition.mp:expirationDate': "Date d'expiration de l'annonce",
  },
};
*/
const projectConfig = {
  name: 'Projet |||| Projets',
  fields: {
    'pair:label': 'Titre',
    'pair:depictedBy': 'Image',
    'pair:description': 'Présentation',
    'dc:creator': 'Posté par',
    'dc:created': 'Date',
    'pair:hasLocation': 'Localisation',
    'syreen:locationInformation': 'Complément d\'adresse',
    'syreen:type': "Type de projet",
    'syreen:status': "Statut",
    'pair:startDate': "Date de début prévisionnelle",    
    'pair:endDate': "Date de fin prévisionnelle"
  },
};

const offerConfig = {
  name: 'Offre |||| Offres',
  fields: {
    'pair:label': 'Titre',
    'pair:depictedBy': 'Image',
    'pair:description': 'Présentation',
    'dc:creator': 'Posté par',
    'dc:created': 'Date',
    'mp:hasGeoCondition.pair:hasLocation': 'Localisation',
    'mp:hasReciprocityCondition.mp:amount': 'Prix demandé',
    'mp:hasReciprocityCondition.mp:maxAmount': 'Prix maximum',
    'mp:hasReciprocityCondition.mp:currency': 'Devise',
    'mp:hasReciprocityCondition.mp:inExchangeOf': 'En échange de',
    'mp:hasTimeCondition.mp:maxDuration': 'Durée maximale du prêt',
    'mp:hasTimeCondition.mp:minDuration': 'Durée minimale du prêt',
    'mp:hasTimeCondition.mp:expirationDate': "Date d'expiration de l'offre",
    'syreen:quantity': "Quantité",
    'syreen:unit': "Unité",
  },
};

module.exports = {
  resources: {
    // OfferAndRequest: offerAndRequestConfig,
    projects: projectConfig,
    offers: offerConfig,
    // requests: offerAndRequestConfig,
  },
};
