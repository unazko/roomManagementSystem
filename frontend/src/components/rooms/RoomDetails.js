import React from "react";
import { connect } from "react-redux";
import Materialize from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { formatDate } from "../../functions/dateFunctions";
import { Redirect } from "react-router-dom";
import { QRCode } from "react-qr-svg";

const RoomDetails = (props) => {
	if (!props.room) {
		return <Redirect to="/rooms" />
	}
	const { number, isComputerRoom, hasProector, QRUrl} = props.room;
	return (
		<div className="container section">
			<div className="card z-depth-0">
				<div className="card-content row">
					<span className="card-title">Room number: <b><i>{number}</i></b></span>

					<div className="col s6">
						<QRCode
							bgColor="#FFFFFF"
							fgColor="#000000"
							level="Q"
							style={{ width: 128 }}
							value={QRUrl}
						/>
					</div>
				</div>
				<div className="card-action grey lighten-4 grey-text">
					<div className="container row">
					{hasProector ?
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
					{isComputerRoom ?
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
			</div>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const rooms = state.room.rooms;
	const room = rooms ? rooms[id] : null;
	return {
		room: room
	}
};

export default connect(mapStateToProps)(RoomDetails);