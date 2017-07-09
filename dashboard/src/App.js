import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'

import venueStore from './stores/VenueStore'
import eventStore, { Event } from './stores/EventStore'
import Home from './web/Home'
import Header from './web/common/Header'

import ListVenues from './web/Venue/list'
import ListEvents from './web/Event/list'

import EditVenue from './web/Venue'
import EditEvent from './web/Event'

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Auth from './services/Auth'
import './App.css'

export const auth = new Auth()
const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}

class App extends Component {

  render () {
    return (
      <Router>
        <div style={ { display: 'flex', flexDirection: 'column', flex: 1 } }>
          <Header />
          <Route exact path='/' component={ Home } />
          <Route exact path='/venues' render={ () => <ListVenues venues={ venueStore } /> } />
          <Route path='/venues/create' component={ EditVenue } />
          <Route path='/venues/:venue' component={ EditVenue } />

          <Route exact path='/events' render={ () => <ListEvents venues={ venueStore } events={ eventStore } /> } />
          <Route exact path='/events/create' render={ () => <EditEvent event={ new Event(eventStore) } /> } />

          <Route path='/callback' render={ (props) => {
            handleAuthentication(props)
            return <CircularProgress size={ 80 } thickness={ 5 } />
          } } />
          { /*
          <Paper zDepth={ 1 } className='footer' style={{ zIndex: 2 }}>
            <TabNavigation />
          </Paper>
          */ }
        </div>
      </Router>
    )
  }
}

export default App
