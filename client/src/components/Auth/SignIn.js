import React from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries/index'
import Error from '../Error'

const initialState = {
  email: '',
  password: '',
}

class SignIn extends React.Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState })
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event, signinUser) => {
    event.preventDefault()
    signinUser().then(async ({ data }) => {
      localStorage.setItem('token', data.signinUser.token)
      await this.props.refetch()
      this.clearState()
      this.props.history.push('/')
    })
  }

  validateForm = () => {
    const { email, password } = this.state
    const isInvalid = !email || !password
    return isInvalid
  }

  render() {
    const { email, password } = this.state
    return (
      <div className="App">
        <h2 className="App">Sign In</h2>
        <Mutation mutation={SIGNIN_USER} variables={{ email, password }}>
          {( signinUser, { data, loading, error }) => {
            return (
              <form className="form" onSubmit={event => this.handleSubmit(event, signinUser)}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange}
                />
                <button type="submit" disabled={loading || this.validateForm()} className="button-primary">Sign In</button>
                {error && <Error error={error} />}
              </form>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default withRouter(SignIn)