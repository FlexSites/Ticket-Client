import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import uuid from 'uuid'

import { EventStore, VenueStore } from '@nerdsauce/dashboard-stores'
import Header from './components/common/Header'

import VenueList from './components/VenueList'
import ViewVenue from './components/Venue'
import EditVenue from './components/Venue/edit'

import EventList from './components/EventList'
import EventEdit from './components/EventEdit'
import SelectVenue from './components/EventEdit/SelectVenue'

import AddShowtimes from './components/Showtime'
import auth from './components/common/withAuthentication'
import Loading from './components/common/Loading'

import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'

import Auth from '@nerdsauce/dashboard-stores/services/Auth'
import './App.css'
// comment
const venueStore = new VenueStore()
const eventStore = new EventStore(venueStore)

export const authService = new Auth()
const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    return authService.handleAuthentication()
  }
  return Promise.reject(new Error('Missing proper query response: "access_token|id_token|error"'))
}

class App extends Component {
  render () {
    return (
      <Router>
        <Provider eventStore={ eventStore } venueStore={ venueStore }>
          <div style={ { display: 'flex', flexDirection: 'column', flex: 1 } }>
            <Header />
            <Route exact path='/' component={ auth(EventList) } />

            <Route exact path='/venues' component={ auth(VenueList) } />
            <Route exact path='/venues/:id' component={ auth(ViewVenue) } />
            <Route exact path='/venues/:id/edit' component={ auth(EditVenue) } />

            <Route exact path='/events' component={ auth(EventList) } />
            <Route exact path='/events/create' render={ () => <Redirect to={ `/events/${ uuid.v4() }` } /> } />
            <Route exact path='/events/:id' component={ auth(EventEdit) } />
            <Route exact path='/events/:id/venue' component={ auth(SelectVenue) } />
            <Route path='/events/:id/showtimes' component={ auth(AddShowtimes) } />

            <Route path='/callback' render={ (props) => {
              handleAuthentication(props)
                .then(() => props.history.replace('/'))
                .catch((ex) => {
                  console.log('ERROR', ex)
                  props.history.replace('/')
                })

              return (
                <Loading message='Redirecting' />
              )
            } } />
          </div>
        </Provider>
      </Router>
    )
  }
}

export default App
