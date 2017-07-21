import React, { Component } from 'react'
import { ListItem } from 'material-ui/List'
import PlaceIcon from 'material-ui/svg-icons/maps/place'
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

import 'react-infinite-calendar/styles.css' // Make sure to import the default stylesheet

import './edit.css'

class VenueSelector extends Component {
  render () {
    return (
      <ListItem
        primaryText={ this.venue.title }
        secondaryText={ this.venue.formattedAddress }
        leftIcon={ <PlaceIcon /> }
        rightIcon={ <RightArrow /> }
        onTouchTap={ this.go(`/events/${ this.event.id }/venue`, { title: 'Select venue' }) }
      />
    )
  }
}

VenueSelector.propTypes = {

}

export default VenueSelector
