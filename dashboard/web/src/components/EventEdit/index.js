import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import get from 'lodash.get'

import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import { ListItem } from 'material-ui/List'
import ImageIcon from 'material-ui/svg-icons/image/image'
import PlaceIcon from 'material-ui/svg-icons/maps/place'
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

import enhance from './eventEdit'
import Loading from '../common/Loading'
import Menu from './Menu'
import Upload from './Upload'

import 'react-infinite-calendar/styles.css' // Make sure to import the default stylesheet
import Maxlength from '../Maxlength'

import './edit.css'

class EventCreate extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      data: {
        showtimes: [],
      },
    }

    this.onChange = this.onChange.bind(this)
    this.extendDescription = this.extendDescription.bind(this)
  }

  extendDescription () {
    if (!this.state.data.description) {
      this.onChange('description', () => {
        this.description.input.refs.input.focus()
      })(null, this.state.data.summary)
      this.onChange('summary')(null, this.state.data.summary.substr(0, 160))
    }
  }

  onChange (field, cb) {
    return (e, value) => {
      this.props.event[field] = value
    }
  }

  render () {
    if (!this.props.event) {
      return <Loading message='Event loading...' />
    }
    console.log('RENDER', this.props.event)
    const selectedVenue = this.props.event.venue || {}
    return (
      <div style={ { flex: 1, overflowY: 'scroll' } }>
        <Paper zDepth={ 5 } style={ styles.venueSelector }>
          <ListItem
            primaryText={ selectedVenue.title }
            secondaryText={ selectedVenue.formattedAddress }
            leftIcon={ <PlaceIcon /> }
            rightIcon={ <RightArrow /> }
            onTouchTap={ this.props.go(`/events/${ this.props.event.id }/venue`, { title: 'Select venue' }) }
          />
        </Paper>
        <Paper zDepth={ 2 } className='dropzone'>
          <Upload event={ this.props.event } />
        </Paper>
        <div style={ { flex: 1, padding: '5vw 5vw 100px', overflowY: 'scroll' } }>
          <Maxlength
            name='title'
            onChange={ this.onChange('title') }
            value={ this.props.event.title || '' }
            fullWidth
            maxLength={ 70 }
            floatingLabelText='Title'
            style={ styles.field }
          />
          <Maxlength
            name='summary'
            onChange={ this.onChange('summary') }
            value={ this.props.event.summary }
            fullWidth
            maxLength={ 160 }
            floatingLabelText='Description'
            multiLine
            rows={ 5 }
            style={ styles.field }
            onMaxReached={ this.extendDescription }
          />
          { this.props.event.description &&
            <TextField
              ref={ (ref) => { this.description = ref } }
              name='description'
              onChange={ this.onChange('description') }
              value={ this.state.data.description }
              floatingLabelText='Extended description'
              multiLine
              rows={ 10 }
              style={ styles.field }
            />
          }
        </div>
        <Menu event={ this.props.event } />
      </div>
    )
  }
}

export default enhance(EventCreate)

EventCreate.propTypes = {
  event: PropTypes.object,
  go: PropTypes.func,
}

const styles = {
  field: {
    width: '100%',
  },
  actions: {
    width: '100%',
    display: 'flex',
    padding: '16px 0',
    justifyContent: 'flex-end',
  },
  venueSelector: {
    borderBottom: 'solid 2px #ddd',
  },
}

// {
//   'description': 'Wiseguys Comedy Club Salt Lake City, 400 West, Salt Lake City, UT, United States',
//   'label': 'Wiseguys Comedy Club Salt Lake City, 400 West, Salt Lake City, UT, United States',
//   'placeId': 'ChIJW1-_igH1UocRvtYWIi7icSk',
//   'isFixture': false,
//   'matchedSubstrings': {
//     'length': 8,
//     'offset': 0
//   },
//   'gmaps': {
//     'address_components': [
//       {
//         'long_name': '194',
//         'short_name': '194',
//         'types': [
//           'street_number'
//         ]
//       },
//       {
//         'long_name': '400 West',
//         'short_name': '400 W',
//         'types': [
//           'route'
//         ]
//       },
//       {
//         'long_name': 'Rio Grande',
//         'short_name': 'Rio Grande',
//         'types': [
//           'neighborhood',
//           'political'
//         ]
//       },
//       {
//         'long_name': 'Salt Lake City',
//         'short_name': 'Salt Lake City',
//         'types': [
//           'locality',
//           'political'
//         ]
//       },
//       {
//         'long_name': 'Salt Lake County',
//         'short_name': 'Salt Lake County',
//         'types': [
//           'administrative_area_level_2',
//           'political'
//         ]
//       },
//       {
//         'long_name': 'Utah',
//         'short_name': 'UT',
//         'types': [
//           'administrative_area_level_1',
//           'political'
//         ]
//       },
//       {
//         'long_name': 'United States',
//         'short_name': 'US',
//         'types': [
//           'country',
//           'political'
//         ]
//       },
//       {
//         'long_name': '84101',
//         'short_name': '84101',
//         'types': [
//           'postal_code'
//         ]
//       }
//     ],
//     'formatted_address': '194 400 W, Salt Lake City, UT 84101, USA',
//     'geometry': {
//       'location': {
//         'lat': 40.765238,
//         'lng': -111.90291660000003
//       },
//       'location_type': 'APPROXIMATE',
//       'viewport': {
//         'south': 40.76388901970849,
//         'west': -111.90426558029151,
//         'north': 40.76658698029149,
//         'east': -111.90156761970849
//       }
//     },
//     'place_id': 'ChIJW1-_igH1UocRvtYWIi7icSk',
//     'types': [
//       'establishment',
//       'point_of_interest'
//     ]
//   },
//   'location': {
//     'lat': 40.765238,
//     'lng': -111.90291660000003
//   }
// }
