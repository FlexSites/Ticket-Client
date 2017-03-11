'use strict'

const Persistent = require('../Persistent').default

/**
 * Entertainer
 *
 * Handles CRUD operations for entertainers and entertainer validation requests
 */

exports.default = class Entertainer extends Persistent {
  constructor (viewer) {
    super('entertainer', viewer)
  }
  static setup () {
    return super.setup('entertainer')
  }
}
