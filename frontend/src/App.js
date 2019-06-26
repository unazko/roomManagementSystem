import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";

import SignIn from "./components/auth/SignIn";
import SetPassword from "./components/auth/SetPassword";

import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import UserDetails from "./components/users/UserDetails";

import AddRoom from "./components/rooms/AddRoom";
import EditRoom from "./components/rooms/EditRoom";
import RoomDetails from "./components/rooms/RoomDetails";

import AddReservation from "./components/reservations/AddReservation";
import ReservationDetails from "./components/reservations/ReservationDetails";

import NoMatch from "./components/noMatch/NoMatch";

import SearchUsers from "./components/users/SearchUsers";
import SearchRooms from "./components/rooms/SearchRooms";
import SearchReservations from "./components/reservations/SearchReservations";

import QRcodeToPdf from "./components/dashboard/QRcodeToPdf";

class App extends Component {
  render() {
    return (
		<BrowserRouter>
			<div className="App">
				<Navbar />
				<Switch>
					<Route exact path="/" component={Dashboard} />
					<Route path="/signin" component={SignIn} />
					<Route path="/password/:id" component={SetPassword} />

					<Route path="/users" component={Dashboard} />
					<Route path="/user/add" component={AddUser} />
					<Route path="/user/update/:id" component={EditUser} />
					<Route path="/user/search" component={SearchUsers} />
					<Route path="/user/:id" component={UserDetails} />

					<Route path="/rooms" component={Dashboard} />
					<Route path="/room/add" component={AddRoom} />
					<Route path="/room/update/:id" component={EditRoom} />
					<Route path="/room/:id/reservation/add" component={AddReservation} />
					<Route path="/room/search" component={SearchRooms} />
					<Route path="/room/:id" component={RoomDetails} />

					<Route path="/reservations" component={Dashboard} />
					<Route path="/reservation/search" component={SearchReservations} />
					<Route path="/reservation/:id" component={ReservationDetails} />

					<Route path="/qrToPpf" component={QRcodeToPdf} />

					<Route component={NoMatch} />
				</Switch>
			</div>
		</BrowserRouter>
    );
  }
}

export default App;
