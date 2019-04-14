import React from 'react'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { ADD_COMMENT } from '../../queries'

const initialState = {
  text: ''
};

class AddComment extends React.Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState })
  }

  handleChange = event => {
    this.setState({
      text: event.target.value
    })
  }

  handleSubmit = (event, addPost) => {
    event.preventDefault()
    addPost().then(({ data }) => {
      this.clearState()
    })
  }

  render() {
    const { text } = this.state

    return (
      <Mutation
        mutation={ADD_COMMENT}
        variables={{ text }}
      >
        {(AddComment, { data, loading, error }) => {

          return (
            <div className="App">
              <form className="form" onSubmit={event => this.handleSubmit(event, AddComment)}>
                <input
                  name="comment"
                  value={text}
                  placeholder="Comment"
                  onChange={this.handleChange}
                />
                <button type="submit" className="button-primary">Add Comment</button>
              </form>
            </div>
          )
        }}
      </Mutation>
    )
  }
}

export default withRouter(AddComment)