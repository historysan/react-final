const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const Post = require('./models/Post')
const User = require('./models/User')
const Comment = require('./models/Comment')
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')

require('dotenv').config({ path: 'variables.env' })

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err))

const app = express()

const corsOption = {
  origin: 'http://localhost:3000',
  credentials: true
}

app.use(cors(corsOption))

app.use(async (req, res, next) => {
  const token = req.headers['authorization']
  if (token !== "null") {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET)
      req.currentUser = currentUser
    } catch (err) {
      console.error(err)
    }
  }
  next()
})

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

app.use('/graphql', bodyParser.json(), graphqlExpress(({ currentUser }) => ({
  schema,
  context: {
    Post,
    User,
    Comment,
    currentUser
  }
})))

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`)
})