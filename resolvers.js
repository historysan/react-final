const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (user, secret, expiresIn) => {
  const { firstName, lastName, email } = user
  return jwt.sign({
    firstName,
    lastName,
    email
  }, secret, { expiresIn })
}

exports.resolvers = {
  Query: {
    getAllPost: async (root, args, { Post }) => {
      const allPost = await Post.find().sort({ created: 'desc' })
      return allPost
    },

    getPost: async (root, { _id }, { Post }) => {
      const post = await Post.findOne({
        _id
      })
      return post
    },

    // getPostComment: async (root, { _id, postId }, { Comment }) => {
    //   const postComment = await Comment.find({
    //     _id
    //   })
    //   return postComment
    // },

    searchPost: async (root, { searchText }, { Post }) => {
      if (searchText) {
        const searchResult = await Post.find({
          $text: { $search: searchText }
        }, {
          score: { $meta: 'textScore' }
        }).sort({
          score: { $meta: 'textScore' }
        })
        return searchResult
      } else {
        const post = await Post.find().sort({ created: 'desc' })
        return post
      }
    },

    getUserPost: async (root, { author }, { Post }) => {
      const userPost = await Post.find({ author }).sort({ created: 'desc' })
      return userPost
    },

    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null
      }
      const user = await User.findOne({
        email: currentUser.email
      })
      return user
    }
  },
  Mutation: {
    addPost: async (root, { title, description, author }, { Post }) => {
      const newPost = await new Post({
        title,
        description,
        author
      }).save()
      return newPost
    },

    addComment: async (root, { text },  { Comment }) => {
      const newComment = await new Comment({
        text,
      }).save()
      return newComment
    },

    updateUserPost: async (root, { _id, title, description }, { Post }) => {
      const updatedPost = await Post.findOneAndUpdate(
        { _id },
        { $set: { title, description } },
        { new: true }
      )
      return updatedPost
    },

    deleteUserPost: async (root, { _id }, { Post }) => {
      const post = await Post.findOneAndRemove({ _id })
      return post
    },

    signinUser: async (root, { email, password }, { User }) => {
      const user = await User.findOne({ email })
      if (!user) {
        throw new Error('User not found')
      }
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        throw new Error('Invalid Password')
      }
      return { token: createToken(user, process.env.SECRET, '1hr') }
    },

    signupUser: async (root, { firstName, lastName, email, password }, { User }) => {
      const user = await User.findOne({ email })
      if (user) {
        throw new Error('User already exists with this email')
      }
      const newUser = await new User({
        firstName,
        lastName,
        email,
        password
      }).save()
      return { token: createToken(newUser, process.env.SECRET, '1hr') }
    }
  }
}
