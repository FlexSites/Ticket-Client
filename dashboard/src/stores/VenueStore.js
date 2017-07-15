import { extendObservable } from 'mobx'
import get from 'lodash.get'
import uuid from 'uuid'
import * as VenueService from '../services/Venue'

class VenueStore {
  constructor () {
    this._selected = null
    extendObservable(this, {
      venues: [],
      loading: true,
    })
    this.list()
  }

  async selected () {
    if (this._selected) return this._selected
    await this.list()
    return this._selected
  }

  async get (id) {
    const venue = await VenueService.get(id)
    if (venue) {
      return this.incoming(venue)
    }

    return this.venues.find(venue => venue.id === id) || new Venue(this, { id })
  }

  async save (venue) {
    const result = await VenueService.update(venue.json)
    return this.incoming(result)
  }

  async list () {
    const venues = await VenueService.list()
    console.log('venues', venues)
    venues.forEach((venue) => {
      venue = this.incoming(venue)
      if (!this._selected) this._selected = venue
    })

    return this.venues
  }

  incoming (json) {
    let venue = this.venues.find(venue => venue.id === json.id)
    if (!venue) {
      venue = new Venue(this, json)
      this.venues.push(venue)
    }
    return venue
  }
}

const singleton = new VenueStore()

export class Venue {
  constructor (store = singleton, { id = uuid.v4(), title, description, address = {} } = {}) {
    this.store = store
    console.log('constructor', store, id, title, address)
    extendObservable(this, {
      id,
      title,
      description,
      address,
      get formattedAddress () {
        return `${ get(this, 'address.address1', '') } ${ get(this, 'address.locality', '') }, ${ get(this, 'address.region', '') } ${ get(this, 'address.postalCode', '') }`.trim()
      },
      get json () {
        return {
          id: this.id,
          title: this.title,
          description: this.description,
          address: this.address,
        }
      },
    })
  }

  save () {
    console.log('SAVING VENUE', this.json)
    return this.store.save(this)
  }
}

export default singleton
