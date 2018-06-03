import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { withRouter, Link } from "react-router-dom";
import Pusher from 'pusher-js';

import fetchPostAndCommentsQuery from '../queries/fetchPostAndCommentsQuery';
import addCommentMutation from '../mutations/addCommentMutation';
import NavBar from './NavBar';

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			firstLoad: true,
			newComment: '',
			PostId: this.props.match.params.id
		};
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
		var compProps = this.props;
	    this.channel.bind('modified-comments', function(data) {
			compProps.data.refetch({ 
				query: (fetchPostAndCommentsQuery, {
					options: (compProps) => {return {
						variables: { id: compProps.match.params.id } }
					}
				})
			});
			comp.scrollToBottom();
		});
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	componentWillUnmount() {
	    this.channel.unbind();
	    this.pusher.unsubscribe(this.channel);
	    this.pusher.disconnect();
	}

	renderCommentsList() {
		const comments = this.props.data.post.comments;
		if (comments.length == 0) {
			return (
				<li className="collection-item secret">
					<p>Be bold! Leave the first comment.</p>
				</li>
			);
		}
		return comments.map(comment => {
			return (
				<li key={comment.id} id={comment.id} className="collection-item">
					{comment.content}
				</li>
			);
		})
	}
	scrollToBottom() {
	  this.messagesEnd.scrollIntoView({ behavior: "smooth" });
	}

	onSubmitComment(event) {
		event.preventDefault();
		this.props.mutate({
			variables: {
			  "PostId": this.state.PostId,
			  "content": this.state.newComment
			}
		}).catch(function(error) {
		}).then(() => this.setState({ newComment: "" }));
	}
	render() {
		//
		if (this.props.data.loading && !this.props.data.post) {
			return (
				<div className="loader-holder">
					<img className="loader" src="https://zippy.gfycat.com/SkinnySeveralAsianlion.gif"/>
				</div>
			)
		}

		return(
			<div className="Post">
				<NavBar />
				<div className="container">

					<div className="container__title">
						<h3>{this.props.data.post.title}</h3>
					</div>
					
					<ul className="collection">
						<div className="comments">
							{this.renderCommentsList()}
							<div style={{ float:"left", clear: "both" }}
					             ref={(el) => { this.messagesEnd = el; }}>
					        </div>
						</div>
						<form onSubmit={this.onSubmitComment.bind(this)}>
							<li className="collection-item">
								<input type="text" 
									ref="commentInput"
									onChange={ event => this.setState({ newComment: event.target.value })} 
									value={this.state.newComment}
									placeholder="Reply"
								/>
							</li>
						</form>
					</ul>
				</div>
				
			</div>
		);
	}
}

export default graphql(addCommentMutation) (
	graphql(fetchPostAndCommentsQuery, {
		options: (props) => {return {
			variables: { id: props.match.params.id } }
		}
	})(Post)
);