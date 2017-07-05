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
    let remainingText = value.length ? `(${ this.props.maxlength - value.length } remaining)` : ''
    let floatText = remainingText
    if (this.props.floatingLabelText) {
      floatText = this.props.floatingLabelText
    }
    if (remainingText) {
      floatText += ` ${ remainingText }`
    }
    console.log('change', floatText)
    this.setState({ floatText })
  }
  render () {
    return (
      <TextField
        { ...this.props }
        floatingLabelText={ this.state.floatText }
        onChange={ this.onChange }
      />
    )
  }
}

MaxLength.propTypes = {
  onChange: PropTypes.func,
  floatingLabelText: PropTypes.string,
  maxlength: PropTypes.number,
}

MaxLength.defaultProps = {
  maxlength: 160,
}
