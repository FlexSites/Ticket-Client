/* global google */

import debounce from 'debounce-promise'
import { Venue } from '../../stores/VenueStore'

let online = true
let service
let geocoder
try {
  // const API_KEY = 'AIzaSyCMCRdQCnmxf3odiUDrapSD14EY4zBluSg'
  service = new google.maps.places.AutocompleteService()
  geocoder = new google.maps.Geocoder()
} catch (ex) {
  online = false
}

function _autocomplete (input) {
  if (!online) return Promise.resolve([])
  return new Promise((resolve, reject) => {
    service.getPlacePredictions(
      {
        input,
        types: ['establishment'],
        componentRestrictions: {
          country: 'USA',
        },
      },
      (suggestions, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          return reject(status)
        }
        return resolve(suggestions)
      }
    )
  })
    .then((suggestions) => {
      return Promise.all(suggestions.map(geocode))
    })
    .then((suggestions) => suggestions.map(format))
}

function geocode (suggest) {
  return new Promise((resolve, reject) => {
    geocoder.geocode(
      suggest.place_id ? { placeId: suggest.place_id } : { address: suggest.label },
      (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const gmaps = results[0]
          const location = gmaps.geometry.location
          suggest.gmaps = gmaps
          suggest.location = {
            lat: location.lat(),
            lng: location.lng(),
          }
        }
        resolve(suggest)
      }
    )
  })
}

// [
//    {
//       "_id":"595aa64f4603793d170b9388",
//       "title":"Wiseguys Comedy Downtown SLC",
//       "description":"Some crazy description",
//       "address":{
//          "address1":"194 S 400 W",
//          "locality":"Salt Lake City",
//          "region":"UT",
//          "postalCode":"84101"
//       },
//       "phone":"8015325233"
//    }
// ]

function format ({ gmaps, structured_formatting }) {
  const object = gmaps.address_components.reduce((prev, curr) => {
    prev[curr.types[0]] = curr.long_name
    return prev
  }, {})

  const address = {
    address1: `${ object.street_number || '' } ${ object.route || '' }`.trim(),
    locality: object.locality || '',
    region: object.administrative_area_level_1 || '',
    country: object.country || '',
    postalCode: object.postal_code || '',
  }

  return new Venue(null, {
    title: structured_formatting.main_text,
    address,
  })
}

export const autocomplete = debounce(_autocomplete, 1000)
