import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import {List, ListItem} from 'material-ui/List'
import ActionInfo from 'material-ui/svg-icons/action/info'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'

import Dashboard from './web/Dashboard'
import Analytics from './web/Analytics'
import Management from './web/Management'
import TabNavigation from './web/BottomNav'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Auth from './services/Auth'
import './App.css'

export const auth = new Auth()
const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {
  render () {
    const isAuthenticated = auth.isAuthenticated()
    return (
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <AppBar
            title='Dashboard'
            className='header'
            iconElementRight={
              <FlatButton
                onTouchTap={ () => auth.isAuthenticated() ? auth.logout() : auth.login() }
                label={ isAuthenticated ? 'Sign out' : 'Sign in' }
              />
            }
          />

          <Route exact path='/' component={ Dashboard } />
          <Route path='/management' component={ Management } />
          <Route path='/analytics' component={ Analytics } />
          <Route path='/callback' render={ (props) => {
            handleAuthentication(props)
            return <CircularProgress size={ 80 } thickness={ 5 } />
          } } />

          <Paper zDepth={ 1 } className='footer' style={{ zIndex: 2 }}>
            <TabNavigation />
          </Paper>
        </div>
      </Router>
    )
  }
}

export default App
