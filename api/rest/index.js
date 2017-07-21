const express = require('express')
const { json } = require('body-parser')
const cors = require('cors')
const { NotFound } = require('http-errors')

const Venue = require('@nerdsauce/venues')
const Medium = require('@nerdsauce/media')
const Event = require('@nerdsauce/events')
const Showtime = require('@nerdsauce/showtimes')
const { middleware: auth } = require('@nerdsauce/auth')

const updateVenue = middleware((viewer, params, body) => Venue.update(viewer, params.venue, body))
const updateEvent = middleware((viewer, params, body) => Event.update(viewer, params.event, body))
const updateShowtime = middleware((viewer, params, body) => Showtime.update(viewer, params.showtime, body))

const app = express()

app.use(cors())
app.use(auth())

app.get('/venues', middleware((viewer, params) => Venue.query(viewer)))
app.post('/venues', json(), middleware((viewer, { venue }, body) => Venue.create(viewer, body)))
app.get('/venues/:venue', middleware((viewer, params) => Venue.get(viewer, params.venue)))
app.put('/venues/:venue', json(), updateVenue)
app.patch('/venues/:venue', json(), updateVenue)

app.post('/events/:event/uploads', json(), middleware((viewer, params, body) => Medium.getSignedUrl(viewer, params.event, body)))
app.get('/venues/:venue/events', middleware((viewer, params) => Event.query(viewer, { venue_id: params.venue })))
app.post('/venues/:venue/events', json(), middleware((viewer, { venue }, body) => Event.create(viewer, Object.assign(body, { venue_id: venue }))))
app.get('/events/:event', middleware((viewer, params) => Event.get(viewer, params.event)))
app.put('/events/:event', json(), updateEvent)
app.patch('/events/:event', json(), updateEvent)

app.get('/events/:event/showtimes', middleware((viewer, params) => Showtime.query(viewer, { event_id: params.event })))
app.post('/events/:event/showtimes', json(), middleware((viewer, { event }, body) => Showtime.create(viewer, Object.assign(body, { event_id: event }))))
app.get('/showtimes/:showtime', middleware((viewer, params) => Showtime.get(viewer, params.showtime)))
app.put('/showtimes/:showtime', json(), updateShowtime)
app.patch('/showtimes/:showtime', json(), updateShowtime)

// Error handling
app.use((req, res, next) => {
  next(new NotFound(`Endpoint '${ req.url }' not found`))
})

app.use((err, req, res, next) => {
  console.error(err)
  res
    .status(err.status || 500)
    .send({
      message: err.message,
      status: err.status,
    })
})

module.exports = app

function middleware (fn) {
  return (req, res, next) => {
    return fn(res.locals.viewer, req.params, req.body)
      .then(res.send.bind(res))
      .catch(next)
  }
}
