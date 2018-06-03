import gql from 'graphql-tag';

export default gql`
	mutation deletePost($id: ID) {
	  deletePost(id: $id) {
	    id
	  }
	}
`;