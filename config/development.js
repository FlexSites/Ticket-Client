'use strict'

const defer = require('config/defer').deferConfig

module.exports = {
  aws: {
    dynamodb: {
      endpoint: defer((cfg) => {
        return `http://localhost:${ cfg.dynalite.port }`
      }),
    },
  },
  dynalite: {
    port: 4567,
    path: './tmp',
  },
}
