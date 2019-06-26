import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Materialize from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { addReservation } from "../../store/actions/reservationActions";

class AddReservation extends Component {
	state = {
		discipline: "",
		startDate: new Date().toJSON(),
		duration: "1"
	}
	componentDidMount() {
		const datePickerOptions = {
			minDate: new Date(),
			defaultDate: new Date(),
			setDefaultDate: true,
			onSelect: (startDate) => {
				this.setState({
					...this.state,
					startDate: startDate.toJSON()
				});
			}
		};
		const timePickerOptions = {
			defaultTime: "now",
			twelveHour: false,
			onSelect: (hours, minutes) => {
				this.setState({
					...this.state,
					hours,
					minutes
				});
			}
		};
		Materialize.Datepicker.init(document.querySelectorAll(".datepicker"), datePickerOptions);
		Materialize.Timepicker.init(document.querySelectorAll(".timepicker"), timePickerOptions);
	}
	componentDidUnmout() {
		Materialize.Datepicker.getInstance(document.querySelectorAll(".datepicker")).destroy();
		Materialize.Timepicker.getInstance(document.querySelectorAll(".timepicker")).destroy();
	}
	handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		});
	}
	handleSubmit = (e) => {
		const { error, room, history, addReservation } = this.props;
		const { startDate, hours, minutes } = this.state;

		e.preventDefault();
		const startDateCopy = new Date(startDate);
		startDateCopy.setHours(hours);
		startDateCopy.setMinutes(minutes);
		
		const reservation = JSON.parse(JSON.stringify(this.state));
		reservation.startDate = startDateCopy;

		console.log(reservation);
		addReservation(room._id, reservation);
		Materialize.toast(error ? {html: error} : {html: "Reservation is created."});
		history.push("/reservations");
	}
	render() {
		const { loggedIn, loggedUser } = this.props;
		if (!loggedIn) {
			Materialize.toast({html: "You have to sign in first."});
			return <Redirect to="/signin" />
		}
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">New reservation</h5>
					<div className="input-field">
						<label htmlFor="discipline">Discipline</label>
						<input type="text" name="discipline" onChange={this.handleChange} />
					</div>

					<label htmlFor="datepicker">Start Date</label>
					<input type="text" id="datepicker" className="datepicker" />
					<label htmlFor="timepicker">Start Time</label>
					<input type="text" id="timepicker" className="timepicker" />

					<div className="section">
						<label htmlFor="oneHour">
							<input type="radio" id="oneHour" name="duration" value="1" onChange={this.handleChange} />
							<span> One hour</span>
						</label>
						<label htmlFor="twoHour">
							<input type="radio" id="twoHour" name="duration" value="2" onChange={this.handleChange} />
							<span> Two hours</span>
						</label>
						<label htmlFor="threeHour">
							<input type="radio" id="threeHour" name="duration" value="3" onChange={this.handleChange} />
							<span> Three hours</span>
						</label>
						<label htmlFor="fourHour">
							<input type="radio" id="fourHour" name="duration" value="4" onChange={this.handleChange} />
							<span> Four hours</span>
						</label>
						<label htmlFor="fiveHour">
							<input type="radio" id="fiveHour" name="duration" value="5" onChange={this.handleChange} />
							<span> Five hours</span>
						</label>
						<label htmlFor="sixHour">
							<input type="radio" id="sixHour" name="duration" value="6" onChange={this.handleChange} />
							<span> Six hours</span>
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
		error: state.reservation.error,
		room: room
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		addReservation: (roomId, reservation) => dispatch(addReservation(roomId, reservation))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReservation);