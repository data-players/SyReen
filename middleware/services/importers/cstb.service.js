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
        slug: data => `${data.id}`
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
    async list(url) {
      let items = await this.fetch(url);
      let numChilds = {};
      return items.map(item => {
        // If no id is defined, compute it from the parent
        if (!item.id) {
          if (numChilds[item.parent]) {
            numChilds[item.parent]++;
          } else {
            numChilds[item.parent] = 1;
          }
          return {
            id: `${item.parent}.${numChilds[item.parent]}`,
            ...item
          }
        } else {
          return item;
        }
      })
    },
  }
};
