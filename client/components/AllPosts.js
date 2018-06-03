import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import Pusher from 'pusher-js';

import fetchPostsQuery from '../queries/fetchPostsQuery';
import deletePostMutation from '../mutations/deletePostMutation';
import NavBar from './NavBar';
import AddPostForm from './AddPostForm';

class AllPosts extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
	    this.pusher = new Pusher('fbcd8a18722ef018d12e', {
		  wsHost: 'ws.pusherapp.com',
		  httpHost: 'sockjs.pusher.com',
		  encrypted: true
		});
	    this.channel = this.pusher.subscribe('my-channel');
	}

	componentDidMount() {
		var comp = this;
	    this.channel.bind('modified-Posts', function(data) {
			comp.props.data.refetch({ query: fetchPostsQuery });
		});
	}

	componentWillUnmount() {
	    this.channel.unbind();
	    this.pusher.unsubscribe(this.channel);
	    this.pusher.disconnect();
	}

	deletePost(id) {
		this.props.mutate({
			variables: { id },
			refetchQueries: [{ query: fetchPostsQuery }]
		})
	}

	renderAll() {
		return this.props.data.Posts.map(post => {
			return (
				<li key={post.id} id={post.id} className="collection-item card">
					<Link to={'/op/'+post.id}>
						{post.title}
					</Link>
					<i className="material-icons right" onClick={() => this.deletePost(post.id)}>delete</i>
				</li>
			);
		})
	}

	render() {
		if (this.props.data.loading && !this.props.data.Posts) {
			return (
				<div className="loader-holder">
					<img className="loader" src="https://zippy.gfycat.com/SkinnySeveralAsianlion.gif"/>
				</div>
			)
		}
		
		return(
			<div className="AllPosts">
				<NavBar />
				<div className="container">
					
					<div className="container__title">
						<h3>Feed</h3>
					</div>
					<AddPostForm history={this.props.history}/>
					<ul className="collection feed">
						{this.renderAll()}
					</ul>
				</div>
			</div>
		);
	}
}

export default graphql(deletePostMutation) (
	graphql(fetchPostsQuery)(AllPosts)
);