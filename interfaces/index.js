'use strict'

const Router = require('express').Router
const GraphQL = require('./GraphQL')
const REST = require('./REST')

exports.middleware = (services) => {
  const router = new Router()
  router.use('/graphql', GraphQL.middleware(services))
  router.use('/rest', REST.middleware(services))
  return router
}

