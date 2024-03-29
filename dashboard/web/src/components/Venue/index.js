import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import Paper from 'material-ui/Paper'
import set from 'lodash.set'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'

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
        <Paper zDepth={ 2 } style={ { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 16 } }>
          <div>
            <div>
              <span style={ { fontWeight: 'bold' } }>{ venue.title }</span>
            </div>
            <div>
              <span>{ get(venue, 'address.address1', '') }</span>
              <span>{ get(venue, 'address.address2', '') }</span>
              <span>{ get(venue, 'address.address3', '') }</span>
            </div>
            <div>
              <span>{ get(venue, 'address.locality', '') }, </span>
              <span>{ get(venue, 'address.region', '') }</span>
              <span> { get(venue, 'address.postalCode', '') }</span>
            </div>
          </div>
          <EditIcon />
        </Paper>
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

VenueCreate.propTypes = {
  location: PropTypes.object,
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
