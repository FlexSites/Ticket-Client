const { router, use, get, post, put, patch, del } = require('@ticketing/microrouter')
const event = require('@ticketing/event/service')

const query = require('./methods/query')
const create = require('./methods/create')
const update = require('./methods/update')
const remove = require('./methods/remove')
const getOne = require('./methods/get')

module.exports = router(
  get('/venues', query),
  post('/venues', create),
  put('/venues/:id', update),
  patch('/venues/:id', update),
  del('/venues/:id', remove),
  get('/venues/:id', getOne),
  use('/venues/:venue_id/events(/:id)', getOne)
)
