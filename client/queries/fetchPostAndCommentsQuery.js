import gql from 'graphql-tag';

export default gql`
	query FetchAllPostInfo($id: ID!) {
	  post(id: $id) {
	    id
	    title
	    comments {
	    	id
	      	content
	    }
	  }
	}
`;