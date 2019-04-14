exports.typeDefs = `
  type Post {
    _id: ID
    title: String
    description: String
    author: String
    created: String
    modified: String
  }

  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String! @unique
    password: String!
    created: String
    modified: String
  }

  type Comment {
    _id: ID
    text: String
    created: String
  }

  type Token {
    token: String!
  }

  type Query {
    getAllPost: [Post]

    getPost(_id: ID!): Post

    searchPost(searchText: String): [Post]

    getCurrentUser: User

    getUserPost(author: String!): [Post]
  }

  type Mutation {
    addPost(title: String!, description: String!, author: String): Post

    addComment(_id: ID, text: String): Comment

    updateUserPost(_id: ID!, title: String!, description: String!): Post

    deleteUserPost(_id: ID): Post

    signinUser(email: String!, password: String!): Token

    signupUser(
      firstName: String!,
      lastName: String!,
      email: String!,
      password: String!,
    ): Token
  }
`
