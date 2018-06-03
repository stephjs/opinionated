const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Post = mongoose.model('post');
const Comment = mongoose.model('comment');
const PostType = require('./post_type');
const CommentType = require('./comment_type');
const Pusher = require('pusher');
const dotenv = require('dotenv').config();

var pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  host: 'api.pusherapp.com',
  encrypted: true
});

let timesHitPusher = 0;
function triggerPusherChange(event, action, identifier) {
  timesHitPusher ++;
  pusher.trigger('my-channel', event, {
    "actionType": action,
    "message": identifier,
    "hit": timesHitPusher
  });
}

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPost: {
      type: PostType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        triggerPusherChange("modified-Posts", "addPost", { title });
        return (new Post({ title })).save()
      }
    },
    addCommentToPost: {
      type: PostType,
      args: {
        content: { type: GraphQLString },
        PostId: { type: GraphQLID }
      },
      resolve(parentValue, { content, PostId }) {
        triggerPusherChange("modified-comments", "addCommentToPost", { PostId });
        return Post.addComment(PostId, content);
      }
    },
    likeComment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Comment.like(id);
      }
    },
    deletePost: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        triggerPusherChange("modified-Posts", "deletePost", { id });
        return Post.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;