const Router = require('express').Router

const events = require('./controllers/Event').default
const venues = require('./controllers/Venue').default


exports.middleware = (services) => {
  const router = new Router()

  router.get('/', (req, res) => {
    console.log('got this far')
    res.render('dashboard/index')
  })

  router.use('/events', events)
  router.use('/venues', venues)

  return router
}
