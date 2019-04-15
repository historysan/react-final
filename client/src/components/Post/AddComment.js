import React from 'react'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { ADD_COMMENT, GET_POST_COMMENT } from '../../queries'

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

  handleSubmit = (event, addComment) => {
    event.preventDefault()
    addComment().then(({ data }) => {
      this.clearState()
    })
  }

  updateCache = (cache, { data: { addComment } }) => {
    const { getPostComment } = cache.readQuery({ query: GET_POST_COMMENT })
    cache.writeQuery({
      query: GET_POST_COMMENT,
      data: {
        getPostComment: [addComment, ...getPostComment]
      }
    })
  }

  render() {
    const { text } = this.state
    const postId = this.props.postId

    return (
      <Mutation
        mutation={ADD_COMMENT}
        variables={{ postId, text }}
        refetchQueries={() => [
          { query: GET_POST_COMMENT, variables: { postId } }
        ]}
        update={this.updateCache}
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