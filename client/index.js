import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './style/style.css';
import AllPosts from './components/AllPosts';
import NewPost from './components/NewPost';
import Post from './components/Post';

const client = new ApolloClient({
	dataIdFromObject: o => o.id
});

const Root = () => {
	return (
		<ApolloProvider client={client}>
			<div>
				<BrowserRouter>
					<Switch>
						<Route path="/op/new" component={NewPost}></Route>
						<Route path="/op/:id" component={Post}></Route>
						<Route path="/" component={AllPosts}></Route>
					</Switch>
				</BrowserRouter>
			</div>
		</ApolloProvider>
	)
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);