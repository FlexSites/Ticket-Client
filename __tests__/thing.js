const fs = require('fs')
const uuid = require('uuid')
const pick = require('lodash.pick')

const data = require('./fake-data.json')

const venues = data.reduce((prev, curr) => {
  const str = JSON.stringify(curr.venue)

  if (!prev.includes(str)) {
    prev.push(str)
  }

  return prev
}, [])
.map(JSON.parse)
.map((venue) => {
  console.log(typeof venue, venue)

  venue.id = uuid.v4()
  return venue
})

const showtimes = []

const events = data.map((event) => {
  event.id = uuid.v4()

  event.venueID = venues.find((venue) => {
    return venue.name === event.venue.name
  }).id

  const id = event.id
  event.showtimes.forEach((showtime) => {
    showtime.eventID = id
  })

  showtimes.push(...event.showtimes)

  delete event.showtimes

  delete event.venue

  return event
})


fs.writeFileSync('__tests__/events.json', JSON.stringify(events, null, 2))
fs.writeFileSync('__tests__/showtimes.json', JSON.stringify(showtimes, null, 2))
// fs.writeFileSync('__tests__/venues.json', JSON.stringify(venues, null, 2))

// data.map((datum) => {
//   const event = pick(dataum, ['title', 'price', 'imageUrl', 'videoUrl', 'description', ])
// })
