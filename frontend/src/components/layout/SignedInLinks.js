import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import Materialize from "materialize-css";

const SignedInLinks = ({loggedUser, signOut, authError }) => {
	const onNavLinkClick = () => {
		const elem = document.querySelector('.sidenav');
		Materialize.Sidenav.getInstance(elem).close();
	}
	const onSignOut = () => {
		signOut();
		onNavLinkClick();
		Materialize.toast(authError ? {html: authError} : {html: "Singed out successfully."});
	}
	return (
		<Fragment>
			<li><NavLink onClick={onNavLinkClick} to="/users">Users</NavLink></li>
			<li><NavLink onClick={onNavLinkClick} to="/reservations">Reservations</NavLink></li>
			<li><NavLink onClick={onNavLinkClick} to="/rooms">Rooms</NavLink></li>
			<li><a onClick={onSignOut}>Sign out</a></li>
			<li><NavLink onClick={onNavLinkClick} to="/qrToPpf">QR to pdf</NavLink></li>
			<li><NavLink onClick={onNavLinkClick} to={`/user/${loggedUser._id}`}>{loggedUser.email}</NavLink></li>
		</Fragment>
	)
}

const mapStateToProps = (state) => {
	return {
		authError: state.auth.authError
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);