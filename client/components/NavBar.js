import React, { PropTypes } from 'react';
import { withRouter, Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <nav>
	    <div className="nav-wrapper">
	    	<Link className="brand-logo left" to="/">
				Opinionated.
			</Link>
		    <ul id="nav-mobile" className="right hide-on-sm-and-down">
		        <li>
					<Link className="btn btn-sm" to="/op/new">
						+ Add Opinion
					</Link>
		        </li>
		    </ul>
	    </div>
	</nav>
  );
}


export default NavBar;

