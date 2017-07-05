const { router } = require('microrouter')
const { getParamsAndQuery } = require('microrouter/utils')
const UrlPattern = require('url-pattern')
const pathToRegExp = require('path-to-regexp')

const event = require('./resources/event')
const venue = require('./resources/venue')

function use (path, handler) {
  const re = pathToRegExp(path)

  return (req, res) => {

    if (re.match) {
      const url = req.url.replace(path, '/')
      return handler(Object.assign({}, req, { url }), res)
    }
  }
}

module.exports = router(
  use('/events', event),
  use('/venues', venue)
)
