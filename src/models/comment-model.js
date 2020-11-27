const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    client: {
      type: String
    },
    service: {
        type: String
      },
    date: {
        type: String
      },
    rating: {
        type: Number
      },  
    comments: {
        type: String
      }                                  
  });
  const Comment = mongoose.model('Comment', CommentSchema);
  module.exports = Comment;