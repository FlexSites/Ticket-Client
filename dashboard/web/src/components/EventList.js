import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import enhance from '@nerdsauce/dashboard-stores/components/EventList'

import MainMenu from '../MainMenu'

export default enhance(EventList)

export function EventList ({ events, onSelect, onCreate }) {
  return (
    <div style={ styles.container }>
      <RaisedButton secondary style={ styles.newEventButton } onTouchTap={ () => onCreate() }>New Event</RaisedButton>

      <List>
        {
          events.map((event) => (
            <ListItem
              key={ event.id }
              primaryText={ event.title }
              onTouchTap={ () => onSelect(event) }
              secondaryText={ 'Dec 12' }
            />
          ))
        }
      </List>
      <MainMenu />
    </div>
  )
}

EventList.propTypes = {
  events: PropTypes.array,
  onSelect: PropTypes.func,
  onCreate: PropTypes.func,
}

EventList.defaultProps = {
  events: [],
  onSelect: () => {},
  onCreate: () => {},
}

const styles = {
  container: {
    width: '100%',
  },
  newEventButton: {
    width: '100%',
  },
}
