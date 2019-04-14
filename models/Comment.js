const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  text: {type: String},
  postId: {type: Schema.Types.ObjectId, ref: 'Post'},
  created: {type: Date, default: Date.now},
})

module.exports = mongoose.model('Comment', CommentSchema)
