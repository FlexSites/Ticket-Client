'use strict'

const Persistent = require('../Persistent').default

/**
 * Event
 *
 * Handles CRUD operations for events and ticket delegation
 */

exports.default = class Event extends Persistent {
  constructor (viewer) {
    super('event', viewer)
  }
  static setup () {
    return super.setup('event')
  }
}
