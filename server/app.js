'use strict'

const express = require('express')
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const mapValues = require('lodash.mapvalues')

const passport = require('./lib/auth0').default

// Interfaces
const GraphQL = require('./interfaces/GraphQL')
const REST = require('./interfaces/REST')
const UI = require('./interfaces/UI')

// Authentication middleware
const User = require('./services/User').default

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.static(path.resolve(__dirname, '..', 'client', 'public')))

exports.default = (services) => {
  app.use(cookieParser())
  app.use(session({
    secret: 'shhhhhhhhh',
    resave: true,
    saveUninitialized: true,
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use((req, res, next) => {
    User.fromJwt(req.get('Authorization'))
      .then((user) => {
        req.user = user
        mapValues(services, (Service, name) => {
          res.locals[name] = new Service(user)
        })
        next()
      })
      .catch(next)
  })
  app.use('/api/graphql', GraphQL.middleware(services))
  app.use('/api/rest', REST.middleware(services))
  app.use('/', UI.middleware(services, app))

  app.listen(PORT, () => {
    console.info(`App listening on port ${ PORT }`)
  })
}
