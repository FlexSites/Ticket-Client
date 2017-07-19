const { default: eventStore, EventStore } = require('./stores/EventStore')
const { default: venueStore, VenueStore } = require('./stores/VenueStore')

console.log('Stores', eventStore instanceof EventStore, venueStore instanceof VenueStore)

module.exports = {
  eventStore,
  venueStore,
  EventStore,
  VenueStore,
}
