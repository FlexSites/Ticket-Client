import React from 'react'
import Paper from 'material-ui/Paper'
import ResourceList from '../List'
import { withRouter } from 'react-router-dom'
import * as Venue from '../../../services/Venue'

class ListVenues extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      venues: [],
    }
  }

  go (id) {
    console.log('GO called', id)
    return this.props.history.push(`/management/venues/${ id }`)
  }

  componentWillMount () {
    Venue.list()
      .then(venues => this.setState({ venues }))
  }
  render () {
    return (
      <Paper zDepth={ 1 }>
        <ResourceList
          data={ this.state.venues }
          columns={ [ 'title', 'address.address1', 'address.locality', 'address.region' ] }
          onTouchTap={ ({ _id }) => this.go(_id) }
          className='content'
        />
      </Paper>
    )
  }
}

export default withRouter(ListVenues)
