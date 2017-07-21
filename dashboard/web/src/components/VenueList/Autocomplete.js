import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import * as Address from '@nerdsauce/dashboard-stores/services/address'
import { inject } from 'mobx-react'
import { Venue } from '@nerdsauce/dashboard-stores/stores/VenueStore'

class Autocomplete extends React.Component {
  constructor (props) {
    super(props)

    this.autocomplete = this.autocomplete.bind(this)
  }

  autocomplete (input) {
    if (!input.length) {
      return this.props.onSuggest(null, input)
    }

    return Address
      .autocomplete(input)
      .then((suggestions = []) => suggestions.map((suggestion) => new Venue(this.props.venueStore, suggestion)))
      .then(suggestions => {
        console.log('cast?', suggestions[0] instanceof Venue)
        return suggestions
      })
      .then((suggestions) => this.props.onSuggest(suggestions, input))
      .catch(console.error.bind(console))
  }
  render () {
    return (
      <TextField
        name='search'
        fullWidth
        placeholder='Search...'
        onChange={ (e, value) => this.autocomplete(value) }
      />
    )
  }
}

Autocomplete.propTypes = {
  onSuggest: PropTypes.func.isRequired,
  venueStore: PropTypes.object,
}

export default inject('venueStore')(Autocomplete)
