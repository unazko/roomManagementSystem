import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Materialize from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { createUser } from "../../store/actions/userActions";

class AddUser extends Component {
	state = {
		email: "",
		name: "",
		disciplines: ""
	}
	handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}
	handleSubmit = (e) => {
		const { error, history, createUser } = this.props;
		e.preventDefault();

		const user = JSON.parse(JSON.stringify(this.state));
		user.disciplines = this.state.disciplines.split(",");
		createUser(user);
		Materialize.toast(error ? {html: error} : {html: "User is created."});
		history.push("/users");
	}
	render() {
		const { loggedIn, loggedUser } = this.props;
		if (!loggedIn || !loggedUser.master) {
			Materialize.toast({html: "You have to be signed in with a master account."});
			return <Redirect to="/reservations" />
		}
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">New user</h5>
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<label htmlFor="name">Name</label>
						<input type="text" id="name" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<label htmlFor="disciplines">Disciplines</label>
						<input type="text" id="disciplines" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<button className="btn pink lighten-1 z-depth-0">Submit</button>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		loggedIn: state.auth.loggedIn,
		loggedUser: state.auth.loggedUser,
		error: state.user.error
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		createUser: (userEmail) => dispatch(createUser(userEmail))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);