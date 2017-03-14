const Router = require('express').Router

const events = require('./controllers/Event').default
const venues = require('./controllers/Venue').default


exports.middleware = (services) => {
  const router = new Router()

  router.get('/', (req, res) => {
    Promise.all([
      res.locals.event.find(),
      res.locals.showtime.find(),
    ])
      .then(([ events, showtimes ]) => {
        res.render('catalog/index', {
          event: events[0],
          showtime: showtimes[0],
        })
      })
  })

  router.use('/thank-you', (req, res, next) => {
    res.locals.event.get(req.query.id)
      .then((event) => {
        res.render('catalog/thank-you', { event })
      })
  })
  router.use('/venues', venues)

  return router
}