import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Materialize from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { deleteReservation } from "../../store/actions/reservationActions";
import { formatDate } from "../../functions/dateFunctions";

const ReservationSummary = ({reservation, loggedUser, loggedIn, deleteReservation, error}) => {
	const handleReservationDelete = () => {
		deleteReservation(reservation._id, reservation.reservations._id);
		Materialize.toast(error ? {html: error} : {html: "Reservation is deleted."});
	}
	return (
		<li>
			<div className="collapsible-header">
				<div className="container">
					<div><b>{reservation.reservations.discipline}</b></div>
					<div><b>{reservation.reservations.teacherName}</b></div>
				</div>
				<Link to={"reservation/" + reservation.reservations._id} title="details">
					<i className="material-icons">details</i>
				</Link>
				{loggedIn ? (
					<Fragment>
						<a onClick={handleReservationDelete} title="delete">
							<i className="material-icons">delete</i>
						</a>
					</Fragment>
				) : null}
			</div>
			<div className="collapsible-body row">
				<div className="col s12">
					<div className="col s2"><i className="material-icons">room</i></div>
					<div className="col s9">{reservation.number}</div>
				</div>
				<div className="col s12">
					<div className="col s2"><i className="material-icons">import_contacts</i></div>
					<div className="col s9">{reservation.reservations.discipline}</div>
				</div>
				<div className="col s12">
					<div className="col s2"><i className="material-icons">date_range</i></div>
					<div className="col s9">{formatDate(reservation.reservations.startDate)}</div>
					<div className="col s9">{formatDate(reservation.reservations.endDate)}</div>
				</div>
			</div>
		</li>
	)
}

const mapStateToProps = (state) => {
	return {
		loggedUser: state.auth.loggedUser,
		loggedIn: state.auth.loggedIn,
		error: state.reservation.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteReservation: (roomId, reservationId) => dispatch(deleteReservation(roomId, reservationId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationSummary);