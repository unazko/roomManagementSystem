import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Materialize from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import UserSummary from "./UserSummary";
import { Redirect, Link } from "react-router-dom";

class UserList extends Component {
	componentDidMount() {
		const collapsible = Materialize.Collapsible.init(document.querySelector('.collapsible'));
		this.setState({
			...this.state,
			collapsible
		});
	}
	componentDidunmount() {
		const { collapsible } = this.state;
		collapsible.destroy();
	}
	render() {
		const { users, loggedIn, loggedUser } = this.props;
		const userList = Object.keys(users).map(key => {
			return (
				<UserSummary user={users[key]} key={users[key]._id} />
			)
		});
		return (
			<Fragment>
				{loggedIn && loggedUser.master ? 
				<h5 className="center-align">
					<Link to="/user/add" className="btn blue lighten-1 z-depth-0 col s12">
						<div className="col s2"><i className="material-icons left">person_add</i></div>
						<div className="col s8">New user</div>
					</Link>
				</h5> : 
				<h5 className="center-align">
					<div className="btn blue lighten-1 z-depth-0 col s12">
						<div className="col s2"><i className="material-icons left">person_add</i></div>
						<div className="col s8">Users</div>
					</div>
				</h5>}
				<ul className="collapsible">
					{ userList }
				</ul>
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		users: state.user.users,
		loggedIn: state.auth.loggedIn,
		loggedUser: state.auth.loggedUser
	}
}

export default connect(mapStateToProps)(UserList);