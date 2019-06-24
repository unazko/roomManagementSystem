const initState = {
	rooms: {},
	error: null
};

const roomReducer = (state = initState, action) => {
	switch (action.type) {
		case "CREATE_ROOM": {
			console.log("Create room.");
			return {
				...state,
				rooms: {
					...state.rooms,
					[action.room._id]: action.room
				},
				error: null
			}
		}
		case "CREATE_ROOM_ERROR": {
			console.log("Create room error");
			return {
				...state,
				error: action.error
			};
		}
		case "GET_ROOMS": {
			console.log("Get rooms.");
			const newRooms = action.rooms.length > 0 ?
				action.rooms.reduce((obj, room) => {
				obj[room._id] = room;
				return obj;
			}, {}) : {};
			return {
				...state,
				rooms: newRooms,
				error: null
			};
		}
		case "GET_ROOMS_ERROR": {
			console.log("Get rooms error.");
			return {
				...state,
				error: action.error
			};
		}
		case "DELETE_ROOM": {
			console.log("Delete room.");
			const updatedRooms = Object.keys(state.rooms)
			.filter(roomId => roomId !== action.room._id)
			.reduce((obj, roomId) => {
				obj[roomId] = state.rooms[roomId];
				return obj;
			}, {});
			return {
				...state,
				rooms: updatedRooms,
				error: null
			};
		}
		case "DELETE_ROOM_ERROR": {
			console.log("Delete room error");
			return {
				...state,
				error: action.error
			};
		}
		case "UPDATE_ROOM": {
			console.log("Update room.");
			const updatedRooms = Object.keys(state.rooms)
			.filter(roomId => roomId !== action.room._id)
			.reduce((obj, roomId) => {
				obj[roomId] = state.rooms[roomId];
				return obj;
			}, {});
			return {
				...state,
				rooms: {
					...updatedRooms,
					[action.room._id]: action.room
				},
				error: null
			};
		}
		case "UPDATE_ROOM_ERROR": {
			console.log("Update room error.");
			return {
				...state,
				error: action.error
			};
		}
		default:
			return state;
	}
}

export default roomReducer;