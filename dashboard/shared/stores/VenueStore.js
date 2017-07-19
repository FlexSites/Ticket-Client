const { extendObservable } = require('mobx')
const get = require('lodash.get')
const uuid = require('uuid')
const VenueService = require('../services/Venue')

exports.VenueStore = class VenueStore {
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

    return this.venues.find(venue => venue.id === id) || new exports.Venue(this, { id })
  }

  async save (venue) {
    const result = await VenueService.update(venue.json)
    return this.incoming(result)
  }

  async list () {
    const venues = await VenueService.list()
    venues.forEach((venue) => {
      venue = this.incoming(venue)
      if (!this._selected) this._selected = venue
    })

    return this.venues
  }

  incoming (json) {
    let venue = this.venues.find(venue => venue.id === json.id)
    if (!venue) {
      venue = new exports.Venue(this, json)
      this.venues.push(venue)
    }
    return venue
  }
}

const singleton = new exports.VenueStore()

exports.Venue = class Venue {
  constructor (store = singleton, { id = uuid.v4(), title, description, address = {} } = {}) {
    this.store = store
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
    return this.store.save(this)
  }
}

exports.default = singleton
