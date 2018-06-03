import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { withRouter, Link } from "react-router-dom";

import fetchPostsQuery from '../queries/fetchPostsQuery';
import addPostMutation from '../mutations/addPostMutation';


class AddPostForm extends Component {
	constructor(props) {
		super(props);
		this.state = { title: ''};
	}

	onSubmit(event) {
		event.preventDefault();
		this.props.mutate({
			variables: { title: this.state.title },
			refetchQueries: [{ query: fetchPostsQuery }]
		}).then(() => this.props.history.push("/"));
		this.setState({ title:''});
	}
	
	render() {
		return(
			<form onSubmit={this.onSubmit.bind(this)}>
				<input 
					type="text"
					onChange={ event => this.setState({ title: event.target.value })} 
					value={this.state.title}
					placeholder="I think..."
				/>
			</form>
		);
	}
}


export default graphql(addPostMutation)(AddPostForm);