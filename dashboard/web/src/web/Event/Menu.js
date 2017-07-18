import React from 'react'
import PropTypes from 'prop-types'
import { SpeedDial, SpeedDialItem } from 'react-mui-speeddial'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import TimeIcon from 'material-ui/svg-icons/device/access-time'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import SaveIcon from 'material-ui/svg-icons/content/save'
import { withRouter } from 'react-router-dom'

class FloatingMenu extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false,
      showtimeDialog: false,
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

  showtimeDialogToggle () {
    this.setState({
      showtimeDialog: !this.state.showtimeDialog,
    })
  }

  go (to, state) {
    return () => this.props.history.push(to, state)
  }

  render () {
    return (
      <div>
        <SpeedDial
          style={ styles.container }
          fabContentOpen={
            <MenuIcon />
          }
          fabContentClose={
            <NavigationClose />
          }
        >
          <SpeedDialItem
            label='Save'
            fabContent={ <SaveIcon /> }
            onTouchTap={ () => this.props.event.save() }
          />

          <SpeedDialItem
            label='New showtime'
            fabContent={ <TimeIcon /> }
            onTouchTap={ this.go(`/events/${ this.props.event.id }/showtimes`, { title: 'Add showtimes' }) }
          />

        </SpeedDial>
      </div>
    )
  }
}

FloatingMenu.propTypes = {
  event: PropTypes.object,
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
