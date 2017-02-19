'use strict'

const Interface = require('../Interface').default

/**
 * REST
 *
 * REST API layer to backing service
 *
 * Calls UserInterface and populates Viewer object
 *
 * Authentication only. No Authorizations.
 *
 * NO BUSINESS LOGIC
 */

exports.default = class REST extends Interface {

}

exports.middleware = (req, res, next) => {

}

exports.handler = (event, context, cb) => {

}
