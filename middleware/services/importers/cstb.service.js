const urlJoin = require("url-join");
const path = require("path");
const { ImporterMixin } = require('@semapps/importer');
const CONFIG = require('../../config/config');

module.exports = {
  name: 'importers.cstb',
  mixins: [ImporterMixin],
  settings: {
    source: {
      getAllFull: path.resolve(__dirname, '../../imports/cstb.json'),
      fieldsMapping: {
        slug: data => `${data.key}`
      },
    },
    dest: {
      containerUri: urlJoin(CONFIG.HOME_URL, 'categories')
    }
  },
  methods: {
    async transform(data) {
      return ({
        type: 'syreen:Category',
        'syreen:label': data.label,
        'syreen:hasUnit': data.units ? data.units.map(unit => urlJoin(CONFIG.HOME_URL, 'units', unit)) : undefined,
        'skos:broader': data.parent ? urlJoin(CONFIG.HOME_URL, 'categories', `${data.parent}`) : undefined,
      });
    },
  }
};
