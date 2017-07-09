import { extendObservable } from 'mobx'
import * as EventService from '../services/Event'
import venueStore from './VenueStore'
import uuid from 'uuid'

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
    const events = await EventService.list()
    console.log('list', events)
    events.forEach(this.incoming.bind(this))
  }

  async get (id) {
    const event = await EventService.get(id)
    if (event) {
      return this.incoming(event)
    }

    return this.events.find(event => event.id === id) || new Event(this, { id })
  }

  incoming (json) {
    let event = this.events.find(event => event.id === json.id)
    if (!event) {
      event = new Event(this, json)
      this.events.push(event)
    }
    return event
  }
}

export class Event {
  constructor (store, { id = uuid.v4(), title, summary, description, address, showtimes = [], venue } = {}) {
    this.store = store
    if (!this.venue) {
      this.store.venueStore
        .selected()
        .then((venue) => { this.venue = venue })
    }
    extendObservable(this, {
      id,
      title,
      summary,
      description,
      showtimes,
      venue,
      get toJSON () {
        return {
          id: this.id,
          title: this.title,
          summary: this.summary,
          description: this.description,
          showtimes: this.showtimes,
          venue_id: this.venue._id,
        }
      },
    })
  }

  addShowtime (showtime) {
    console.log('add showtime', showtime)
    this.showtimes.push(showtime)
  }
}

export default new EventStore(venueStore)
