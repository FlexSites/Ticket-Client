import React from 'react'
import PropTypes from 'prop-types'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { SpeedDial, SpeedDialItem } from 'react-mui-speeddial'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import NewShowtimeIcon from 'material-ui/svg-icons/action/event'
import NewVenueIcon from 'material-ui/svg-icons/maps/place'
import NewEventIcon from 'material-ui/svg-icons/action/event-seat'
import NewRefundIcon from 'material-ui/svg-icons/editor/money-off'
import { withRouter } from 'react-router-dom'

class FloatingMenu extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false,
    }

    this.toggle = this.toggle.bind(this)
    this.go = this.go.bind(this)
  }

  toggle () {
    console.log('this', this.state.open)
    this.setState({
      open: !this.state.open,
    })
  }

  go (to, state) {
    return () => this.props.history.push(to, state)
  }
  render () {
    return (
      <SpeedDial
        style={ styles.container }
        fabContentOpen={
          <ContentAdd />
        }
        fabContentClose={
          <NavigationClose />
        }
      >

        <SpeedDialItem
          label='Refund'
          fabContent={ <NewRefundIcon /> }
          onTouchTap={ this.go('/refunds/create', { title: 'New refund' }) }
        />

        <SpeedDialItem
          label='Showtime'
          fabContent={ <NewShowtimeIcon /> }
          onTouchTap={ this.go('/showtimes/create', { title: 'New showtime' }) }
        />

        <SpeedDialItem
          label='Venue'
          fabContent={ <NewVenueIcon /> }
          onTouchTap={ this.go('/venues/create', { title: 'New venue' }) }
        />

        <SpeedDialItem
          label='Event'
          fabContent={ <NewEventIcon /> }
          onTouchTap={ this.go('/events/create', { title: 'New event' }) }
        />

      </SpeedDial>
    )
  }

  // render () {
  //   const buttons = this.state.open ? this.props.buttons : []

  //   return (

  //     <div style={ styles.container }>
  //       {
  //         buttons.map(({ icon, text, color }) => {
  //           console.log('icon', text)
  //           return (
  //             <div key={ text } style={ styles.buttonWrapper }>
  //               <span style={ styles.buttonText }>{ text }</span>
  //               <FloatingActionButton mini style={ styles.main }>{ icon }</FloatingActionButton>
  //             </div>
  //           )
  //         })
  //       }
  //       <FloatingActionButton style={ styles.main } onTouchTap={ this.toggle }>
  //         <ContentAdd />
  //       </FloatingActionButton>
  //     </div>
  //   )
  // }
}

export default withRouter(FloatingMenu)

const styles = {
  container: {
    position: 'fixed',
    bottom: 28,
    right: 28,
  },
  main: {

  },
}

FloatingMenu.propTypes = {
  buttons: PropTypes.array,
}

FloatingMenu.defaultMenu = {
  buttons: [],
}
