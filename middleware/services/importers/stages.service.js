const urlJoin = require("url-join");
const path = require("path");
const createSlug = require('speakingurl');
const { ImporterMixin } = require('@semapps/importer');
const CONFIG = require('../../config/config');

module.exports = {
  name: 'importers.stages',
  mixins: [ImporterMixin],
  settings: {
    source: {
      getAllFull: path.resolve(__dirname, '../../imports/stages.json'),
      fieldsMapping: {
        slug: data => createSlug(data, { lang: 'fr', custom: { '.': '.' } })
      },
    },
    dest: {
      containerUri: urlJoin(CONFIG.HOME_URL, 'stages')
    }
  },
  methods: {
    async transform(data) {
      return ({
        type: 'syreen:Stage',
        'syreen:label': data
      });
    },
  }
};