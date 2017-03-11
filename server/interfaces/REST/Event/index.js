'use strict'

const Router = require('express').Router
const endpoint = require('../utils').endpoint

exports.default = (name) => {
  const router = new Router()

  router.get('/:id/showtimes', endpoint('showtime', (service, req) => service.find({ eventID: req.params.id })))

  return router
}
