import React, { Component } from 'react';

import NavBar from './NavBar';
import AddPostForm from './AddPostForm';

class NewPost extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="NewPost">
				<NavBar />
				<div className="container">
					<div className="container__title">
						<h3>Contribute Your Two Cents</h3>
					</div>

					<ul className="collection">
						<li className="collection-item">
							<AddPostForm history={this.props.history}/>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default NewPost;