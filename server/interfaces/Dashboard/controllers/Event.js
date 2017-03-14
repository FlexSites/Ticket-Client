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
  const { venue, event } = res.locals
  return Promise.all([
    event.get(req.params.id),
    venue.find(),
  ])
    .then(([ event, venues ]) => {
      res.render('event/item', { event, venues })
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
