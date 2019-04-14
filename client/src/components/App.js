import React from 'react'
import { Query } from 'react-apollo'
import './App.css'
import { GET_ALL_POST } from '../queries'
import PostItem from './Post/PostItem'

const App = () => (
  <div className="App">
    <h1>Home</h1>
    <Query query={GET_ALL_POST}>
      {({ data, loading, error }) => {
        if (loading) {
          return <div>Loading...</div>
        }
        if (error) {
          return <div>Error</div>
        }
        return (
          <ul>
            {data.getAllPost.map(post => (
              <PostItem key={post._id} {...post} />
            ))}
          </ul>
        )
      }}
    </Query>
  </div>
)

export default App
