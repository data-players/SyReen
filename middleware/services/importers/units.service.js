const urlJoin = require("url-join");
const path = require("path");
const createSlug = require('speakingurl');
const { ImporterMixin } = require('@semapps/importer');
const CONFIG = require('../../config/config');

module.exports = {
  name: 'importers.units',
  mixins: [ImporterMixin],
  settings: {
    source: {
      getAllFull: path.resolve(__dirname, '../../imports/units.json'),
      fieldsMapping: {
        slug: 'key'
      },
    },
    dest: {
      containerUri: urlJoin(CONFIG.HOME_URL, 'units')
    }
  },
  methods: {
    async transform(data) {
      return ({
        type: 'syreen:Unit',
        'syreen:label': data.label
      });
    },
  }
};