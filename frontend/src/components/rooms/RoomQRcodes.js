import React from "react";
import { connect } from "react-redux";
import "materialize-css/dist/css/materialize.min.css";
import { Redirect } from "react-router-dom";
import { QRCode } from "react-qr-svg";

const RoomQRcodes = ({ rooms }) => {
	if (!rooms) {
		return <Redirect to="/rooms" />
	}
	const roomsList = Object.keys(rooms).map(key => {
		return (
			<div key={rooms[key]._id} className="section">
				<div>{rooms[key].number}</div>
				<QRCode
					bgColor="#FFFFFF"
					fgColor="#000000"
					level="Q"
					style={{ width: 128 }}
					value={rooms[key].QRUrl}
				/>
			</div>
		);
	});
	return (
		<div className="container">
			{roomsList}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		rooms: state.room.rooms
	}
};

export default connect(mapStateToProps)(RoomQRcodes);