const { default: eventStore, EventStore } = require('./EventStore')
const { default: venueStore, VenueStore } = require('./VenueStore')

console.log('Stores', EventStore, VenueStore)

module.exports = {
  eventStore,
  venueStore,
  EventStore,
  VenueStore,
}
