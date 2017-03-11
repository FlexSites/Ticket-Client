'use strict'

const Bluebird = require('bluebird')
const pluralize = require('pluralize')
const { fromGlobalId } = require('graphql-relay')
const mapValues = require('lodash.mapvalues')

function endpoint (name, fn) {
  fn = Bluebird.method(fn)
  return (req, res, next) => {
    return fn(res.locals[name], req, res)
      .then(hateos)
      .then(res.send.bind(res))
      .catch(next)
  }
}

function hateos (data) {
  if (data.id) {
    const { type } = fromGlobalId(data.id)
    data.href = `https://rest.evenue.io/${ pluralize(type) }/${ data.id }`
  }

  return mapValues(data, (val, key) => {
    if (typeof val === 'object') {
      if (Array.isArray(val)) {
        return val.map(hateos)
      }
      return hateos(val)
    }
    return val
  })
}
exports.endpoint = endpoint
// function endpoint (name, fn) {
//   return middleware((req, res, next) => fn(res.locals[name], req, res))
// }

function middleware (fn) {
  return (req, res, next) => {
    return fn(req, res, next)
      .then(res.send.bind(res))
      .catch(next)
  }
}

// exports.endpoint = endpoint
exports.middleware = middleware
