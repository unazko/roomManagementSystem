import React from "react";
import { connect } from "react-redux";
import Materialize from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { formatDate } from "../../functions/dateFunctions";
import { Redirect } from "react-router-dom";
import { QRCode } from "react-qr-svg";

const UserDetails = (props) => {
	if (!props.user) {
		return <Redirect to="/users" />
	}
	const { email, name, disciplines, lastSeen, signedin, QRUrl} = props.user;
	return (
		<div className="container section">
			<div className="card z-depth-0">
				<div className="card-content row">
					<span className="card-title">{email}</span>
					
					<div className="col s6">
						<div className="col s2"><i className="material-icons">person</i></div>
						<div className="col s4">{name}</div>
					</div>
					<div className="col s6">
						<QRCode
							bgColor="#FFFFFF"
							fgColor="#000000"
							level="Q"
							style={{ width: 128 }}
							value={QRUrl}
						/>
					</div>
					<div className="col s6">
						<span className="col s2"><i className="material-icons">import_contacts</i></span>
						<ol className="col s4 push-s1">
							{disciplines.map((discipline, key) => {
								return (
									<li key={key}>{discipline}</li>
								)
							})}
						</ol>
					</div>

				</div>
				<div className="card-action grey lighten-4 grey-text">
				{signedin ? <b><i>online</i></b> : null}
				{!signedin && lastSeen ? <b><i>{formatDate(lastSeen)}</i></b> : null}
				{!signedin && !lastSeen ? <b><i>offline</i></b> : null}
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const users = state.user.users;
	const user = users ? users[id] : null;
	return {
		user: user
	}
};

export default connect(mapStateToProps)(UserDetails);