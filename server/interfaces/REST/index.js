'use strict'

const Router = require('express').Router
const mapValues = require('lodash.mapvalues')
const Interface = require('../Interface').default
const pluralize = require('pluralize').plural
const utils = require('./utils')
const { fromGlobalId, toGlobalId } = require('graphql-relay')

const eventRoutes = require('./Event').default
const venueRoutes = require('./Venue').default

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

const routeMap = {
  event: eventRoutes,
  venue: venueRoutes,
}

exports.default = class REST extends Interface {

}

exports.middleware = (services) => {
  const router = new Router()

  // Auto-routes
  mapValues(services, (service, name) => {
    console.log(`Setting up endpoint: /${ pluralize(name) }`)
    router.use(`/${ pluralize(name) }`, resource(service, name))
  })

  // Node Interface
  router.get('/:id', utils.middleware((req, res, next) => {
    const id = req.params.id
    const { type } = fromGlobalId(id)
    if (!type) return next()
    return res.locals[type].get(id)
  }))

  // Error handler
  router.use((err, req, res, next) => {
    const code = err.status || 500
    const message = err.message || 'Internal Server Error'
    console.error(err)
    res.status(code).send({ message })
  })

  return router
}

function resource (service, name) {
  const router = new Router()
  const route = utils.endpoint.bind(this, name)
  const customRoutes = routeMap[name]

  if (customRoutes) {
    router.use(customRoutes(name))
  }

  router.route('/')
    .get(route((service) => service.find()))
    .post(route((service, req) => service.create(req.body)))

  router.route('/:id')
    .get(route((service, req) => service.get(req.params.id)))
    .put(route((service, req) => service.update(req.params.id, req.body)))
    .delete(route((service, req) => service.remove(req.params.id)))

  return router
}

exports.resource = resource


exports.resource = resource
exports.handler = (event, context, cb) => {

}
