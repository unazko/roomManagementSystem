import config from "../../config";
import axios from "axios";

export const createUser = (user) => {
	return (dispatch, getState) => {
		const loggedUser = JSON.parse(localStorage.getItem("user"));
		axios({
			method: "POST",
			url: config.apiURL + "/users",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": loggedUser && loggedUser.token ? loggedUser.token : ""
			},
			data: user,
			responseType: "json"
		})
		.then(({ data }) => {
			dispatch({type: "CREATE_USER", user: data});
		})
		.catch(error => {
			dispatch({type: "CREATE_USER_ERROR", error});
		});
	}
}

export const getUsers = (email, name) => {
	const queryParamEmail = email ? email : "";
	const queryParamName = name ? name : "";
	const url = `${config.apiURL}/users?email=${queryParamEmail}&name=${queryParamName}`;
	console.log(url);
	return (dispatch, getState) => {
		axios({
			method: "GET",
			url: url,
			headers: {
				"Content-Type": "application/json"
			},
			responseType: "json"
		})
		.then(({ data }) => {
			dispatch({type: "GET_USERS", users: data});
		})
		.catch(error => {
			dispatch({type: "GET_USERS_ERROR", error});
		});
	}
}

export const deleteUser = (userId) => {
	return (dispatch, getState) => {
		const loggedUser = JSON.parse(localStorage.getItem("user"));
		axios({
			method: "DELETE",
			url: config.apiURL + "/users/" + userId,
			headers: {
				"Content-Type": "application/json",
				"x-access-token": loggedUser && loggedUser.token ? loggedUser.token : ""
			},
			responseType: "json"
		})
		.then(({ data }) => {
			dispatch({type: "DELETE_USER", user: data});
		})
		.catch(error => {
			dispatch({type: "DELETE_USER_ERROR", error});
		});
	}
}

export const updateUser = (userId, user) => {
	return (dispatch, getState) => {
		const loggedUser = JSON.parse(localStorage.getItem("user"));
		axios({
			method: "PUT",
			url: config.apiURL + "/users/" + userId,
			headers: {
				"Content-Type": "application/json",
				"x-access-token": loggedUser && loggedUser.token ? loggedUser.token : ""
			},
			data: user,
			responseType: "json"
		})
		.then(({ data }) => {
			dispatch({type: "UPDATE_USER", user: data});
		})
		.catch(error => {
			dispatch({type: "UPDATE_USER_ERROR", error});
		});
	}
}