import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import Materialize from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

class Navbar extends Component {
	componentDidMount() {
		document.addEventListener('DOMContentLoaded', function() {
			const elem = document.querySelector('.sidenav');
			Materialize.Sidenav.init(elem);
		});
	}
	componentDidUnmout() {
		const elem = document.querySelector('.sidenav');
		Materialize.Sidenav.getInstance(elem).destroy();
	}
	render() {
		const {loggedUser, loggedIn} = this.props;
		return (
			<div>
				<nav className="nav-wrapper grey darken-3">
					<div className="container">
						<Link to="/" className="brand-logo right hide-on-small-only">FMI Reservation app</Link>
						<Link to="/" className="sidenav-trigger" data-target="mobile-links">
							<i className="material-icons">menu</i>
						</Link>
						<ul className="left hide-on-med-and-down">
							{loggedUser && loggedIn ? <SignedInLinks loggedUser={loggedUser} /> : <SignedOutLinks />}
						</ul>
					</div>
				</nav>

				<ul className="sidenav" id="mobile-links">
					{loggedUser && loggedIn ? <SignedInLinks loggedUser={loggedUser} /> : <SignedOutLinks />}
				</ul>
			</div>
		)
	}
}

const mapStateToProps = (state) => {

	return {
		loggedIn: state.auth.loggedIn,
		loggedUser: state.auth.loggedUser
	}
}

export default connect(mapStateToProps)(Navbar);