'use strict'

const setup = require('../services').setup
const events = require('./events.json')
const showtimes = require('./showtimes.json')
const venues = require('./venues.json')
const axios = require('axios')

console.log('CALLING SETUP')
setup()
  .then((Services) => {
    return Promise.all(
      showtimes.map((obj) => axios.post('http://localhost:3000/api/rest/showtimes', obj))
    )
  })

  .then((Services) => {
    return Promise.all(
      events.map((obj) => axios.post('http://localhost:3000/api/rest/events', obj))
    )
  })

  .then((Services) => {
    return Promise.all(
      venues.map((obj) => axios.post('http://localhost:3000/api/rest/venues', obj))
    )
  })
  .then((results) => console.log(results))
  .catch((ex) => {
    console.error('bad', ex)
  })
