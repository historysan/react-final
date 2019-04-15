import React from 'react'
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
import { GET_POST, GET_POST_COMMENT } from '../../queries'
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
            <AddComment postId={data.getPost._id} />
            <Query query={GET_POST_COMMENT} variables={{ postId: data.getPost._id }}>
              {({ data: commentData, loading: commentLoading, error: commentError }) => {
                if (commentLoading) {
                  return <div>Loading...</div>
                }
                if (commentError) {
                  return <div>Error</div>
                }
                return (
                  <div>
                    {commentData.getPostComment.map(item => (
                      <p key={item._id}>Comment: {item.text}</p>
                    ))}
                  </div>
                )
              }}
            </Query>
          </div>
        )
      }}
    </Query>
  )
}

export default withRouter(PostPage)
