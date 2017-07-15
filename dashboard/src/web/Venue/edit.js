import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Geosuggest from 'react-geosuggest'
import TextField from 'material-ui/TextField'
import set from 'lodash.set'
import Maxlength from '../Maxlength'
import Address from '../../services/address'

export default class VenueCreate extends React.Component {
  constructor (props) {
    super(props)

    this.state = Object.assign({
      venue: {},
    }, this.props.location.state)
  }

  onChange (field) {
    return (e, value) => {
      console.log(e, value)
      const change = {}
      set(change, field, value)
      const venue = Object.assign(change, this.state.venue)
      console.log('change', venue)
      this.setState({ venue })
    }
  }

  render () {
    const { venue } = this.state
    // if (!this.state.venue) {
      return (
        <div style={ { flex: 1, padding: '16px' } }>
          <Maxlength onChange={ this.onChange('title') } value={ venue.title } fullWidth name='title' floatingLabelText='Name' maxLength={ 70 } />
          <Maxlength onChange={ this.onChange('description') } value={ venue.description } fullWidth name='description' floatingLabelText='Description' maxLength={ 160 } multiLine />
          <TextField onChange={ this.onChange('address.address1') } value={ venue.address.address1 } name='address1' floatingLabelText='Street' />
          <TextField onChange={ this.onChange('address.address2') } value={ venue.address.address2 } name='address2' floatingLabelText='Suite' />
          <TextField onChange={ this.onChange('address.address3') } value={ venue.address.address3 } name='address3' floatingLabelText='Other address' />
          <TextField onChange={ this.onChange('address.locality') } value={ venue.address.locality } name='locality' floatingLabelText='City' />
          <TextField onChange={ this.onChange('address.region') } value={ venue.address.region } name='region' floatingLabelText='State' />
          <TextField onChange={ this.onChange('address.postalCode') } value={ venue.address.postalCode } name='postalCode' floatingLabelText='Postal Code' />
        </div>
      )
    // }
    // return (
    //   <div style={ { flex: 1, padding: '16px' } }>
    //     <pre>{ JSON.stringify(this.state.venue, null, 2) }</pre>
    //   </div>
    // )
  }
}

// {
//   "description": "Wiseguys Comedy Club Salt Lake City, 400 West, Salt Lake City, UT, United States",
//   "label": "Wiseguys Comedy Club Salt Lake City, 400 West, Salt Lake City, UT, United States",
//   "placeId": "ChIJW1-_igH1UocRvtYWIi7icSk",
//   "isFixture": false,
//   "matchedSubstrings": {
//     "length": 8,
//     "offset": 0
//   },
//   "gmaps": {
//     "address_components": [
//       {
//         "long_name": "194",
//         "short_name": "194",
//         "types": [
//           "street_number"
//         ]
//       },
//       {
//         "long_name": "400 West",
//         "short_name": "400 W",
//         "types": [
//           "route"
//         ]
//       },
//       {
//         "long_name": "Rio Grande",
//         "short_name": "Rio Grande",
//         "types": [
//           "neighborhood",
//           "political"
//         ]
//       },
//       {
//         "long_name": "Salt Lake City",
//         "short_name": "Salt Lake City",
//         "types": [
//           "locality",
//           "political"
//         ]
//       },
//       {
//         "long_name": "Salt Lake County",
//         "short_name": "Salt Lake County",
//         "types": [
//           "administrative_area_level_2",
//           "political"
//         ]
//       },
//       {
//         "long_name": "Utah",
//         "short_name": "UT",
//         "types": [
//           "administrative_area_level_1",
//           "political"
//         ]
//       },
//       {
//         "long_name": "United States",
//         "short_name": "US",
//         "types": [
//           "country",
//           "political"
//         ]
//       },
//       {
//         "long_name": "84101",
//         "short_name": "84101",
//         "types": [
//           "postal_code"
//         ]
//       }
//     ],
//     "formatted_address": "194 400 W, Salt Lake City, UT 84101, USA",
//     "geometry": {
//       "location": {
//         "lat": 40.765238,
//         "lng": -111.90291660000003
//       },
//       "location_type": "APPROXIMATE",
//       "viewport": {
//         "south": 40.76388901970849,
//         "west": -111.90426558029151,
//         "north": 40.76658698029149,
//         "east": -111.90156761970849
//       }
//     },
//     "place_id": "ChIJW1-_igH1UocRvtYWIi7icSk",
//     "types": [
//       "establishment",
//       "point_of_interest"
//     ]
//   },
//   "location": {
//     "lat": 40.765238,
//     "lng": -111.90291660000003
//   }
// }
