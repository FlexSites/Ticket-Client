'use strict'

const Persistent = require('../Persistent').default
const emitter = require('../bus').default
const System = require('../index').system
const { Schema } = require('mongoose')

/**
 * Showtime
 *
 * Handles CRUD operations for Showtimes and ticket delegation
 */

exports.default = class Showtime extends Persistent {
  constructor (viewer) {
    super('showtime', {
      // model: new Schema({
      //   name: String,
      // }),
    })
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
