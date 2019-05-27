const initState = {
	users: {},
	error: null
};

const userReducer = (state = initState, action) => {
	switch (action.type) {
		case "CREATE_USER": {
			console.log("Create user.");
			return {
				...state,
				users: {
					...state.users,
					[action.user._id]: action.user
				},
				error: null
			}
		}
		case "CREATE_USER_ERROR": {
			console.log("Create user error");
			return {
				...state,
				error: action.error
			};
		}
		case "GET_USERS": {
			console.log("Get users.");
			const newUsers = action.users.length > 0 ?
				action.users.reduce((obj, user) => {
				obj[user._id] = user;
				return obj;
			}, {}) : {};
			return {
				...state,
				users: newUsers,
				error: null
			};
		}
		case "GET_USERS_ERROR": {
			console.log("Get users error.");
			return {
				...state,
				error: action.error
			};
		}
		case "DELETE_USER": {
			console.log("Delete user.");
			const updatedUsers = Object.keys(state.users)
			.filter(userId => userId !== action.user._id)
			.reduce((obj, userId) => {
				obj[userId] = state.users[userId];
				return obj;
			}, {});
			return {
				...state,
				users: updatedUsers,
				error: null
			};
		}
		case "DELETE_USER_ERROR": {
			console.log("Delete user error");
			return {
				...state,
				error: action.error
			};
		}
		case "UPDATE_USER": {
			console.log("Update user.");
			const updatedUsers = Object.keys(state.users)
			.filter(userId => userId !== action.user._id)
			.reduce((obj, userId) => {
				obj[userId] = state.users[userId];
				return obj;
			}, {});
			return {
				...state,
				users: {
					...updatedUsers,
					[action.user._id]: action.user
				},
				error: null
			};
		}
		case "UPDATE_USER_ERROR": {
			console.log("Update user error.");
			return {
				...state,
				error: action.error
			};
		}
		default:
			return state;
	}
}

export default userReducer;