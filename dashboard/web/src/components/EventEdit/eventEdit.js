import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { compose, withProps, lifecycle } from 'recompose'

const addProps = withProps(
  (props) => {
    const { history } = props
    function go (to, state) {
      const clone = Object.assign({}, state)
      return () => history.push(to, clone)
    }
    return { go }
  }
)

const setLifecycle = lifecycle({
  async componentDidMount () {
    const event = await this.props.eventStore.get(this.props.match.params.id)
    console.log('load event', event)
    this.setState({ event })
  },
})

export default compose(inject('eventStore'), withRouter, observer, setLifecycle, addProps)

