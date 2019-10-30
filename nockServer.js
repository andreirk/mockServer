const nock = require('nock')
nock.disableNetConnect()
const scope = nock('https://uat.beacon-tech.net')
  .get('/tss/reference-data/commissions')
  .reply(200, {
    license: {
      key: 'mit',
      name: 'MIT License',
      spdx_id: 'MIT',
      url: 'https://api.github.com/licenses/mit',
      node_id: 'MDc6TGljZW5zZTEz',
    },
  })
