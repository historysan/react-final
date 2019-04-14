import React from 'react'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { ADD_POST, GET_ALL_POST, GET_USER_POST } from '../../queries'
import withAuth from '../withAuth'
import Error from '../Error'

const initialState = {
  title: '',
  description: '',
  author: ''
};

class AddPost extends React.Component {
  state = { ...initialState };

  componentDidMount() {
    this.setState({
      author: this.props.session.getCurrentUser.firstName
    })
  }

  clearState = () => {
    this.setState({ ...initialState })
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event, addPost) => {
    event.preventDefault()
    addPost().then(({ data }) => {
      this.clearState()
      this.props.history.push('/')
    })
  }

  validateForm = () => {
    const { title, description } = this.state
    const isInvalid = !title || !description
    return isInvalid
  }

  updateCache = (cache, { data: { addPost } }) => {
    const { getAllPost } = cache.readQuery({ query: GET_ALL_POST })
    cache.writeQuery({
      query: GET_ALL_POST,
      data: {
        getAllPost: [addPost, ...getAllPost]
      }
    })
  }

  render() {
    const { title, description, author } = this.state

    return (
      <Mutation
        mutation={ADD_POST}
        variables={{ title, description, author }}
        refetchQueries={() => [
          { query: GET_USER_POST, variables: { author } }
        ]}
        update={this.updateCache}
      >
        {(addPost, { data, loading, error }) => {

          return (
            <div className="App">
              <h2 className="App">Add Post</h2>
              <form className="form" onSubmit={event => this.handleSubmit(event, addPost)}>
                <label htmlFor="title">Post Title</label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  placeholder="Post Title"
                  onChange={this.handleChange} 
                />
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={description}
                  placeholder="Description"
                  onChange={this.handleChange}
                />
                <button disabled={loading || this.validateForm()} type="submit" className="button-primary">Add Post</button>
                {error && <Error error={error} />}
              </form>
            </div>
          )
        }}
      </Mutation>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddPost))