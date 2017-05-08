'use strict'

const Persistent = require('../Persistent').default
const { Schema } = require('mongoose')

/**
 * Entertainer
 *
 * Handles CRUD operations for entertainers and entertainer validation requests
 */

exports.default = class Entertainer extends Persistent {
  constructor (viewer) {
    super('entertainer', {
      // model: new Schema({
      //   name: String,
      // }),
    })
    console.log('RUN ENTERTAINER')
  }
  static setup () {
    return super.setup('entertainer')
  }
}
