'use strict'

const Persistent = require('../Persistent').default
const { venue } = require('./schema')
const { Schema } = require('mongoose')

/**
 * Venue
 *
 * Handles CRUD operations for venues
 */

exports.default = class Venue extends Persistent {
  constructor (viewer) {
    super('venue', {
      schema: venue,
      // model: new Schema({
      //   name: String,
      // }),
    })
  }
  static setup () {
    return super.setup('venue')
  }
}
