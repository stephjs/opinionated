const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'post'
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
});

CommentSchema.statics.like = function(id) {
  const Comment = mongoose.model('comment');

  return Comment.findById(id)
    .then(comment => {
      ++comment.likes;
      return comment.save();
    })
}

mongoose.model('comment', CommentSchema);
