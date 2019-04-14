const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: {type: String},
  description: {type: String},
  author: {type: String},
  comment: {type: [Schema.Types.ObjectId], ref: 'Comment'},
  created: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now},
})

PostSchema.index({
  '$**': 'text'
})

module.exports = mongoose.model('Post', PostSchema)
