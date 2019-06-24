import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Materialize from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { createRoom } from "../../store/actions/roomActions";

class AddRoom extends Component {
	state = {
		number: "",
		isComputerRoom: false,
		hasProector: false
	}
	handleChange = (e) => {
		const target = e.target;
		const propValue = target.type === 'checkbox' ? target.checked : target.value;
		const propName = target.id;
		this.setState({
			[propName]: propValue
		});
	}
	handleSubmit = (e) => {
		const { error, history, createRoom } = this.props;
		e.preventDefault();
		createRoom(this.state);
		Materialize.toast(error ? {html: error} : {html: "Room is created."});
		history.push("/rooms");
	}
	render() {
		const { loggedIn, loggedUser } = this.props;
		if (!loggedIn || !loggedUser.master) {
			Materialize.toast({html: "You have to be signed in with a master account."});
			return <Redirect to="/reservations" />
		}
		return (
			<div className="container row">
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">Add room</h5>
					<div className="input-field">
						<label htmlFor="number">Room number</label>
						<input type="text" id="number" onChange={this.handleChange} />
					</div>
					<div className="switch">
						<i className="col s6">Computer room</i>
						<label>
							No
							<input id="isComputerRoom" type="checkbox" onChange={this.handleChange} />
							<span className="lever"></span>
							Yes
						</label>
					</div>
					<div className="switch">
						<i className="col s6">Has proector</i>
						<label>
							No
							<input id="hasProector" type="checkbox" onChange={this.handleChange} />
							<span className="lever"></span>
							Yes
						</label>
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
		createRoom: (room) => dispatch(createRoom(room))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRoom);