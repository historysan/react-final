import { gql } from 'apollo-boost'

export const GET_ALL_POST = gql`
  query {
    getAllPost {
      _id
      title
      description
      created
    }
  }
`

export const GET_POST = gql`
  query($_id: ID!) {
    getPost(_id: $_id) {
      _id
      title
      description
      author
      comment {
        _id
        text
      }
      created
    }
  }
`

export const SEARCH_POST = gql`
  query($searchText: String) {
    searchPost(searchText: $searchText) {
      _id
      title
      description
    }
  }
`

export const ADD_POST = gql`
  mutation($title: String!, $description: String!, $author: String) {
    addPost(title: $title, description: $description, author: $author) {
      _id
      title
      description
      created
    }
  }
`

export const ADD_COMMENT = gql`
  mutation($text: String) {
    addComment(text: $text) {
      _id
      text
      created
    }
  }
`

export const UPDATE_USER_POST = gql`
  mutation($_id: ID!, $title: String!, $description: String!) {
    updateUserPost(_id: $_id, title: $title, description: $description) {
      _id
      title
      description
    }
  }
`

export const DELETE_USER_POST = gql`
  mutation($_id: ID!) {
    deleteUserPost(_id: $_id) {
      _id
    }
  }
`

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      firstName
      lastName
      email
      created
    }
  }
`

export const GET_USER_POST = gql`
  query($author: String!) {
    getUserPost(author: $author) {
      _id
      title
      description
    }
  }
`

export const SIGNIN_USER = gql`
  mutation($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      token
    }
  }
`

export const SIGNUP_USER = gql`
  mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signupUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
    }
  }
`
