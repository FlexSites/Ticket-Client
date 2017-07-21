import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import Workflow from '../index'
import CreateVenue from '../CreateVenue'

export default class CreateEvent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      venue: null,
    }
  }
  render () {
    return (
      <div style={ { backgroundColor: '#f00', display: 'flex', alignItems: 'center', justifyContent: 'center' } }>
        <Workflow id='create-event' { ...this.props } onSubmit={ (value) => console.log('submitted', value) }>
          <Workflow id='find-venue' alias='venue'>
            <div title='Find Venue'>
              <h1>Page 1</h1>
            </div>
            <CreateVenue alias='venue' />
          </Workflow>
          <div title='Details'>
            <h1>Page 4</h1>
          </div>
          <div title='Complete!'>
            <h1>Saved successfully</h1>

            <RaisedButton secondary>Another?</RaisedButton>
          </div>
        </Workflow>
      </div>
    )
  }
}
