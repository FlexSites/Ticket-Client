import React from 'react'
import TextField from 'material-ui/TextField'

import Workflow from '../index'

export default (props) => {
  return (
    <Workflow id="create-venue" { ...props }>
      <div>
        <h1>Page 2</h1>
        <TextField name='title' />
        <TextField name='description' />
      </div>
      <div>
        <h1>Page 3</h1>
        <TextField name='street1' />
        <TextField name='locality' />
      </div>
    </Workflow>
  )
}
