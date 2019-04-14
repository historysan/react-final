import React from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries/index'
import Error from '../Error'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: ''
}

class SignUp extends React.Component {
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

  handleSubmit = (event, signupUser) => {
    event.preventDefault()
    signupUser().then(async ({ data }) => {
      localStorage.setItem('token', data.signupUser.token)
      await this.props.refetch()
      this.clearState()
      this.props.history.push('/')
    })
  }

  validateForm = () => {
    const { firstName, lastName, email, password, passwordConfirm } = this.state
    const isInvalid = !firstName || !lastName || !email || !password || password !== passwordConfirm
    return isInvalid
  }

  render() {
    const { firstName, lastName, email, password, passwordConfirm } = this.state
    return (
      <div className="App">
        <h2 className="App">Sign Up</h2>
        <Mutation mutation={SIGNUP_USER} variables={{ firstName, lastName, email, password }}>
          {( signupUser, { data, loading, error }) => {
            return (
              <form className="form" onSubmit={event => this.handleSubmit(event, signupUser)}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={this.handleChange}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={this.handleChange}
                />
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
                <input
                  type="password"
                  name="passwordConfirm"
                  placeholder="Confirm Password"
                  value={passwordConfirm}
                  onChange={this.handleChange}
                />
                <button type="submit" disabled={loading || this.validateForm()} className="button-primary">Sign Up</button>
                {error && <Error error={error} />}
              </form>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default withRouter(SignUp)