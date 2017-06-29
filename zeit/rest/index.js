const { json } = require('micro')
const { router, get, post } = require('microrouter')
const Event = require('@nerdsauce/events')
const { toViewer } = require('@nerdsauce/auth')
const { handleErrors } = require('../lib/http-errors')
const { NotFound } = require('http-errors')

async function create (req, res) {
  const viewer = await toViewer(req)
  const body = await json(req)
  body.venue_id = req.params.venue
  return Event.create(viewer, body)
}

async function findVenueEvents (req, res) {
  const viewer = await toViewer(req)
  return Event.query(viewer, { venue_id: req.params.venue })
}

function notfound (req, res) {
  throw new NotFound()
}

const eventRouter = router(
  get('/venues/:venue/events', findVenueEvents),
  post('/venues/:venue/events', create),
  get('/*', notfound)
)

module.exports = handleErrors(eventRouter, true)
