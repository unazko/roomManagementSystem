const loggedUser = JSON.parse(localStorage.getItem("user"));

const initState = loggedUser ? {
	loggedIn: true,
	authError: null,
	loggedUser
} : {};

const authReducer = (state = initState, action) => {
	switch(action.type) {
		case "LOGIN_SUCCESS":
			console.log("login success");
			return {
				...state,
				loggedIn: true,
				loggedUser: action.loggedUser,
				authError: null
			}

		case "LOGIN_ERROR":
			console.log("login error");
			return {
				...state,
				loggedIn: false,
				authError: action.authError
			}
		
		case "SIGNOUT_SUCCESS":
			console.log("signout success");
			return {
				...state,
				loggedIn: false,
				authError: null
			}
		
		case "SIGNOUT_ERROR":
			console.log("signout error");
			return {
				...state,
				loggedIn: true,
				authError: action.authError
			}
		default:
			return state;
	}
}

export default authReducer;