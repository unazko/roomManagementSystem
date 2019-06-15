import React, { Component } from "react";
import { connect } from "react-redux";
import Materialize from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { getUsers } from "../../store/actions/userActions";

class SearchUsers extends Component {
	state = {
		email: "",
		name: ""
	}
	handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}
	handleSubmit = (e) => {
		const { error, getUsers, history } = this.props;
		const { email, name } = this.state;

		e.preventDefault();
		getUsers(email, name);
		Materialize.toast(error ? {html: error} : {html: "Searching for users."});
		history.push("/users");
	}
	render() {
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">Seearch users</h5>
					<div className="input-field">
						<label htmlFor="email">Serach by email</label>
						<input type="text" id="email" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<label htmlFor="name">Search by name</label>
						<input type="text" id="name" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<button className="btn blue lighten-1 z-depth-0">Search</button>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		error: state.user.error
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUsers: (userEmail, userName) => dispatch(getUsers(userEmail, userName))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers);