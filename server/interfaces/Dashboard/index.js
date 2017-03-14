'use strict'

const { static: Static, Router } = require('express')
const path = require('path')

const events = require('./controllers/Event').default
const venues = require('./controllers/Venue').default


exports.middleware = (services) => {
  const router = new Router()

  router.use(Static(path.join(__dirname, 'views')))

  router.get('/', (req, res) => {
    console.log('got this far')
    res.render('dashboard')
  })

  router.use('/events', events)
  router.use('/venues', venues)

  return router
}
