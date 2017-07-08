import React from 'react'
import Dropzone from 'react-dropzone'
import moment from 'moment'
import { withRouter } from 'react-router-dom'

import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import DropDownMenu from 'material-ui/DropDownMenu'
import { ListItem } from 'material-ui/List'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import ImageIcon from 'material-ui/svg-icons/image/image'
import PlaceIcon from 'material-ui/svg-icons/maps/place'
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

import Menu from './Menu'

import 'react-infinite-calendar/styles.css' // Make sure to import the default stylesheet
import * as Venue from '../../services/Venue'
import Maxlength from '../Maxlength'

import './edit.css'

class EventCreate extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {
        venue_id: 0,
        showtimes: [],
      },
      venues: [],
    }
    this.onDrop = this.onDrop.bind(this)
    this.onChange = this.onChange.bind(this)
    this.extendDescription = this.extendDescription.bind(this)
    this.onCalendarSelect = this.onCalendarSelect.bind(this)
  }

  go (to, state) {
    return () => this.props.history.push(to, state)
  }

  extendDescription () {
    if (!this.state.data.description) {
      this.onChange('description', () => {
        this.description.input.refs.input.focus()
      })(null, this.state.data.summary)
      this.onChange('summary')(null, this.state.data.summary.substr(0, 160))
    }
  }

  componentWillMount () {
    Venue.list()
      .then((venues) => {
        this.setState({ venues, data: { venue_id: venues[0]._id } })
      })
  }

  onChange (field, cb) {
    return (e, value) => {
      const data = Object.assign({}, this.state.data, { [field]: value })
      this.setState({ data }, cb)
    }
  }

  onDrop (acceptedFiles, rejectedFiles) {
    console.log(acceptedFiles[0])
    this.setState({
      data: {
        image: acceptedFiles[0].preview,
      },
    })
  }

  onCalendarSelect (e, value) {
    this.setState({
      showtimes: [ value ],
    })
  }

  render () {
    return (
      <div style={{ flex: 1, overflowY: 'scroll' }}>
        <Paper zDepth={ 5 } style={ styles.venueSelector }>
          <ListItem
            primaryText='Wiseguys Ogden'
            secondaryText="169 Historic Ogden"
            leftIcon={ <PlaceIcon /> }
            rightIcon={ <RightArrow /> }
            onTouchTap={ this.go('/venues', { title: 'Select venue' })}
          />
        </Paper>
        <Paper zDepth={ 2 }className='dropzone'>
          <Dropzone
            accept='image/jpeg, image/png'
            multiple={ false }
            name='profile'
            maxSize={ 2097152 }
            minSize={ 64 }
            onDrop={ this.onDrop }
            className='dropzone'
            style={ { backgroundImage: `url(${ this.state.data.image })` } }
          >
            { !this.state.data.image &&
              <div className='dropzone'>
                <h4>Add event photo</h4>
                <ImageIcon color='#999' style={ { width: 64, height: 64 } } />
              </div>
            }
          </Dropzone>
        </Paper>
        <div style={ { flex: 1, padding: '5vw 5vw 100px', overflowY: 'scroll' } }>
          <Maxlength
            name='title'
            onChange={ this.onChange('title') }
            value={ this.state.data.title }
            fullWidth
            maxLength={ 70 }
            floatingLabelText='Title'
            style={ styles.field }
          />
          <Maxlength
            name='summary'
            onChange={ this.onChange('summary') }
            value={ this.state.data.summary }
            fullWidth
            maxLength={ 160 }
            floatingLabelText='Description'
            multiLine
            rows={ 5 }
            style={ styles.field }
            onMaxReached={ this.extendDescription }
          />
          { this.state.data.description &&
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
        <Menu />
      </div>
    )
  }
}

export default withRouter(EventCreate)

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
  }
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