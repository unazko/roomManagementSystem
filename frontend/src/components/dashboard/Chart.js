import React, { Component } from "react";
import ReactChartkick, { BarChart } from 'react-chartkick';
import ChartJs from 'chart.js';
import { connect } from "react-redux";
import "materialize-css/dist/css/materialize.min.css";
import { getPopularRooms } from "../../store/actions/chartActions";

ReactChartkick.addAdapter(ChartJs);

class Chart extends Component {
	componentDidMount() {
		this.props.getPopularRooms();
	}
	render() {
		const { topRooms, error } = this.props;
		const barChartData = topRooms.map((room) => {
			return [room.number, room.reservationCounter];
		});
		if (error) {
			//Materialize.toast({html: error.response.data.error});
		}
		return (
			<div className="hide-on-med-and-down">
				<h5 className="center-align">Ten most reserved rooms</h5>
				<BarChart data={barChartData} ytitle="Room number" xtitle="Reserve counter" />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		topRooms: state.chart.topRooms,
		error: state.chart.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getPopularRooms: () => dispatch(getPopularRooms())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);