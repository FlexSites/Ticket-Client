'use strict'

const Persistent = require('../Persistent').default

/**
 * Ticket
 *
 * Handles CRUD operations for tickets
 */

exports.default = class Ticket extends Persistent {
  constructor (viewer) {
    super('event', viewer)
  }
  static setup () {
    return super.setup('ticket')
  }
}
