'use strict'

const Entertainer = require('./Entertainer')
const Event = require('./Event')
const Ticket = require('./Ticket')
const Venue = require('./Venue')
const Payment = require('./Payment')
const Social = require('./Social')
const Metric = require('./Metric')

const services = {
  entertainer: Entertainer,
  event: Event,
  ticket: Ticket,
  venue: Venue,
  payment: Payment,
  social: Social,
  metric: Metric,
}

exports.services = services
