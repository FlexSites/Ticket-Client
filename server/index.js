'use strict'

const app = require('./app').default
const setupServices = require('./services').setup

setupServices
  .then(app)
  .catch((ex) => {
    console.error(`Startup error "${ ex.message }"`)
    console.error(ex)
  })
