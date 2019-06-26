import React, { Component, Fragment } from "react";
import Materialize from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import ReservationSummary from "./ReservationSummary";

class ReservationList extends Component {
	componentDidMount() {
		const collapsible = Materialize.Collapsible.init(document.querySelector('.collapsible'));
		this.setState({
			...this.state,
			collapsible
		});
	}
	componentDidunmount() {
		const { collapsible } = this.state;
		collapsible.destroy();
	}
	render() {
		const { reservations } = this.props; 
		const reservationList = Object.keys(reservations).map(key => {
			return (
				<ReservationSummary reservation={reservations[key]} key={reservations[key].reservations._id} />
			)
		});
		return (
			<Fragment>
				<h5 className="center-align">
					<div className="btn blue lighten-1 z-depth-0 col s12">
						<div className="col s2"><i className="material-icons left">view_list</i></div>
						<div className="col s8">Reservations</div>
					</div>
				</h5>
				<ul className="collapsible">
					{ reservationList }
				</ul>
			</Fragment>
		)
	}
}

export default ReservationList;