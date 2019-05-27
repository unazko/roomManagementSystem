import React, { Component } from "react";
import { connect } from "react-redux";
import Materialize from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { setPassword } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import { getUsers } from "../../store/actions/userActions";

class SetPassword extends Component {
	state = {
		password: "",
		retypePassword: ""
	}
	componentDidMount() {
		const { getUsers, user } = this.props;
		if (!user) {
			getUsers();
		}
	}
	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	}
	handleSubmit = (e) => {
		const { user } = this.props;
		e.preventDefault();
		this.props.setPassword(user._id, this.state);
	}
	render() {
		const { loggedIn, authError } = this.props;
		if (loggedIn) {
			Materialize.toast({html: "Created password successfully."});
			return <Redirect to="/" />
		}
		if (authError) {
			Materialize.toast({html: authError.response.data.error});
		}
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">Set password</h5>
					<div className="input-field">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" onChange={this.handleChange} required />
					</div>
					<div className="input-field">
						<label htmlFor="retypePassword">Retype password</label>
						<input type="password" id="retypePassword" onChange={this.handleChange} required />
					</div>
					<div className="input-field">
						<button className="btn pink lighten-1 z-depth-0">Sign in</button>
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
		authError: state.auth.authError,
		user: user
	}
};

const mapDispatchToProps = (dispatch) => {
	return {	
		setPassword: (userId, credentials) => dispatch(setPassword(userId, credentials)),
		getUsers: () => dispatch(getUsers())
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(SetPassword);