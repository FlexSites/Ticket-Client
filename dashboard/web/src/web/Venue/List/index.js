import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import VenueList from './List'
import Autocomplete from './Autocomplete'

class ListVenues extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      suggestions: null,
    }
  }

  render () {
    const venues = this.state.suggestions || this.props.venues
    return (
      <div style={ styles.container }>
        <Autocomplete onSuggest={ (suggestions) => this.setState({ suggestions }) } />
        <VenueList venues={ venues } onSelect={ this.props.onSelect } />
      </div>
    )
  }
}

ListVenues.propTypes = {
  venues: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
}

ListVenues.defaultProps = {
  venues: [],
  mode: 'select',
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

export default observer(ListVenues)
