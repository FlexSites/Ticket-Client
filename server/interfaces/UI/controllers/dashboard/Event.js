const Router = require('express').Router
const urlencoded = require('body-parser').urlencoded

const router = new Router()

router.get('/', (req, res, next) => {
  res.locals.event.find()
    .then((events) => {
      res.render('event/list', { events })
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  const { venue, event, showtime } = res.locals
  return Promise.all([
    event.get(req.params.id),
    venue.find(),
    showtime.find(),
  ])
    .then(([ event, venues, showtimes ]) => {
      event.showtimes = event.showtimes || []
      res.render('event/item', { event, venues, showtimes: showtimes || [] })
    })
    .catch(next)
})

router.post('/:id', urlencoded({ extended: true }), (req, res, next) => {
  res.locals.event.update(req.params.id, req.body)
    .then((event) => {
      res.render('event/success', { event })
    })
    .catch(next)
})

exports.default = router
