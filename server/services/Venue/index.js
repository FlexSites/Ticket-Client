'use strict'

const Persistent = require('../Persistent').default

/**
 * Venue
 *
 * Handles CRUD operations for venues
 */

exports.default = class Venue extends Persistent {
  constructor (viewer) {
    super('venue', viewer)
  }
  static setup () {
    return super.setup('venue')
  }
}