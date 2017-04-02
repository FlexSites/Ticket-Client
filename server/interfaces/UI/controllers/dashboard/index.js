'use strict'

const { static: Static, Router } = require('express')
const path = require('path')
const passport = require('../../../../lib/auth0').default

const events = require('./Event').default
const venues = require('./Venue').default


const router = new Router()

// Authentication check
function requireAuth (req, res, next) {
  if (!req.user || !req.user.id) {
    const err = new Error('Unauthenticated')
    err.status = 401
    return next(err)
  }
  next()
}

router.use(Static(path.join(__dirname, 'views')))

router.get('/login', (req, res, next) => {
  console.log('login route hit');
  res.render('login')
})

router.get(
  '/callback',
  passport.authenticate('auth0', { failureRedirect: '/login/error' }),
  (req, res, next) => {
    res.render('success')
  })

router.get('/', (req, res) => {
  console.log('got this far')
  res.render('dashboard')
})

router.use('/events', /* requireAuth,*/ events)
router.use('/venues', /* requireAuth,*/ venues)

module.exports.default = router
