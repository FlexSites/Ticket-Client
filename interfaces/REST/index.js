'use strict'

const Router = require('express').Router
const mapValues = require('lodash.mapvalues')
const Interface = require('../Interface').default
const pluralize = require('pluralize').plural

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

exports.middleware = (services) => {
  const router = new Router()
  mapValues(services, (Service, name) => {
    console.log(`Setting up endpoint: /${ pluralize(name) }`)
    router.use(`/${ pluralize(name) }`, resource(Service, name))
  })

  // Error handler
  router.use((err, req, res, next) => {
    const code = err.status || 500
    const message = err.message || 'Internal Server Error'
    res.status(code).send({ message })
  })

  return router
}

function endpoint (name, fn) {
  return (req, res, next) => {
    return fn(res.locals[name], req, res)
      .then(res.send.bind(res))
      .catch(next)
  }
}

function resource (Service, name) {
  const router = new Router()
  const route = endpoint.bind(this, name)

  router.use((req, res, next) => {
    res.locals[name] = new Service(req.user)
    next()
  })

  router.route('/')
    .get(route((service) => service.find()))
    .post(route((service, req) => service.create(req.body)))

  router.route('/:id')
    .get(route((service, req) => service.get(req.params.id)))
    .put(route((service, req) => service.update(req.params.id, req.body)))
    .delete(route((service, req) => service.remove(req.params.id)))

  return router
}



exports.handler = (event, context, cb) => {

}
