import React from 'react'
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
import { GET_POST } from '../../queries'
import AddComment from '../Post/AddComment'

const PostPage = ({ match }) => {
  const { _id } = match.params
  return (
    <Query query={GET_POST} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) {
          return <div>Loading...</div>
        }
        if (error) {
          return <div>Error</div>
        }
        return (
          <div className="App">
            <h2>{data.getPost.title}</h2>
            <p>Description: {data.getPost.description}</p>
            <p>Created by: {data.getPost.author}</p>
            <h3>Comments</h3>
            <AddComment />
            {/* <p>{data.getPost.author}: </p> */}
          </div>
        )
      }}
    </Query>
  )
}

export default withRouter(PostPage)
