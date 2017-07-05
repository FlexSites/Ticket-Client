const { json } = require('micro')
const { router, get, post, put, del, patch } = require('microrouter')

const Venue = require('../../resources/venue')
const Event = require('../../resources/event')

module.exports = router(
  // Venue
  query('/venues', Venue),
  create('/venues', Venue),
  getOne('/venues/:id', Venue),
  update('/venues/:id', Venue),
  patch('/venues/:id', Venue),
  remove('/venues/:id', Venue),

  // Event
  query('/venues/:id/events', Event),
  create('/venues/:id/events', Event),
  getOne('/events/:id', Event),
  update('/events/:id', Event),
  patch('/events/:id', Event),
  remove('/events/:id', Event),

  // Showtime
  query('/events/:id/showtimes', Showtime),
  create('/events/:id/showtimes', Showtime),
  getOne('/showtimes/:id', Showtime),
  update('/showtimes/:id', Showtime),
  patch('/showtimes/:id', Showtime),
  remove('/showtimes/:id', Showtime),

  // Entertainer
  query('/events/:id/entertainers', Entertainer),
  create('/events/:id/entertainers', Entertainer),
  getOne('/entertainers/:id', Entertainer),
  update('/entertainers/:id', Entertainer),
  patch('/entertainers/:id', Entertainer),
  remove('/entertainers/:id', Entertainer),

  // Ticket
  query('/showtimes/:id/tickets', Ticket),
  create('/showtimes/:id/tickets', Ticket),
  getOne('/tickets/:id', Ticket),
  update('/tickets/:id', Ticket),
  patch('/tickets/:id', Ticket),
  remove('/tickets/:id', Ticket),
)

function getOne (path, Service) {
  return async (req, res) => Service.get({}, req.params.id)
}

function create (path, Service) {
  const body = await json(req)
  return async (req, res) => Service.create({}, body)
}
