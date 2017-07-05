const { router, get, post, put, del, patch } = require('microrouter')
const { getParamsAndQuery } = require('microrouter/utils')
const UrlPattern = require('url-pattern')

function use (path, handler) {
  const route = new UrlPattern(path)

  return (req, res) => {
    const { params, query } = getParamsAndQuery(route, req.url)
    if (params) {
      const url = req.url.replace(path, '/')
      return handler(Object.assign({}, req, { url, params, query }), res)
    }
  }
}

function wrapRouter(...funcs) {
  const _router = router(...funcs)
  _router.endpoints = funcs
  return _router
}

module.exports = {
  router: wrapRouter,
  get,
  post,
  put,
  patch,
  del,
  use,
}
