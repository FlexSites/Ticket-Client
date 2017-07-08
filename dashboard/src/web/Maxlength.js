import React from 'react'
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'

export default class MaxLength extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      floatText: this.props.floatingLabelText,
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange (e, value) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e, value)
    }
    const remainingValue = this.props.maxLength - value.length
    if (remainingValue < 1) {
      setTimeout(() => this.props.onMaxReached(), 0)
    }
    let remainingText = value.length && remainingValue > 0 ? `(${ remainingValue } remaining)` : ''
    let floatText = remainingText
    if (this.props.floatingLabelText) {
      floatText = this.props.floatingLabelText
    }
    if (remainingText) {
      floatText += ` ${ remainingText }`
    }

    this.setState({ floatText })
  }
  render () {
    const props = Object.assign({}, this.props)
    delete props.onMaxReached
    delete props.maxLength
    return (
      <TextField
        { ...props }
        floatingLabelText={ this.state.floatText }
        onChange={ this.onChange }
      />
    )
  }
}

MaxLength.propTypes = {
  onChange: PropTypes.func,
  floatingLabelText: PropTypes.string,
  maxLength: PropTypes.number,
  onMaxReached: PropTypes.func,
}

MaxLength.defaultProps = {
  maxLength: 160,
  onMaxReached: () => {},
}
