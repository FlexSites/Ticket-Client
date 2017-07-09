import React from 'react'
import Paper from 'material-ui/Paper'
import { withRouter } from 'react-router-dom'
import Geosuggest from 'react-geosuggest'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { observer } from 'mobx-react'

import ResourceList from '../List'
import * as Venue from '../../services/Venue'
import './geosuggest.css'
import * as Address from '../../services/address'

class ListVenues extends React.Component {
  constructor (props) {
    super(props)

    this.store = props.venues

    this.state = {
      suggestions: [],
      searching: false,
    }

    this.autocomplete = this.autocomplete.bind(this)
  }

  go (id, state) {
    const clone = Object.assign({}, state)
    return () => this.props.history.push(`/venues/${ id }`, clone)
  }

  autocomplete (input) {
    const searching = !!input.length

    if (searching !== this.state.searching) {
      this.setState({
        searching,
      })
    }

    return Address
      .autocomplete(input)
      .then((suggestions = []) => {
        console.log('suggestions', suggestions)
        this.setState({ suggestions })
      })
      .catch((ex) => {
        console.log(ex)
      })
  }

  render () {
    const venues = this.state.searching ? this.state.suggestions : this.store.venues

    console.log(venues[0])
    return (
      <div style={ styles.container }>
        <Paper zDepth={ 1 } style={ styles.searchBox }>
          <TextField
            name='search'
            fullWidth
            placeholder='Search...'
            onChange={ (e, value) => this.autocomplete(value) }
          />
          <RaisedButton primary style={ styles.newVenueButton }>New Venue</RaisedButton>
        </Paper>

        <List>
          <Subheader>Venues</Subheader>
          {
            venues.map((venue) => (
              <ListItem
                key={ venue.title }
                primaryText={ venue.title }
                onTouchTap={ this.go(venue._id, { venue, title: 'Edit Venue' }) }
                secondaryText={ venue.formattedAddress }
              />
            ))
          }
        </List>
      </div>
    )
  }
}

const styles = {
  container: {
    width: '100%',
  },
  searchBox: {
    margin: 10,
    padding: 10,
  },
  newVenueButton: {
    width: '100%',
  },
  geosuggest: {
    input: {
      width: '100%',
      height: 50,
      borderBottomWidth: 2,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      fontFamily: 'Roboto',
      fontSize: 16,
    },
  },
}

export default withRouter(observer(ListVenues))
