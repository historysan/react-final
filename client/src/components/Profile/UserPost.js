import React from 'react'
import { Link } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
import { GET_USER_POST, DELETE_USER_POST, GET_ALL_POST, GET_CURRENT_USER, UPDATE_USER_POST } from '../../queries'


class UserPost extends React.Component {
  state = {
    _id: '',
    title: '',
    description: '',
    modal: false
  };

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleDelete = deleteUserPost => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post ?')
    if (confirmDelete) {
      deleteUserPost().then(({ data }) => {
      })
    }
  }

  handleSubmit = (event, updateUserPost) => {
    event.preventDefault()
    updateUserPost().then(({ data }) => {
      this.closeModal()
    })
  }

  loadPost = post => {
    this.setState({
      ...post, modal: true
    })
  }

  closeModal = () => {
    this.setState({
      modal: false
    })
  }

  render() {
    const { author } = this.props
    const { modal } = this.state

    return (
      <Query query={GET_USER_POST} variables={{ author }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <div>Loading...</div>
          }
          if (error) {
            return <div>Error</div>
          }
          return (
            <ul>
              {modal && <EditPost
                handleSubmit={this.handleSubmit}
                post={this.state}
                closeModal={this.closeModal}
                handleChange={this.handleChange}
              />}
              <h3>Your Post</h3>
              {!data.getUserPost.length &&
                <p><strong>You don't have any post, go add some!</strong></p>
              }
              {data.getUserPost.map(post => (
                <li key={post._id}>
                  <Link to={`/post/${post._id}`}>
                    <p style={{ marginBottom: '0' }}>{post.title}</p>
                  </Link>
                  <Mutation
                    mutation={DELETE_USER_POST}
                    variables={{ _id: post._id }}
                    refetchQueries={() => [
                      { query: GET_ALL_POST },
                      { query: GET_CURRENT_USER }
                    ]}
                    update={(cache, { data: { deleteUserPost } }) => {
                      const { getUserPost } = cache.readQuery({
                        query: GET_USER_POST,
                        variables: { author }
                      })
                      cache.writeQuery({
                        query: GET_USER_POST,
                        variables: { author },
                        data: {
                          getUserPost: getUserPost.filter(post => post._id !== deleteUserPost._id)
                        }
                      })
                    }}
                  >
                    {(deleteUserPost, attrs = {}) => (
                      <div>
                        <button
                          style={{ marginTop: '15px' }}
                          className="button-primary"
                          onClick={() => this.loadPost(post)}
                        >
                          Edit
                        </button>
                        <p className="delete-button" onClick={() => this.handleDelete(deleteUserPost)}>{attrs.loading ? 'deleting...' : 'X'}</p>
                      </div>
                    )}
                  </Mutation>
                </li>
              ))}
            </ul>
          )
        }}
      </Query>
    )
  }
}

const EditPost = ({ handleSubmit, post, handleChange, closeModal }) => (
  <Mutation mutation={UPDATE_USER_POST} variables={{ 
    _id: post._id,
    title: post.title,
    description: post.description
   }}>
    {updateUserPost => (
      <div className="modal modal-open">
        <div className="modal-inner">
          <div className="modal-content">
            <form onSubmit={event => handleSubmit(event, updateUserPost)} className="modal-content-inner">
              <h4>Edit Post</h4>
              <label htmlFor="title">Post Title</label>
              <input
                type="text"
                name="title"
                value={post.title}
                onChange={handleChange} 
              />
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                value={post.description}
                onChange={handleChange}
              />
              <hr />
              <div className="modal-buttons">
                <button type="submit" className="button-primary">Update</button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
  </Mutation>
)

export default UserPost
