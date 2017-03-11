'use strict'

const Persistent = require('../Persistent').default
const emitter = require('../bus').default
const System = require('../index').system

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
  const { Showtime } = System
  return Showtime.get(reservation.showtimeID)
    .then((showtime) => {
      showtime.available += reservation.quantity
      return Showtime.update(reservation.showtimeID, showtime)
    })
}

function incrementAvailability (reservation) {
  const { Showtime } = System
  return Showtime.get(reservation.showtimeID)
    .then((showtime) => {
      showtime.available -= reservation.quantity
      return Showtime.update(reservation.showtimeID, showtime)
    })
}

emitter.on('ticket:remove', decrementAvailability)
emitter.on('ticket:cancel', decrementAvailability)

emitter.on('ticket:reserve', incrementAvailability)
