import React from 'react'
import PropTypes from 'prop-types'
import LinearProgress from 'material-ui/LinearProgress'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

export default class Workflow extends React.Component {
  getChildContext () {
    if (!this.context.workflow) {
      return { workflow: this }
    }
  }

  log (...args) {
    console.log(this.props.id || 'workflow thing', ...args)
  }

  constructor (props) {
    super(props)

    this.state = {
      current: 0,
      complete: false,
      data: {},
    }

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
  }

  get total () {
    return this.props.children.length || 0
  }

  next () {
    this.log('next')
    const current = this.state.current + 1
    if (current > this.total) {
      if (this.context.workflow) {
        this.log('next', 'parent')
        return this.context.workflow.next()
      }

      this.log('next', 'onSubmit')
      return this.onSubmit()
    }

    this.log('next', 'setState', current)
    return this.setState({ current })
  }

  previous () {
    this.setState({
      current: this.state.current - 1,
    })
  }

  get current () {
    return this.props.children[ this.state.current ]
  }

  get isChildWorkflow () {
    this.log('isChildWorkflow', this.current.props.id, this.current.type, this.current.type === Workflow)
    return this.current.type === Workflow
  }

  onSubmit () {
    let data = this.state.data || {}
    if (this.props.onSubmit) {
      this.log('onSubmit')
      this.props.onSubmit(data)
    } else if (this.context.workflow) {
      if (this.props.alias) {
        data = { [this.props.alias]: data }
      }

      this.log('super.next()')
      return this.context.workflow.next(data)
    }
  }

  render () {
    const current = this.current
    const isWorkflow = this.isChildWorkflow

    this.log(current, isWorkflow)
    if (this.state.complete) {
      return (
        <div>Complete</div>
      )
    }
    return (
      <div style={{ backgroundColor: '#0f0', display: 'flex', flex: 1, flexDirection: 'column', maxWidth: '500px', minHeight: '500px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>{ this.props.id } | { current.props.title || `Step ${ this.state.current + 1 } of ${ this.total }` }</div>
        { !isWorkflow &&
          <LinearProgress
            mode='determinate'
            value={ this.state.current }
            min={ 0 }
            max={ this.total }
          />
        }
        { current }

        { !isWorkflow &&
          <div>
            <FlatButton primary onTouchTap={ this.previous }>Cancel</FlatButton>
            <RaisedButton primary onTouchTap={ this.next }>Continue</RaisedButton>
          </div>
        }
      </div>
    )
  }
}
Workflow.childContextTypes = {
  workflow: PropTypes.object,
}
Workflow.contextTypes = {
  workflow: PropTypes.object,
}
