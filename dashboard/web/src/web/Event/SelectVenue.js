import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import VenueList from '../Venue/List'

class componentName extends Component {
  constructor (props) {
    super(props)

    this.onSelect = this.onSelect.bind(this)
  }

  async onSelect (venue) {
    const event = await this.props.eventStore.get(this.props.match.params.id)
    event.venue = venue
    console.log(event)
    this.props.history.go(-1)
  }

  render () {
    return (
      <VenueList venues={ this.props.venueStore.venues } onSelect={ this.onSelect } />
    )
  }
}

componentName.propTypes = {

}

export default withRouter(inject('eventStore', 'venueStore')(observer(componentName)))
