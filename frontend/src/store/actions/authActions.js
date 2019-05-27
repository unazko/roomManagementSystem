import config from "../../config";
import axios from "axios";

export const signIn = (credentials) => {
	return (dispatch, getState) => {
		axios({
			method: "POST",
			url: config.apiURL + "/signin",
			headers: { "Content-Type": "application/json" },
			data: {
				email: credentials.email,
				password: credentials.password
			},
			responseType: "json"
		})
		.then(({ data }) => {
			localStorage.setItem("user", JSON.stringify(data));
			dispatch({type: "LOGIN_SUCCESS", loggedUser: data});
		})
		.catch(error => {
			console.log("ACTION_LOGIN_ERROR", error);
			dispatch({type: "LOGIN_ERROR", authError: error});
		});
	}
}

export const signOut = () => {
	return (dispatch, getState) => {
		const loggedUser = JSON.parse(localStorage.getItem("user"));
		axios({
			method: "GET",
			url: config.apiURL + "/signout",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": loggedUser && loggedUser.token ? loggedUser.token : ""
			},
			responseType: "json"
		})
		.then(({ data }) => {
			localStorage.removeItem("user");
			dispatch({type: "SIGNOUT_SUCCESS", loggedUser: data});
		})
		.catch(error => {
			dispatch({type: "SIGNOUT_ERROR", authError: error});
		});
	}
}

export const setPassword = (userId, credentials) => {
	return (dispatch, getState) => {
		axios({
			method: "POST",
			url: config.apiURL + "/users/" + userId,
			headers: { "Content-Type": "application/json" },
			data: {
				password: credentials.password,
				email: credentials.retypePassword
			},
			responseType: "json"
		})
		.then(({ data }) => {
			localStorage.setItem("user", JSON.stringify(data));
			dispatch({type: "LOGIN_SUCCESS", loggedUser: data});
		})
		.catch(error => {
			dispatch({type: "LOGIN_SUCCESS_ERROR", authError: error});
		});
	}
}