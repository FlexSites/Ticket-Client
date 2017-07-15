import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

function VenueList ({ venues, onSelect }) {
  return (
    <List>
      <Subheader>Venues</Subheader>
      {
        venues.map((venue) => (
          <ListItem
            key={ venue.title }
            primaryText={ venue.title }
            onTouchTap={ () => onSelect(venue) }
            secondaryText={ venue.formattedAddress }
          />
        ))
      }
    </List>
  )
}

VenueList.propTypes = {
  onSelect: PropTypes.func.isRequired,
  venues: PropTypes.object,
}

VenueList.defaultProps = {
  venues: null,
}

export default observer(VenueList)
