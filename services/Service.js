'use strict'

const EventEmitter = require('events')

class Service extends EventEmitter {
  constructor (name, viewer, config = {}) {
    super()
    this.name = name
    this.viewer = viewer
    this.config = Object.assign({}, config, {
      // Defaults
    })
  }

  /**
   * GET a list of events optionally filtered by a query
   */
  find (params) {
    throw new Error(`Method "${ this.name }.find" is not implemented`)
  }

  /**
   * GET a single event by primary key
   */
  get (id, params) {
    throw new Error(`Method "${ this.name }.get" is not implemented`)
  }

  /**
   * POST to create a new event
   * @access booker|manager|owner|admin
   */
  create (data, params) {
    throw new Error(`Method "${ this.name }.create" is not implemented`)
  }

  /**
   * PUT to update an event by id
   * @access booker|manager|owner|admin
   */
  update (id, data, params) {
    throw new Error(`Method "${ this.name }.update" is not implemented`)
  }

  /**
   * PATCH to update an event by id
   * @access booker|manager|owner|admin
   */
  patch (id, data, params) {
    throw new Error(`Method "${ this.name }.patch" is not implemented`)
  }

  /**
   * DELETE an event by ID
   */
  remove (id, params) {
    throw new Error(`Method "${ this.name }.remove" is not implemented`)
  }

  /**
   * SETUP database connections
   */
  static setup (app, path) {
    // Setup code
    console.info('Setting up non-persistent service')
    return Service
  }
}


exports.default = Service
