'use strict'

const Interface = require('../Interface').default
const graphql = require('graphql')
const graphqlExpress = require('express-graphql')
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema
const path = require('path')
const fs = require('fs')

const resolvers = require('./resolvers').default

const idl = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')

/**
 * GraphQL
 *
 * GraphQL API layer to backing service
 *
 * Calls UserInterface and populates Viewer object
 *
 * Authentication only. No Authorizations.
 *
 * NO BUSINESS LOGIC
 */

const schema = makeExecutableSchema({
  typeDefs: idl,
  resolvers,
})



exports.default = class GraphQL extends Interface {

}

exports.middleware = (services) =>
  graphqlExpress((req, res) => ({
    schema,
    context: res.locals,
    graphiql: true,
  }))

exports.handler = (event, context, cb) => {
  graphql(schema, event.query, {}, {}, event.variables)
    .then((res) => {
      cb(null, res)
    })
    .catch(cb)
}
