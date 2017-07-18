import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'

import enhance from './eventList'
import MainMenu from '../../MainMenu'

export default enhance(EventList)

export function EventList ({ events, onSelect, onCreate }) {
  console.log('EVENT RENDER', events)
  return (
    <div style={ styles.container }>
      <RaisedButton secondary style={ styles.newEventButton } onTouchTap={ onCreate }>New Event</RaisedButton>

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
