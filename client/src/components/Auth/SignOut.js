import React from 'react'
import { withRouter } from 'react-router-dom'
import { ApolloConsumer } from 'react-apollo'

const handleSignOut = (client, history) => {
  localStorage.setItem('token', '')
  client.resetStore()
  history.push('/')
}

const SignOut = ({ history }) => (
  <ApolloConsumer>
    {client => {
      return (
        <button onClick={() => handleSignOut(client, history)}>Sign Out</button>
      )
    }}
  </ApolloConsumer>
)

export default withRouter(SignOut)