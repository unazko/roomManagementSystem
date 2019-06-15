const initState = {
	topRooms: [],
	error: null
};

const chartReducer = (state = initState, action) => {
	switch (action.type) {
		case "POPULAR_ROOMS_SUCCESS":
			console.log("get popular rooms success");
			return {
				...state,
				topRooms: action.rooms,
				error: null
			}
		case "POPULAR_ROOMS_ERROR":
			console.log("get popular rooms error");
			return {
				...state,
				error: action.error
			}
		default:
			return state;
	}
}

export default chartReducer;