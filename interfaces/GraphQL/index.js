'use strict'

const Interface = require('../Interface').default

/**
 * GraphQL
 *
 * GraphQL API layer to backing service
 *
 * Calls UserInterface and populates Viewer object
 *
 * Authentication only. No Authorizations.
 *
 * NO BUSINESS LOGIC
 */

exports.default = class GraphQL extends Interface {

}

exports.middleware = (req, res, next) => {

}

exports.handler = (event, context, cb) => {

}
