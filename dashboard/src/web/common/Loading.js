import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CircularProgress from 'material-ui/CircularProgress'

class Loading extends Component {
  render () {
    return (
      <div style={ styles.container }>
        <CircularProgress style={ styles.icon } size={ 80 } />
        <span style={ styles.text }>{ this.props.message }</span>
      </div>
    )
  }
}

Loading.propTypes = {
  message: PropTypes.string,
}

Loading.defaultProps = {
  message: 'Loading...',
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  icon: {
    margin: 20,
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 12,
  },
}

export default Loading
