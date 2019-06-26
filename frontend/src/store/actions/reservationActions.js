import config from "../../config";
import axios from "axios";

export const addReservation = (roomId, reservation) => {
	return (dispatch, getState) => {
		const loggedUser = JSON.parse(localStorage.getItem("user"));
		axios({
			method: "POST",
			url: config.apiURL + "/rooms/" + roomId + "/reservations",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": loggedUser && loggedUser.token ? loggedUser.token : ""
			},
			data: reservation,
			responseType: "json"
		})
		.then(({ data }) => {
			dispatch({type: "ADD_RESERVATION", roomReservation: data});
		})
		.catch(error => {
			console.log("ADD_RESERVATION_ACTION", error);
			dispatch({type: "ADD_RESERVATION_ERROR", error});
		});
	}
}

export const getReservations = (queryObject) => {
	const queryString = queryObject ? Object.keys(queryObject).map(key => {
		return queryObject[key] ? `${key}=${queryObject[key]}&` : "";
	}).join("") : "";
	return (dispatch, getState) => {
		axios({
			method: "GET",
			url: `${config.apiURL}/rooms/reservations?${queryString}`,
			headers: {
				"Content-Type": "application/json",
			},
			responseType: "json"
		})
		.then(({ data }) => {
			dispatch({type: "GET_RESERVATIONS", roomReservations: data});
		})
		.catch(error => {
			dispatch({type: "GET_RESERVATIONS_ERROR", error});
		});
	}
}

export const deleteReservation = (roomId, reservationId) => {
	return (dispatch, getState) => {
		const loggedUser = JSON.parse(localStorage.getItem("user"));
		axios({
			method: "DELETE",
			url: config.apiURL + "/rooms/" + roomId +"/reservations/" + reservationId,
			headers: {
				"Content-Type": "application/json",
				"x-access-token": loggedUser && loggedUser.token ? loggedUser.token : ""
			},
			responseType: "json"
		})
		.then(({ data }) => {
			dispatch({type: "DELETE_RESERVATION", reservation: data});
		})
		.catch(error => {
			dispatch({type: "DELETE_RESERVATION_ERROR", error});
		});
	}
}

export const updateReservation = (roomId, reservationId, reservation) => {
	return (dispatch, getState) => {
		const loggedUser = JSON.parse(localStorage.getItem("user"));
		axios({
			method: "PUT",
			url: config.apiURL + "/rooms/" + roomId +"/reservations/" + reservationId,
			headers: {
				"Content-Type": "application/json",
				"x-access-token": loggedUser && loggedUser.token ? loggedUser.token : ""
			},
			data: reservation,
			responseType: "json"
		})
		.then(({ data }) => {
			dispatch({type: "UPDATE_RESERVATION", roomReservation: data});
		})
		.catch(error => {
			dispatch({type: "UPDATE_RESERVATION_ERROR", error});
		});
	}
}