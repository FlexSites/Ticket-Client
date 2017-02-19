'use strict'

const EventEmitter = require('events')

class Service extends EventEmitter {
  constructor(config = {}) {
    this.config = Object.assign({}, config, {
      name:
    })
  }
}
/**
 * GET a list of events optionally filtered by a query
 */
function find (viewer, params) {

}

/**
 * GET a single event by primary key
 */
function get (viewer, id, params) {

}

/**
 * POST to create a new event
 * @access booker|manager|owner|admin
 */
function create (viewer, data, params) {

}

/**
 * PUT to update an event by id
 * @access booker|manager|owner|admin
 */
function update (viewer, id, data, params) {
  // Disallow changing ever changing venue
}

/**
 * PATCH to update an event by id
 * @access booker|manager|owner|admin
 */
function patch (viewer, id, data, params) {
  // Disallow changing ever changing venue
}

/**
 * DELETE an event by ID
 */
function remove (viewer, id, params) {
  // Refund all tickets
  // Delete all linked tickets
  // Delete all linked showtimes
  // Delete event

}

/**
 * SETUP database connections
 */
function setup (viewer, app, path) {

}

exports.find = find
exports.get = get
exports.create = create
exports.update = update
exports.patch = patch
exports.remove = remove
exports.setup = setup
