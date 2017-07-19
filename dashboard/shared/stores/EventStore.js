const { extendObservable } = require('mobx')
const EventService = require('../services/Event')
const { default: venueStore } = require('./VenueStore')
const uuid = require('uuid')

class EventStore {
  constructor (venueStore) {
    this.venueStore = venueStore
    extendObservable(this, {
      selected: null,
      events: [],
      loading: true,
    })
    this.list()
  }

  async list () {
    const venues = await this.venueStore.list()

    const eventsPromises = await Promise.all(
      venues.map(({ id }) => EventService.list(id))
    )
    const events = [].concat(...eventsPromises)
    events.forEach(this.incoming.bind(this))
  }

  async get (id) {
    const event = await EventService.get(id)
    if (event) {
      return this.incoming(event)
    }

    return this.events.find(event => event.id === id) || new Event(this, { id })
  }

  async save (event) {
    await event.venue.save()
    const result = await EventService.update(event.json)
    return this.incoming(result)
  }

  incoming (json) {
    let event = this.events.find(event => event.id === json.id)
    if (!json.venue_id) json.venue_id = this.venueStore.venues[0].id

    const venue = this.venueStore.venues.find(({ id }) => {
      return id === json.venue_id
    })
    json.venue = venue

    delete json.venue_id
    if (!event) {
      event = new Event(this, json)
      this.events.push(event)
    }
    return event
  }
}

class Event {
  constructor (store, {
    id = uuid.v4(),
    title = '',
    image = '',
    summary = '',
    description = '',
    address = {},
    showtimes = [],
    venue = {},
  } = {}) {
    this.store = store
    extendObservable(this, {
      id,
      title,
      summary,
      description,
      showtimes,
      venue,
      image,
      get json () {
        return {
          id: this.id,
          title: this.title,
          summary: this.summary,
          description: this.description,
          showtimes: this.showtimes,
          venue_id: this.venue.id,
        }
      },
    })
  }

  save () {
    return this.store.save(this)
  }

  addShowtime (showtime) {
    this.showtimes.push(showtime)
  }
}

exports.default = new EventStore(venueStore)
exports.Event = Event
exports.EventStore = EventStore
