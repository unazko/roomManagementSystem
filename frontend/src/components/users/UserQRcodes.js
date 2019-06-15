import React from "react";
import { connect } from "react-redux";
import "materialize-css/dist/css/materialize.min.css";
import { Redirect } from "react-router-dom";
import { QRCode } from "react-qr-svg";

const UserQRcodes = ({ users }) => {
	if (!users) {
		return <Redirect to="/users" />
	}
	const userList = Object.keys(users).map(key => {
		return (
			<div key={users[key]._id} className="section">
				<div>{users[key].email}</div>
				<QRCode
					bgColor="#FFFFFF"
					fgColor="#000000"
					level="Q"
					style={{ width: 128 }}
					value={users[key].QRUrl}
				/>
			</div>
		);
	});
	return (
		<div className="container">
			{userList}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		users: state.user.users
	}
};

export default connect(mapStateToProps)(UserQRcodes);