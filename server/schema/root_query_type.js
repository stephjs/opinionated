const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const PostType = require('./post_type');
const CommentType = require('./comment_type');
const Comment = mongoose.model('comment');
const Post = mongoose.model('post');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    Posts: {
      type: new GraphQLList(PostType),
      resolve() {
        return Post.find({});
      }
    },
    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Post.findById(id);
      }
    },
    comment: {
      type: CommentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return Comment.findById(id);
      }
    }
  })
});

module.exports = RootQuery;