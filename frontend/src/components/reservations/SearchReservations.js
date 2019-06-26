import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Materialize from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { getReservations } from "../../store/actions/reservationActions";

class SearchReservations extends Component {
	state = {
		discipline: "",
		teacherName: ""
	}
	handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		});
	}
	handleSubmit = (e) => {
		const { error, getReservations, history } = this.props;
		e.preventDefault();
		getReservations(this.state);
		Materialize.toast(error ? {html: error} : {html: "Searching for reservations."});
		history.push("/reservations");
	}
	render() {
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">Search reservations</h5>
					<div className="input-field">
						<label htmlFor="discipline">Teacher name</label>
						<input type="text" name="teacherName" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<label htmlFor="discipline">Discipline</label>
						<input type="text" name="discipline" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<button className="btn blue lighten-1 z-depth-0">Submit</button>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		error: state.reservation.error,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		getReservations: (queryObject) => dispatch(getReservations(queryObject))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchReservations);