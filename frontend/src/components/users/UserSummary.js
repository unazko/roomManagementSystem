import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Materialize from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { deleteUser } from "../../store/actions/userActions";
import { formatDate } from "../../functions/dateFunctions";

const UserSummary = ({user, loggedUser, loggedIn, deleteUser, error}) => {
	const handleUserDelete = () => {
		deleteUser(user._id);
		Materialize.toast(error ? {html: error} : {html: "User is deleted."});
	}
	if (!user.master) {
		return (
			<li>
				<div className="collapsible-header">
					<div className="container">
						<div><b>{user.email}</b></div>
						<div>
							{user.signedin ? <i>online</i> : <i>offline</i>}
							{!user.signedin && user.lastSeen ?
							<p>Last seen: {formatDate(user.lastSeen)}</p> : null}
						</div>
					</div>
					<Link to={"user/" + user._id} title="details">
						<i className="material-icons">details</i>
					</Link>
					{loggedIn && loggedUser.master ? (
						<Fragment>
							<Link to={"user/update/" + user._id} title="edit">
								<i  className="material-icons">edit</i>
							</Link>
							<a onClick={handleUserDelete} title="delete">
								<i className="material-icons">delete</i>
							</a>
						</Fragment>
					) : null}

				</div>
				<div className="collapsible-body row">
					<div className="col s12">
						<div className="col s2"><i className="material-icons">person</i></div>
						<div className="col s9 push-s2">{user.name}</div>
					</div>
					<div className="col s12">
						<div className="col s2 "><i className="material-icons">import_contacts</i></div>
						<ol className="col s9 push-s2">
							{user.disciplines.map((discipline, key) => {
								return (
									<li key={key}>{discipline}</li>
								)
							})}
						</ol>
					</div>
				</div>
			</li>
		)
	} else {
		return null;
	}
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
		deleteUser: (userId) => dispatch(deleteUser(userId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSummary);