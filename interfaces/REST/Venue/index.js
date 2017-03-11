'use strict'

const Router = require('express').Router
const endpoint = require('../utils').endpoint

exports.default = (name) => {
  const router = new Router()

  router.get('/:id/events', endpoint('event', (service, req) => service.find({ venueID: req.params.id })))

  return router
}
