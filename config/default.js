'use strict'

const defer = require('config/defer').deferConfig

module.exports = {
  port: 3000,
  stage: 'dev',
  app: 'evenue',
  publicUrl: 'http://localhost:3000',
  aws: {
    region: 'us-west-2',
    dynamodb: {
      region: defer((cfg) => cfg.aws.region),
      apiVersion: '2012-08-10',
    },
  },
}
