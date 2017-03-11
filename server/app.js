'use strict'

const express = require('express')
const path = require('path')

const dynamo = require('./lib/dynamodb').default
const mapValues = require('lodash.mapvalues')

// Interfaces
const GraphQL = require('./interfaces/GraphQL')
const REST = require('./interfaces/REST')
const Dashboard = require('./interfaces/Dashboard')

// Authentication middleware
const User = require('./services/User').default

const PORT = process.env.PORT || 3000

const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

exports.default = (services) => {
  app.use((req, res, next) => {
    User.fromJwt(req.get('Authorization'))
      .then((user) => {
        mapValues(services, (Service, name) => {
          res.locals[name] = new Service(user)
        })
        next()
      })
      .catch(next)
  })
  app.use('/api/graphql', GraphQL.middleware(services))
  app.use('/api/rest', REST.middleware(services))
  app.use('/dashboard', Dashboard.middleware(services))
  app.listen(PORT, () => {
    console.info(`App listening on port ${ PORT }`)
  })
}
