import config from "../../config";
import axios from "axios";

export const createRoom = (room) => {
	console.log("ACTION", room)
	return (dispatch, getState) => {
		const loggedUser = JSON.parse(localStorage.getItem("user"));
		axios({
			method: "POST",
			url: config.apiURL + "/rooms",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": loggedUser && loggedUser.token ? loggedUser.token : ""
			},
			data: room,
			responseType: "json"
		})
		.then(({ data }) => {
			dispatch({type: "CREATE_ROOM", room: data});
		})
		.catch(error => {
			dispatch({type: "CREATE_ROOM_ERROR", error});
		});
	}
}

export const getRooms = (number, isComputerRoom, hasProector) => {
	const allowed = [true, false];
	const numberParam = number ? `number=${number}` : "";
	const computerParam = allowed.includes(isComputerRoom) ?
						 `isComputerRoom=${isComputerRoom.toString()}` : "";
	const proectorParam = allowed.includes(hasProector) ?
						 `hasProector=${hasProector.toString()}` : "";
	const url = `${config.apiURL}/rooms?${numberParam}&${computerParam}&${proectorParam}`;
	console.log(url);
	return (dispatch, getState) => {
		const loggedUser = JSON.parse(localStorage.getItem("user"));
		axios({
			method: "GET",
			url: url,
			headers: {
				"Content-Type": "application/json",
				"x-access-token": loggedUser && loggedUser.token ? loggedUser.token : ""
			},
			responseType: "json"
		})
		.then(({ data }) => {
			dispatch({type: "GET_ROOMS", rooms: data});
		})
		.catch(error => {
			dispatch({type: "GET_ROOMS_ERROR", error});
		});
	}
}

export const deleteRoom = (roomId) => {
	return (dispatch, getState) => {
		const loggedUser = JSON.parse(localStorage.getItem("user"));
		axios({
			method: "DELETE",
			url: config.apiURL + "/rooms/" + roomId,
			headers: {
				"Content-Type": "application/json",
				"x-access-token": loggedUser && loggedUser.token ? loggedUser.token : ""
			},
			responseType: "json"
		})
		.then(({ data }) => {
			dispatch({type: "DELETE_ROOM", room: data});
		})
		.catch(error => {
			dispatch({type: "DELETE_ROOM_ERROR", error});
		});
	}
}

export const updateRoom = (roomId, room) => {
	return (dispatch, getState) => {
		const loggedUser = JSON.parse(localStorage.getItem("user"));
		axios({
			method: "PUT",
			url: config.apiURL + "/rooms/" + roomId,
			headers: {
				"Content-Type": "application/json",
				"x-access-token": loggedUser && loggedUser.token ? loggedUser.token : ""
			},
			data: room,
			responseType: "json"
		})
		.then(({ data }) => {
			dispatch({type: "UPDATE_ROOM", room: data});
		})
		.catch(error => {
			dispatch({type: "UPDATE_ROOM_ERROR", error});
		});
	}
}