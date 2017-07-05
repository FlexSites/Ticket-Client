import React from 'react'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import Dropzone from 'react-dropzone'
import SelectField from 'material-ui/SelectField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import moment from 'moment'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import DropDownMenu from 'material-ui/DropDownMenu'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import 'react-infinite-calendar/styles.css' // Make sure to import the default stylesheet
import * as Venue from '../../../services/Venue'
import ImageIcon from 'material-ui/svg-icons/image/image'
import Maxlength from '../Maxlength'

import './edit.css'

export default class VenueCreate extends React.Component {
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
    this.onCalendarSelect = this.onCalendarSelect.bind(this)
  }

  componentWillMount () {
    Venue.list()
      .then((venues) => {
        this.setState({ venues, data: { venue_id: venues[0]._id } })
      })
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
        <Toolbar style={{ flex: 1 }}>
          <ToolbarGroup>
            <ToolbarTitle text={ `${ this.state.data._id ? 'Edit' : 'New' } Event` } />
          </ToolbarGroup>
          <ToolbarGroup>
            <SelectField
              name='venue'
              fullWidth
              floatingLabelText='Venue'
              value={ this.state.data.venue_id }
              onChange={ (e, k, venue_id) => {
                console.log('setting venue_id', e, venue_id)
                this.setState({ data: { venue_id } })
              } }
            >
              { this.state.venues.map((venue) => <MenuItem key={ venue._id } value={ venue._id } primaryText={ venue.title } />)}
              <MenuItem value={ 0 } primaryText='+ New Venue' />
            </SelectField>
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <RaisedButton label={ `${ this.state.data._id ? 'Save' : 'Create' } Event` } primary />
          </ToolbarGroup>
        </Toolbar>
        <div style={ { display: 'flex', flex: 1, padding: '16px' } }>
          <div style={{ width: '50%', padding: '0 16px' }}>
            <Maxlength
              name='title'
              maxlength={ 70 }
              floatingLabelText='Title'
              style={ styles.field }
            />
            <Maxlength
              name='summary'
              maxlength={ 160 }
              floatingLabelText='Summary'
              multiLine
              rows={ 5 }
              style={ styles.field }
            />
          </div>
          <div style={ { width: '50%' } }>
            <Paper>
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
          </div>
        </div>
        <div style={ { flex: 1, padding: '16px', overflowY: 'scroll' } }>
          <TextField
            name='description'
            floatingLabelText='Description'
            multiLine
            rows={ 10 }
            style={ styles.field }
          />
          <DatePicker
            name='showtime[0]'
            onChange={ this.onCalendarSelect }
            floatingLabelText='Date'
            formatDate={ (date) => moment(date).format('MM/DD/YYYY') }
          />
          <div style={ styles.actions }>
            <FlatButton primary>Cancel</FlatButton>
            <RaisedButton primary>Save Event</RaisedButton>
          </div>
        </div>
      </div>
    )
  }
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
