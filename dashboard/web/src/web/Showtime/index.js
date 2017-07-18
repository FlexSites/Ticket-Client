import React from 'react'
import { inject, observer } from 'mobx-react'
import RaisedButton from 'material-ui/RaisedButton'
import TimeIcon from 'material-ui/svg-icons/device/access-time'
import DateIcon from 'material-ui/svg-icons/action/event'
import Chip from 'material-ui/Chip'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates,
} from 'react-infinite-calendar'
import 'react-infinite-calendar/styles.css' // Make sure to import the default stylesheet
import TimeSelect from './TimeSelect'

const MultipleDatesCalendar = withMultipleDates(Calendar)

class AddShowtimes extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      date: null,
      time: null,
      width: 0,
      height: 0,
      timeSelect: false,
      dates: [],
      initialDates: [],
    }

    this.toggleTimeSelect = this.toggleTimeSelect.bind(this)
    this.dateSelect = this.dateSelect.bind(this)
  }

  get loading () {
    return !this.state.width || !this.state.height
  }

  async componentDidMount () {
    this.event = await this.props.eventStore.get(this.props.match.params.id)
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions.bind(this))
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this))
  }

  updateWindowDimensions () {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  dateSelect (selected) {
    const idx = this.state.dates.findIndex((date) => {
      return date.toISOString() === selected.toISOString()
    })
    const dates = [].concat(this.state.dates)
    if (idx >= 0) {
      dates.splice(idx, 1)
    } else {
      dates.push(selected)
    }
    this.setState({ dates })
  }

  toggleTimeSelect () {
    this.setState({
      timeSelect: !this.state.timeSelect,
    })
  }

  render () {
    if (this.loading) {
      return <div>Loading...</div>
    }
    const today = new Date()
    const oneYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
    return (
      <div style={ { flex: 1, overflow: 'hidden', position: 'relative' } }>
        <div style={ { flex: 1, overflow: 'hidden' } }>
          <InfiniteCalendar
            displayOptions={ { showHeader: false } }
            width={ this.state.width }
            height={ Math.min(this.state.height, 568) - 64 - 49 - 36 }
            min={ today }
            max={ oneYear }
            minDate={ today }
            Component={ MultipleDatesCalendar }
            interpolateSelection={ defaultMultipleDateInterpolation }
            selected={ this.state.initialDates }
            onSelect={ this.dateSelect }
          />
        </div>
        <RaisedButton style={ { order: -1 } } secondary fullWidth label='Select times' icon={ <TimeIcon /> } onTouchTap={ this.toggleTimeSelect } />
        { this.state.timeSelect && <TimeSelect close={ this.toggleTimeSelect } showtimes={ [ ...this.state.dates, ...this.event.showtimes ] } /> }
      </div>
    )
  }
}

export default inject('eventStore')(observer(AddShowtimes))
