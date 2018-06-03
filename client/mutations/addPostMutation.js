import gql from 'graphql-tag';

export default gql`
	mutation addPost($title: String) {
	  addPost(title: $title) {
	    id
	    title
	  }
	}
`;