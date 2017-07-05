import React from 'react'
import {List, ListItem} from 'material-ui/List'
import ActionInfo from 'material-ui/svg-icons/action/info'
import Paper from 'material-ui/Paper'
import { Route, NavLink } from 'react-router-dom'
import ListVenues from './Venue/list'

import EditVenue from './Venue'
import Event from './Event'

export default ({ match }) => {
  return (
    <div className="body">
      <Route exact path={`${ match.url }/venues`} component={ ListVenues } />
      <Route path={`${ match.url }/venues/create`} component={ EditVenue }/>
      <Route path={`${ match.url }/venues/:venue`} component={ EditVenue }/>
      <Route exact path={`${ match.url }/events`} component={ Event } />
      <Paper zDepth={ 2 } className='nav'>
        <List style={{ width: '300px' }}>
          <NavLink to='/management/events'><ListItem primaryText='Events' rightIcon={<ActionInfo />} /></NavLink>
          <NavLink to='/management/orders'><ListItem primaryText='Orders' rightIcon={<ActionInfo />} /></NavLink>
          <NavLink to='/management/venues'><ListItem primaryText='Venues' rightIcon={<ActionInfo />} /></NavLink>
        </List>
      </Paper>
    </div>
  )
}
