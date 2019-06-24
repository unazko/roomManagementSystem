import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Materialize from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { getRooms } from "../../store/actions/roomActions";

class SerachRooms extends Component {
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
		const { error, getRooms, history } = this.props;
		const {number, isComputerRoom, hasProector} = this.state;
		e.preventDefault();
		getRooms(number, isComputerRoom, hasProector);
		Materialize.toast(error ? {html: error} : {html: "Seraching for rooms."});
		history.push("/rooms");
	}
	render() {
		const { loggedIn } = this.props;
		if (!loggedIn) {
			Materialize.toast({html: "You have to sign in first."});
			return <Redirect to="/reservations" />
		}
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white row">
					<h5 className="grey-text text-darken-3">Search rooms</h5>
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
						<button className="btn blue lighten-1 z-depth-0">Serach</button>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		loggedIn: state.auth.loggedIn,
		error: state.user.error
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		getRooms: (number, isComputerRoom, hasProector) => dispatch(getRooms(number, isComputerRoom, hasProector))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SerachRooms);