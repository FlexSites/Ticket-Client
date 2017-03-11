'use strict'

const Persistent = require('../Persistent').default
const emitter = require('../bus').default
const { Showtime } = require('../index').system

/**
 * Event
 *
 * Handles CRUD operations for events and ticket delegation
 */

exports.default = class Event extends Persistent {
  constructor (viewer) {
    super('showtime', viewer)
  }
  static setup () {
    return super.setup('showtime')
  }
}

function decrementAvailability (reservation) {
  return Showtime.get(reservation.showtimeID)
    .then((showtime) => {
      showtime.available += reservation.quantity
      return Showtime.update(reservation.showtimeID, showtime)
    })
}

function incrementAvailability (reservation) {
  return Showtime.get(reservation.showtimeID)
    .then((showtime) => {
      showtime.available -= reservation.quantity
      return Showtime.update(reservation.showtimeID, showtime)
    })
}

emitter.on('ticket:remove', decrementAvailability)
emitter.on('ticket:cancel', decrementAvailability)

emitter.on('ticket:reserve', incrementAvailability)
