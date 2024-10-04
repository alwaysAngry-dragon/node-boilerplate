const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }, // Reference to Post
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }, // Reference to User
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model(
  'Comment',
  commentSchema
);

module.exports = Comment;
