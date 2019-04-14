import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { SEARCH_POST } from '../../queries'
import SearchItem from './SearchItem'

class Search extends React.Component {
  state = {
    searchResult: []
  };

  handleChange = ({ searchPost }) => {
    this.setState({
      searchResult: searchPost
    })
  }

  render() {
    const { searchResult } = this.state

    return (
      <ApolloConsumer>
        {client => (
          <div className="App">
            <input
              type="search"
              placeholder="Search Post"
              onChange={async event => {
                event.persist()
                const { data } = await client.query({
                  query: SEARCH_POST,
                  variables: { searchText: event.target.value }
                })
                this.handleChange(data)
              }}
            />
            <ul>
              {searchResult.map(post => (
                <SearchItem key={post._id} {...post} />
              ))}
            </ul>
          </div>
        )}
      </ApolloConsumer>
    )
  }
}

export default Search