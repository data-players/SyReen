/*
const offerAndRequestConfig = {
  name: 'Annonce |||| Annonces',
  fields: {
    'syreen:label': 'Titre',
    'syreen:depictedBy': 'Image',
    'syreen:description': 'Présentation',
    'dc:creator': 'Posté par',
    'dc:created': 'Date',
    'mp:hasGeoCondition.syreen:hasLocation': 'Localisation',
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
    'dc:creator': 'Posté par',
    'dc:created': 'Date',
    'syreen:label': 'Titre',
    'syreen:alternativeLabel': 'Sous-titre',
    'syreen:depictedBy': 'Image',
    'syreen:description': 'Présentation',
    'syreen:hasLocation': 'Localisation',
    'syreen:locationInformation': 'Complément d\'adresse',
    'syreen:hasProjectType': "Type de projet",
    'syreen:startDate': "Date de début prévisionnelle",    
    'syreen:endDate': "Date de fin prévisionnelle"
  },
};

const offerConfig = {
  name: 'Offre |||| Offres',
  fields: {
    'dc:creator': 'Posté par',
    'dc:created': 'Date',
    'syreen:label': 'Titre',
    'syreen:alternativeLabel': 'Sous-titre',
    'syreen:description': 'Description/Commentaire',
    'syreen:depictedBy': 'Image',
    'syreen:quantity': "Quantité",
    'syreen:hasUnit': "Unité",
    'syreen:hasStage': 'Phase',
    'syreen:startDate': "Date prévisionnelle de disponibilité",
    'syreen:hasLocation': 'Localisation',
    'syreen:locationInformation': 'Complément d\'adresse',
    'syreen:hasCategory': "Categorie",
    'syreen:sellingPrice': "Prix de vente",
    'syreen:estimatedNewValue': "Valeur Neuve Estimée (€)",
    'syreen:agePercentage': "Vétusté (%)",
    'syreen:interestPercentage': "Intérêt (%)",
    'syreen:performancePercentage': "Performance (%)",
    'syreen:marketValue': "Valeur sur le marché",
    'syreen:publishMarketValue': "Publier cette valeur",
    'syreen:hourlyPrice': "Taux horaire (€)",
    'syreen:dismantlingHours': "Nombre d'heures de démontage",
    'syreen:collectionHours': "Nombre d'heures de collecte",
    'syreen:refurbishmentAndSaleHours': "Nombre d'heures de reconditionnement/vente",
    'syreen:additionalCosts': "Frais annexe pour le lot (Transport/Consommable) (€)",
    'syreen:costPrice': "Coût de revient",
    'syreen:publishCostPrice': "Publier cette valeur",
  },
};

const profileConfig = {
  name: 'Profil |||| Profils',
  fields: {
    'describes': 'Identifiant',
    'vcard:given-name': 'Prénom',
    'vcard:family-name': 'Nom de famille',
    'vcard:note': 'En deux mots',
    'vcard:photo': 'Photo',
    'foaf:tipjar': 'Compte Ğ1',
    'dc:created': "Date d'inscription"
  },
};

const locationConfig = {
  name: 'Adresse |||| Adresses',
  fields: {
    'vcard:given-name': 'Nom du lieu',
    'vcard:hasAddress': 'Adresse',
    'vcard:note': 'Indications',
  },
};

module.exports = {
  resources: {
    // OfferAndRequest: offerAndRequestConfig,
    projects: projectConfig,
    offers: offerConfig,
    // requests: offerAndRequestConfig,
    Profile: profileConfig,
    Location: locationConfig,
  },
};
