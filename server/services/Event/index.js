'use strict'

const Persistent = require('../Persistent').default
const { Event, Showtime } = require('../index').system
const emitter = require('../bus').default

/**
 * Event
 *
 * Handles CRUD operations for events and ticket delegation
 */

exports.default = class Event extends Persistent {
  constructor (viewer) {
    super('event')
    this.viewer = viewer
    console.log('VIEWER', viewer)
  }

  get (...args) {
    if (this.viewer.user_id) {
      console.log('Logged in!!!')
      return super.get(...args)
    }
    console.log('Not Logged in!!!')
    return Promise.reject(new Error('Unauthorized'))
  }
  static setup () {
    return super.setup('event')
  }
}

function updateRanges (showtime) {
  return Promise.all([
    Event.get(showtime.eventID),
    Showtime.find({ eventID: showtime.eventID }),
  ])
    .then(([ event, showtimes ]) => {
      event.dateRange = dateRange(showtimes)
      event.priceRange = priceRange(showtimes)
      return event
    })
}

function dateRange (showtimes) {
  // const sorted = showtimes
  //   .sort((a, b) => b.datetime - a.datetime)

  return 'Mar. 8'
}

function priceRange (showtimes) {
  return '$25'
}

emitter.on('showtime:create', updateRanges)
emitter.on('showtime:update', updateRanges)
emitter.on('showtime:patch', updateRanges)
emitter.on('showtime:remove', updateRanges)
