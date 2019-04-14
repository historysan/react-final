import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './index.css'
import App from './components/App'
import Navbar from './components/Navbar'
import Search from './components/Post/Search';
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'
import AddPost from './components/Post/AddPost'
import PostPage from './components/Post/PostPage';
import Profile from './components/Profile/Profile'
import withSession from './components/withSession'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },
  onError: ({ networkError }) => {
    if (networkError) {
      if (networkError) {
        localStorage.setItem("token", "");
      }
    }
  }
})

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Navbar session={session} />
      <Switch>
      <Route path="/" exact component={App} />
        <Route path="/search" component={Search} />
        <Route path="/sign-in" render={() => <SignIn refetch={refetch} />} />
        <Route path="/sign-up" render={() => <SignUp refetch={refetch} />} />
        <Route path="/post/add" render={() => <AddPost session={session} />} />
        <Route path="/post/:_id" component={PostPage} />
        <Route path="/profile" render={() => <Profile session={session} />} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
)

const RootWithSession = withSession(Root)

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root')
)
