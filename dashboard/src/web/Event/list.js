import React from 'react'
import Paper from 'material-ui/Paper'
import { withRouter } from 'react-router-dom'
import Geosuggest from 'react-geosuggest'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { observer } from 'mobx-react'
import get from 'lodash.get'

import ResourceList from '../List'
import * as Event from '../../services/Event'
import './geosuggest.css'
import * as Address from '../../services/address'

class ListEvents extends React.Component {
  constructor (props) {
    super(props)

    this.store = props.events

    this.state = {
      suggestions: [],
      searching: false,
    }

    this.autocomplete = this.autocomplete.bind(this)
  }

  go (id, state) {
    const clone = Object.assign({}, state)
    return () => this.props.history.push(`/events/${ id }`, clone)
  }

  render () {
    const events = this.state.searching ? this.state.suggestions : this.store.events

    console.log(events[0])
    return (
      <div style={ styles.container }>
        <RaisedButton secondary style={ styles.newEventButton }>New Event</RaisedButton>

        <List>
          <Subheader>Events</Subheader>
          {
            events.map((event) => (
              <ListItem
                key={ event.title }
                primaryText={ event.title }
                onTouchTap={ this.go(event._id, { event, title: 'Edit Event' }) }
                secondaryText={ 'Dec 12' }
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
  newEventButton: {
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

export default withRouter(observer(ListEvents))
