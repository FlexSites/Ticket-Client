import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import NavigationBackIcon from 'material-ui/svg-icons/navigation/arrow-back'
import MoreIcon from 'material-ui/svg-icons/navigation/more-vert'
import get from 'lodash.get'

import Auth from '../../services/Auth'

export const auth = new Auth()

class Header extends React.Component {
  constructor (props) {
    super(props)

    this.back = this.back.bind(this)
  }
  back () {
    return this.props.history.go(-1)
  }
  render () {
    const isAuthenticated = auth.isAuthenticated()

    return (
      <AppBar
        title={ get(this, 'props.location.state.title', 'Dashboard') }
        className='header'
        iconElementLeft={
          <IconButton>
            <NavigationBackIcon />
          </IconButton>
        }
        onTitleTouchTap={ this.back }
        onLeftIconButtonTouchTap={ this.back }
        iconElementRight={
          <IconButton>
            <MoreIcon />
          </IconButton>
        }
      />
    )
  }
}

export default withRouter(Header)

Header.propTypes = {
  history: PropTypes.object,
}
