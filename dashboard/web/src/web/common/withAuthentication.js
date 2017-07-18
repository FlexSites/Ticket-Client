import React from 'react'

import Auth from '../../services/Auth'

export const auth = new Auth()

export default function withAuthentication (Component) {
  return class WithAuthentication extends React.Component {
    render () {
      if (!auth.isAuthenticated()) {
        auth.login()
        return <div>Redirecting</div>
      }

      return (
        <Component { ...this.props } />
      )
    }
  }
}
