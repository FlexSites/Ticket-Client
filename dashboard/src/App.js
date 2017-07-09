import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { Provider } from 'mobx-react'
import uuid from 'uuid'

import venueStore from './stores/VenueStore'
import eventStore from './stores/EventStore'
import Home from './web/Home'
import Header from './web/common/Header'

import ListVenues from './web/Venue/list'
import ListEvents from './web/Event/list'

import EditVenue from './web/Venue'
import EditEvent from './web/Event'
import AddShowtimes from './web/Showtime'
import auth from './web/common/withAuthentication'

import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'

import Auth from './services/Auth'
import './App.css'

export const authService = new Auth()
const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    authService.handleAuthentication()
  }
}

class App extends Component {
  render () {
    return (
      <Router>
        <Provider eventStore={ eventStore } venueStore={ venueStore }>
          <div style={ { display: 'flex', flexDirection: 'column', flex: 1 } }>
            <Header />
            <Route exact path='/' component={ auth(Home) } />

            <Route exact path='/venues' component={ auth(ListVenues) } />
            <Route path='/venues/create' component={ auth(EditVenue) } />
            <Route path='/venues/:venue' component={ auth(EditVenue) } />

            <Route exact path='/events' component={ auth(ListEvents) } />
            <Route exact path='/events/create' render={ () => <Redirect to={ `/events/${ uuid.v4() }` } /> } />
            <Route exact path='/events/:id' component={ auth(EditEvent) } />
            <Route path='/events/:id/showtimes' component={ auth(AddShowtimes) } />

            <Route path='/callback' render={ (props) => {
              handleAuthentication(props)
              return <Redirect to='/' />
            } } />
          </div>
        </Provider>
      </Router>
    )
  }
}

export default App
