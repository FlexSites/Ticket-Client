import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { withProps, compose } from 'recompose'

const mapProps = withProps(({ eventStore, history }) => {
  function go (to, state) {
    const clone = Object.assign({}, state)
    return history.push(to, clone)
  }
  return {
    events: eventStore.events,
    onCreate: () => go('/events/create', { title: 'New event' }),
    onSelect: (event) => go(`/events/${ event.id }`, { event, title: 'Edit Event' }),
  }
})

export default compose(inject('eventStore'), withRouter, observer, mapProps)
