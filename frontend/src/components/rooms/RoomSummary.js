import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Materialize from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { deleteRoom } from "../../store/actions/roomActions";

const RoomSummary = ({room, loggedUser, loggedIn, deleteRoom, error}) => {
	const handleRoomDelete = () => {
		deleteRoom(room._id);
		Materialize.toast(error ? {html: error} : {html: "Room is deleted."});
	}
	return (
		<li>
			<div className="collapsible-header">
				<div className="container row">
					<span className="col s4">Room number:</span>
					<b><i className="col s4">{room.number}</i></b>
				</div>
				<Link to={"room/" + room._id + "/reservation/add"} title="add reservation">
					<i className="material-icons">note_add</i>
				</Link>
				<Link to={"room/" + room._id} title="details">
					<i className="material-icons">details</i>
				</Link>
				{loggedIn && loggedUser.master ? (
					<Fragment>
						<Link to={"room/update/" + room._id} title="edit">
							<i  className="material-icons">edit</i>
						</Link>
						<a onClick={handleRoomDelete} title="delete">
							<i className="material-icons">delete</i>
						</a>
					</Fragment>
				) : null}
			</div>
			<div className="collapsible-body">
				<div className="container row">
					{room.hasProector ?
						<div className="switch">
							<i className="col s6">Computer room</i>
							<label>
								No
								<input disabled type="checkbox" checked />
								<span className="lever"></span>
								Yes
							</label>
						</div> : 
						<div className="switch">
							<i className="col s6">Computer room</i>
							<label>
								No
								<input disabled type="checkbox" />
								<span className="lever"></span>
								Yes
							</label>
						</div>
					}
					{room.isComputerRoom ?
						<div className="switch">
							<i className="col s6">Has proector</i>
							<label>
								No
								<input disabled type="checkbox" checked />
								<span className="lever"></span>
								Yes
							</label>
						</div> : 
						<div className="switch">
							<i className="col s6">Has proector</i>
							<label>
								No
								<input disabled type="checkbox" />
								<span className="lever"></span>
								Yes
							</label>
						</div>
					}
				</div>
			</div>
		</li>
	)
}

const mapStateToProps = (state) => {
	return {
		loggedUser: state.auth.loggedUser,
		loggedIn: state.auth.loggedIn,
		error: state.user.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteRoom: (roomId) => dispatch(deleteRoom(roomId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomSummary);