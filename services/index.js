'use strict'

const mapValues = require('lodash.mapvalues')
const Bluebird = require('bluebird')
const AWS = require('aws-sdk')

AWS.config.setPromisesDependency(Bluebird)

const Entertainer = require('./Entertainer').default
const Event = require('./Event').default
const Ticket = require('./Ticket').default
const Venue = require('./Venue').default
const Payment = require('./Payment').default
const Social = require('./Social').default
const Metric = require('./Metric').default
const Showtime = require('./Showtime').default
const User = require('./User').default

const services = {
  entertainer: Entertainer,
  event: Event,
  ticket: Ticket,
  venue: Venue,
  payment: Payment,
  social: Social,
  metric: Metric,
  showtime: Showtime,
}

function setup () {
  return Bluebird.props(
    mapValues(
      services,
      (Service, key) => {
        console.info(`Setting up service ${ key }`)
        return Bluebird.method(Service.setup).bind(Service)()
          .return(Service)
      }
    )
  )
}

console.log('thingy', Object.keys(mapValues(
  services,
  (Service, key) => new Service({ roles: [ 'system' ] })
)))
exports.system = mapValues(
  services,
  (Service, key) => new Service({ roles: [ 'system' ] })
)
exports.setup = setup()
exports.default = services
