import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Materialize from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { updateRoom } from "../../store/actions/roomActions";

class EditRoom extends Component {
	constructor(props) {
		super(props);
		const { number, isComputerRoom, hasProector } = this.props.room;
		this.state = {
			number,
			isComputerRoom,
			hasProector
		}
	}
	componentDidMount() {
		if (this.state.isComputerRoom) {
			document.getElementById("isComputerRoom").setAttribute("checked", "");
		}
		if (this.state.hasProector) {
			document.getElementById("hasProector").setAttribute("checked", "");
		}
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
		const { error, history, room, updateRoom } = this.props;
		e.preventDefault();

		updateRoom(room._id, this.state);
		Materialize.toast(error ? {html: error} : {html: "Room is updated."});
		history.push("/rooms");
	}
	render() {
		const { loggedIn, loggedUser, room } = this.props;
		if (!loggedIn || !loggedUser.master || !room) {
			Materialize.toast({html: "You have to be signed in with a master account."});
			return <Redirect to="/reservations" />
		}

		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">Edit room</h5>
					<div className="input-field">
						<label className="active" htmlFor="number">Room number</label>
						<input type="text" id="number" onChange={this.handleChange} value={this.state.number} />
					</div>
					<div className="switch">
						<label>
							<div><b><i>Computer room</i></b></div>
							No
							<input id="isComputerRoom" type="checkbox" onChange={this.handleChange} />
							<span className="lever"></span>
							Yes
						</label>
					</div>
					<div className="switch">
						<label>
							<div><b><i>Has proector</i></b></div>
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

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const rooms = state.room.rooms;
	const room = rooms ? rooms[id] : null;
	return {
		loggedIn: state.auth.loggedIn,
		loggedUser: state.auth.loggedUser,
		error: state.user.error,
		room: room
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateRoom: (roomId, room) => dispatch(updateRoom(roomId, room))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRoom);