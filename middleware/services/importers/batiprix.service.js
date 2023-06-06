

const urlJoin = require("url-join");
const { ImporterMixin } = require('@semapps/importer');
const CONFIG = require('../../config/config');

module.exports = {
  name: 'importers.batiprix',
  mixins: [ImporterMixin],
  settings: {
    source: {
      getAllFull: CONFIG.BATIPRIX_IMPORT_URL,
      fieldsMapping: {
        slug: data => `${data.Id}`
      },
    },
    dest: {
      containerUri: urlJoin(CONFIG.HOME_URL, 'batiprix')
    }
  },
  methods: {
    async transform(data) {
      return ({
        type: 'syreen:BatiprixCategory',
        'syreen:label': data.Title,
        'skos:broader': data.IsLeaf ? urlJoin(CONFIG.HOME_URL, 'batiprix', `${data.ParentID}`) : undefined,
      });
    },
  }
};
