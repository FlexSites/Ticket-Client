'use strict'

const Persistent = require('../Persistent').default
const { Schema } = require('mongoose')

/**
 * Ticket
 *
 * Handles CRUD operations for tickets
 */

exports.default = class Ticket extends Persistent {
  constructor (viewer) {
    super('ticket', {
      // model: new Schema({
      //   name: String,
      // }),
    })
  }
  static setup () {
    return super.setup('ticket')
  }
}
