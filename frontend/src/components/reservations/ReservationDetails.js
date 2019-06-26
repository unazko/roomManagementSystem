import React from "react";
import { connect } from "react-redux";
import Materialize from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { formatDate } from "../../functions/dateFunctions";
import { Redirect } from "react-router-dom";

const ReservationDetails = (props) => {
	if (!props.reservation) {
		return <Redirect to="/reservations" />
	}
	const { number, hasProector, isComputerRoom } = props.reservation;
	const { startDate, endDate, teacherName, discipline } = props.reservation.reservations;
	return (
		<div className="container section">
			<div className="card z-depth-0">
				<div className="card-content row">
					<span className="card-title">{discipline}</span>
					
					<div className="col s12">
						<div className="col s2"><i className="material-icons">person</i></div>
						<div className="col s6">{teacherName}</div>
					</div>
					<div className="col s12">
						<span className="col s2"><i className="material-icons">date_range</i></span>
						<div className="col s6">Start date: <i>{formatDate(startDate)}</i></div>
						<div className="col s6">End date: <i>{formatDate(endDate)}</i></div>
					</div>

				</div>
				<div className="card-action grey lighten-4 grey-text">
				<div>{hasProector ? <b><i>Proector</i></b> : null}</div>
				<div>{isComputerRoom ? <b><i>Computer room</i></b> : null}</div>
				<div>Room number: <b><i>{number}</i></b></div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const reservations = state.reservation.reservations;
	const reservation = reservations ? reservations[id] : null;
	return {
		reservation: reservation
	}
};

export default connect(mapStateToProps)(ReservationDetails);