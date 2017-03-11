'use strict'

const Router = require('express').Router
const mapValues = require('lodash.mapvalues')
const GraphQL = require('./GraphQL')
const REST = require('./REST')
const User = require('../services/User').default


exports.middleware = (services) => {
  const router = new Router()
  router.use((req, res, next) => {
    User.fromJwt(req.get('Authorization'))
      .then((user) => {
        mapValues(services, (Service, name) => {
          res.locals[name] = new Service(user)
        })
        next()
      })
      .catch(next)
  })
  router.use('/graphql', GraphQL.middleware(services))
  router.use('/rest', REST.middleware(services))
  return router
}

