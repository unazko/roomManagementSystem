import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Materialize from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { updateUser } from "../../store/actions/userActions";

class EditUser extends Component {
	constructor(props) {
		super(props);
		const { email, name, disciplines } = this.props.user;
		this.state = {
			email,
			name,
			disciplines
		}
	}
	handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}
	handleSubmit = (e) => {
		const { error, history, user, updateUser } = this.props;
		e.preventDefault();

		const userCopy = JSON.parse(JSON.stringify(this.state));
		userCopy.disciplines = this.state.disciplines.split(",");
		updateUser(user._id, userCopy);
		Materialize.toast(error ? {html: error} : {html: "User is updated."});
		history.push("/users");
	}
	render() {
		const { loggedIn, loggedUser, user } = this.props;
		if (!loggedIn || !loggedUser.master || !user) {
			Materialize.toast({html: "You have to be signed in with a master account."});
			return <Redirect to="/reservations" />
		}

		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">Edit user</h5>
					<div className="input-field">
						<label className="active" htmlFor="email">Email</label>
						<input type="email" id="email" onChange={this.handleChange} value={this.state.email} />
					</div>
					<div className="input-field">
						<label className="active" htmlFor="name">Name</label>
						<input type="text" id="name" onChange={this.handleChange} value={this.state.name} />
					</div>
					<div className="input-field">
						<label className="active" htmlFor="disciplines">Disciplines</label>
						<input type="text" id="disciplines" onChange={this.handleChange} value={this.state.disciplines} />
					</div>
					<div className="input-field">
						<button className="btn pink lighten-1 z-depth-0">Submit</button>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const users = state.user.users;
	const user = users ? users[id] : null;
	return {
		loggedIn: state.auth.loggedIn,
		loggedUser: state.auth.loggedUser,
		error: state.user.error,
		user: user
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateUser: (userId, user) => dispatch(updateUser(userId, user))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);