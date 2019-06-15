import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Materialize from "materialize-css";

const SignedOutLinks = () => {
	const onNavLinkClick = () => {
		const elem = document.querySelector('.sidenav');
		Materialize.Sidenav.getInstance(elem).close();
	}
	return (
		<Fragment>
			<li><NavLink onClick={onNavLinkClick} to="/users">Users</NavLink></li>
			<li><NavLink to="/reservations" onClick={onNavLinkClick}>Reservations</NavLink></li>
			<li><NavLink to="/signin" onClick={onNavLinkClick}>Sign in</NavLink></li>
		</Fragment>
	)
}

export default SignedOutLinks;