const Router = require('express').Router
const urlencoded = require('body-parser').urlencoded

const router = new Router()

router.get('/', (req, res, next) => {
  res.locals.venue.find()
    .then((venues) => {
      res.render('dashboard/venue/list', { venues })
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  res.locals.venue.get(req.params.id)
  .then((venue) => {
    res.render('dashboard/venue/item', { venue })
  })
  .catch(next)
})

router.post('/:id', urlencoded({ extended: true }), (req, res, next) => {
  res.locals.venue.update(req.params.id, req.body)
    .then((venue) => {
      res.render('dashboard/venue/success', { venue })
    })
    .catch(next)
})

exports.default = router
