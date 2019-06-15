import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Materialize from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import Chart from "./Chart";
import UserList from "../users/UserList";
import RoomList from "../rooms/RoomList";
import ReservationList from "../reservations/ReservationList";
import { connect } from "react-redux";
import { getUsers } from "../../store/actions/userActions";
import { getRooms } from "../../store/actions/roomActions";
import { getReservations } from "../../store/actions/reservationActions";

class Dashboard extends Component {
	componentDidMount() {
		this.props.getUsers();
		this.props.getRooms();
		this.props.getReservations();
	}
	render() {
		const { reservations, match } = this.props;
		return (
			<div className="container">
				<div className="row">
					<div className="col s12 m7">
						{match.url === "/users" ?
							<Fragment>
								<div className="section">
									<Link to="/user/search" className="btn grey col s12 section">
										<div className="col s2"><i className="material-icons left">search</i></div>
										<div className="col s8">Serach users</div>
									</Link>
								</div>
								<UserList />
							</Fragment>
							: null}
						{match.url === "/rooms" ?
							<Fragment>
								<div className="section">
									<Link to="/room/search" className="btn grey col s12 section">
										<div className="col s2"><i className="material-icons left">search</i></div>
										<div className="col s8">Serach rooms</div>
									</Link>
								</div>
								<RoomList />
							</Fragment>
							: null}
						{match.url === "/reservations" || match.url === "/" ?
							<Fragment>
								<div className="section">
									<Link to="/reservation/search" className="btn grey col s12 section">
										<div className="col s2"><i className="material-icons left">search</i></div>
										<div className="col s8">Serach reservations</div>
									</Link>
								</div>
								<ReservationList reservations={reservations} />
							</Fragment>
							: null}
					</div>
					<div className="col s12 m4 offset-m1">
						<Chart />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		reservations: state.reservation.reservations,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getReservations: () => dispatch(getReservations()),
		getUsers: () => dispatch(getUsers()),
		getRooms: () => dispatch(getRooms())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);