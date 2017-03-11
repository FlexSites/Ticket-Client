'use strict'

const Bluebird = require('bluebird')

function endpoint (name, fn) {
  fn = Bluebird.method(fn)
  return (req, res, next) => {
    return fn(res.locals[name], req, res)
      .then(res.send.bind(res))
      .catch(next)
  }
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
