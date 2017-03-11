'use strict'

const express = require('express')
const path = require('path')

const interfaces = require('./interfaces').middleware
const setupServices = require('./services').setup
const dynamo = require('./lib/dynamodb').default
const json = require('body-parser').json

const PORT = process.env.PORT || 3000

const app = express()

setupServices
  .then((services) => {
    app.use('/api', json(), interfaces(services))
    app.listen(PORT, () => {
      console.info(`App listening on port ${ PORT }`)
      dynamo.listTables({}, (err, data) => console.log(data))
    })
  })
