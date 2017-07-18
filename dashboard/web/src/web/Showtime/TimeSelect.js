import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import TimeIcon from 'material-ui/svg-icons/device/access-time'
import DateIcon from 'material-ui/svg-icons/action/event'
import Chip from 'material-ui/Chip'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import moment from 'moment'

class TimeSelect extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showtimes: this.props.showtimes,
      selected: this.props.showtimes[0],
    }

    this.toggle = this.toggle.bind(this)
  }

  get dates () {
    return this.state.showtimes.reduce((prev, curr) => {
      const datetime = moment(curr)
      const date = datetime.format('YYYY-MM-DD')
      if (!prev[date]) {
        prev[date] = []
      }
      prev[date].push(datetime.toISOString())
      return prev
    }, {})
  }

  get times () {
    return this.state.showtimes
      .filter((showtime) => {
        return moment(this.state.selected).format('YYYY-MM-DD') === moment(showtime).format('YYYY-MM-DD')
      })
      .map((showtime) => {
        return moment(showtime).format('H:mma')
      })
  }

  toggle (time) {
    const date = moment(this.state.selected).format('YYYY-MM-DD')
    const selected = moment(`${ date }T${ time }`, 'YYYY-MM-DDTH:mma')

    console.log('seleced', `${ date }T${ time }`, selected.toISOString())

    const idx = this.state.showtimes.findIndex((date) => {
      return date.toISOString() === selected.toISOString()
    })
    const showtimes = [].concat(this.state.showtimes)
    if (idx >= 0) {
      showtimes.splice(idx, 1)
    } else {
      showtimes.push(selected)
    }
    console.log(showtimes.length)
    this.setState({ showtimes })
  }

  render () {
    return (
      <div style={ { zIndex: 1, backgroundColor: '#fff', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, flex: 1 } }>
        <RaisedButton style={ { order: -1 } } secondary fullWidth label='Select dates' icon={ <DateIcon /> } onTouchTap={ this.props.close } />
        <div style={ { display: 'flex', flexDirection: 'row' } }>
          <div style={ { flex: 1, width: '50%', height: '100%', overflowY: 'scroll' } }>
            <Menu>
              {
                 Object.keys(this.dates)
                  .map((date) => (
                    <MenuItem
                      key={ date }
                      primaryText={ moment(date).format('ddd D, MMM') }
                      style={ moment(this.state.selected).format('YYYY-MM-DD') === date ? { backgroundColor: '#0f0' } : null }
                      onTouchTap={ () => this.setState({ selected: date }) }
                    />
                  ))
              }
            </Menu>
            { /* <RadioButtonGroup name='shipSpeed' defaultSelected='not_light'>
              {
                Object
                  .keys(this.dates)
                  .map((date) => {
                    return <div key={ date }>
                      <RadioButton
                        value={ date }
                        label={ date }
                      />
                      <Chip>
                        Deletable Text Chip
                      </Chip>
                    </div>
                  })
              }
            </RadioButtonGroup> */ }
          </div>
          <div style={ { flex: 1, width: '50%', height: '100%', overflowY: 'scroll' } }>
            <Menu>
              {
                ['6:00pm', '6:30pm', '7:00pm', '7:30pm', '8:00pm', '8:30pm', '9:00pm', '9:30pm', '10:00pm', '10:30pm'].map((time) => {
                  console.log('render', this.times.includes(time), this.times, time)
                  return (
                    <MenuItem
                      primaryText={ time }
                      style={ this.times.includes(time) ? { backgroundColor: '#0f0' } : null }
                      onTouchTap={ () => this.toggle(time) }
                    />
                  )
                })
              }
            </Menu>
          </div>
        </div>
      </div>
    )
  }
}

TimeSelect.propTypes = {

}

export default TimeSelect
