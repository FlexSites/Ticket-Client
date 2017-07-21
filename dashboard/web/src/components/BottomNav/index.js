import React from 'react'
import PropTypes from 'prop-types'
import BuildIcon from 'material-ui/svg-icons/action/build'
import AssessmentIcon from 'material-ui/svg-icons/action/assessment'
import DashboardIcon from 'material-ui/svg-icons/action/dashboard'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import { withRouter } from 'react-router-dom'

const dashboardIcon = <DashboardIcon />
const analyticsIcon = <AssessmentIcon />
const managementIcon = <BuildIcon />

class TabNavigation extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedIndex: 0,
      lastPath: props.location.pathname,
    }

    this.routes = [
      '/',
      '/analytics',
      '/management',
    ]
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.location.pathname === this.props.location.pathname) {
      return false
    }
    return true
  }

  go (to) {
    return this.props.history.push(to)
  }

  get currentIndex () {
    const url = this.props.location.pathname
    return this.routes.indexOf(url)
  }

  render () {
    return (
      <BottomNavigation selectedIndex={ this.currentIndex }>
        <BottomNavigationItem
          label='Dashboard'
          icon={ dashboardIcon }
          onTouchTap={ () => this.go('/') } />
        <BottomNavigationItem
          label='Analytics'
          icon={ analyticsIcon }
          onTouchTap={ () => this.go('/analytics') } />
        <BottomNavigationItem
          label='Management'
          icon={ managementIcon }
          onTouchTap={ () => this.go('/management') } />
      </BottomNavigation>
    )
  }
}

TabNavigation.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
}

export default withRouter(TabNavigation)
