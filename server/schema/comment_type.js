const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLInt, GraphQLString } = graphql;
const Comment = mongoose.model('comment');

const CommentType = new GraphQLObjectType({
  name:  'CommentType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    post: {
      type: require('./post_type'),
      resolve(parentValue) {
        return Comment.findById(parentValue).populate('post')
          .then(comment => {
            return comment.post
          });
      }
    }
  })
});

module.exports = CommentType;
