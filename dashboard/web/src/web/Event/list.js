import React from 'react'
import Paper from 'material-ui/Paper'
import { withRouter } from 'react-router-dom'
import Geosuggest from 'react-geosuggest'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { inject, observer } from 'mobx-react'
import get from 'lodash.get'

import ResourceList from '../List'
import * as Event from '../../services/Event'
import * as Address from '../../services/address'
import MainMenu from '../../MainMenu'

class ListEvents extends React.Component {
  constructor (props) {
    super(props)

    this.store = props.eventStore

    this.state = {
      suggestions: [],
      searching: false,
    }
  }

  go (to, state) {
    const clone = Object.assign({}, state)
    return () => this.props.history.push(to, clone)
  }

  render () {
    const events = this.state.searching ? this.state.suggestions : this.store.events
    console.log(events)
    return (
      <div style={ styles.container }>
        <RaisedButton secondary style={ styles.newEventButton } onTouchTap={ this.go('/events/create', { title: 'New event' }) }>New Event</RaisedButton>

        <List>
          {
            events.map((event) => (
              <ListItem
                key={ event.id }
                primaryText={ event.title }
                onTouchTap={ this.go(`/events/${ event.id }`, { event, title: 'Edit Event' }) }
                secondaryText={ 'Dec 12' }
              />
            ))
          }
        </List>
        <MainMenu />
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

export default inject('eventStore')(
  withRouter(
    observer(
      ListEvents
    )
  )
)
