import gql from 'graphql-tag';

export default gql`
	mutation addCommentToPost($content: String, $PostId: ID) {
	  addCommentToPost (content: $content, PostId:$PostId) {
	  	id
	    title
	    comments {
	    	id
	    	content
	    }
	  }
	}
`;