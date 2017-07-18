import { extendObservable } from 'mobx'
import * as EventService from '../services/Event'
import venueStore from './VenueStore'
import uuid from 'uuid'

export class EventStore {
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
    console.log(events)

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
      console.log(id, json.venue_id, id === json.venue_id)
      return id === json.venue_id
    })
    json.venue = venue

    delete json.venue_id
    console.log('incoming', json, venue)
    if (!event) {
      event = new Event(this, json)
      this.events.push(event)
    }
    return event
  }
}

export class Event {
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
    console.log('SAVING EVENT', this.json)
    return this.store.save(this)
  }

  addShowtime (showtime) {
    console.log('add showtime', showtime)
    this.showtimes.push(showtime)
  }
}

export default new EventStore(venueStore)
