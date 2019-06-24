import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Materialize from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import RoomSummary from "./RoomSummary";
import { Redirect, Link } from "react-router-dom";

class RoomList extends Component {
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
		const { rooms, loggedIn, loggedUser } = this.props;
		if (!loggedIn) {
			Materialize.toast({html: "You have to be signed in with a master account."});
			return <Redirect to="/reservations" />
		}
		const roomList = Object.keys(rooms).map(key => {
			return (
				<RoomSummary room={rooms[key]} key={rooms[key]._id} />
			)
		});
		return (
			<Fragment>
				<h5 className="center-align">
					<Link to="/room/add" className="btn blue lighten-1 z-depth-0 col s12">
						<div className="col s2"><i className="material-icons left">add_box</i></div>
						<div className="col s8">New room</div>
					</Link>
				</h5>
				<ul className="collapsible">
					{ roomList }
				</ul>
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		rooms: state.room.rooms,
		loggedUser: state.auth.loggedUser,
		loggedIn: state.auth.loggedIn
	}
}

export default connect(mapStateToProps)(RoomList);