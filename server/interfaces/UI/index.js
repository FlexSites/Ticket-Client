const Router = require('express').Router
const path = require('path')

const events = require('./controllers/Event').default
const venues = require('./controllers/Venue').default
const dashboard = require('./controllers/dashboard').default


exports.middleware = (services, app) => {

  const router = new Router()

  app.set('view engine', 'pug')
  app.set('views', path.join(__dirname, 'views'))

  router.get('/events', (req, res) => {
    Promise.all([
      res.locals.event.find(),
      res.locals.showtime.find(),
    ])
      .then(([ events, showtimes ]) => {
        res.render('events/list', {
          events: events,
          showtimes: showtimes,
        })
      })
  })

  router.get('/', (req, res) => {
    Promise.all([
      res.locals.event.find(),
      res.locals.showtime.find(),
    ])
      .then(([ events, showtimes ]) => {
        res.render('events/list', {
          events: events,
          showtimes: showtimes,
        })
      })
  })

  router.use('/dashboard', dashboard)

  router.get('/checkout', (req, res) => {
    Promise.all([
      res.locals.event.find(),
      res.locals.showtime.find(),
    ])
      .then(([ events, showtimes ]) => {
        res.render('checkout', {
          event: events[0],
          showtime: showtimes[0],
        })
      })
  })

  router.post('/thank-you', (req, res, next) => {
    res.locals.event.get(req.query.id)
      .then((event) => {
        res.render('thank-you', { event })
      })
  })
  router.use('/venues', venues)

  return router
}
