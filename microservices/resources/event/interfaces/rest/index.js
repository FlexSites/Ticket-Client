const { router, get, post, put, patch, del } = require('microrouter')

const query = require('./methods/query')
const create = require('./methods/create')
const update = require('./methods/update')
const remove = require('./methods/remove')
const getOne = require('./methods/get')

module.exports = router(
  get('/venues/:venue_id/events', query),
  post('/venues/:venue_id/events', create),
  put('/events/:event_id', update),
  patch('/events/:event_id', update),
  del('/events/:event_id', remove),
  get('/events/:event_id', getOne)
)
