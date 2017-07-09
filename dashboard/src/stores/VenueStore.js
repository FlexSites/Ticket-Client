import { extendObservable } from 'mobx'
import get from 'lodash.get'
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

  async list () {
    const venues = await VenueService.list()
    venues.forEach((venue) => {
      venue = this.incoming(venue)
      if (!this._selected) this._selected = venue
    })
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

class Venue {
  constructor (store, { id, title, description, address } = {}) {
    this.store = store
    extendObservable(this, {
      id,
      title,
      description,
      address,
      get formattedAddress () {
        return `${ get(this, 'address.address1', '') } ${ get(this, 'address.locality', '') }, ${ get(this, 'address.region', '') } ${ get(this, 'address.postalCode', '') }`.trim()
      },
      get toJSON () {
        return {
          id: this.id,
          title: this.title,
          description: this.description,
          address: this.address,
        }
      },
    })
  }
}

export default new VenueStore()
