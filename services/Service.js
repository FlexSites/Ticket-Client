'use strict'

const EventEmitter = require('events')

const METHODS = [
  'find',
  'get',
  'create',
  'update',
  'patch',
  'remove',
]

class Service extends EventEmitter {
  constructor (name, viewer, config = {}) {
    super()
    this.name = name
    this.viewer = viewer
    this.config = Object.assign({}, config, {
      // Defaults
    })

    METHODS.forEach((method) => {
      if (this[method] !== 'function') {
        this[method] = Service[method].bind(Service, viewer)
      }
    })
  }

  /**
   * GET a list of events optionally filtered by a query
   */
  static find (viewer, params) {
    throw new Error(`Method "${ this.name }.find" is not implemented`)
  }

  /**
   * GET a single event by primary key
   */
  static get (viewer, id, params) {
    throw new Error(`Method "${ this.name }.get" is not implemented`)
  }

  /**
   * POST to create a new event
   * @access booker|manager|owner|admin
   */
  static create (viewer, data, params) {
    throw new Error(`Method "${ this.name }.create" is not implemented`)
  }

  /**
   * PUT to update an event by id
   * @access booker|manager|owner|admin
   */
  static update (viewer, id, data, params) {
    throw new Error(`Method "${ this.name }.update" is not implemented`)
  }

  /**
   * PATCH to update an event by id
   * @access booker|manager|owner|admin
   */
  static patch (viewer, id, data, params) {
    throw new Error(`Method "${ this.name }.patch" is not implemented`)
  }

  /**
   * DELETE an event by ID
   */
  static remove (viewer, id, params) {
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
