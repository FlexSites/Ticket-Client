'use strict'

const moment = require('moment')
const event = require('./event').default

const showtime = {
  event,
  date: moment('2017-03-12T04:00:00.000Z').format('MMMM Do YYYY, h:mm a'),
  ticketBucket: 100,
  remaining: 19,
}

exports.default = showtime
