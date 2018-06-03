const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
});

PostSchema.statics.addComment = function(id, content) {
  const Comment = mongoose.model('comment');

  return this.findById(id)
    .then(post => {
      const comment = new Comment({ content, post })
      post.comments.push(comment)
      return Promise.all([comment.save(), post.save()])
        .then(([comment, post]) => post);
    });
}

PostSchema.statics.findComments = function(id) {
  return this.findById(id)
    .populate('comments')
    .then(post => post.comments);
}

mongoose.model('post', PostSchema);
