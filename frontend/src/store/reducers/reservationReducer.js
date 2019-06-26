const initState = {
	reservations: {},
	error: null
};

const reservationReducer = (state = initState, action) => {
	switch (action.type) {
		case "ADD_RESERVATION": {
			console.log("Add reservation.");
			return {
				...state,
				reservations: {
					...state.reservations,
					[action.roomReservation.reservations._id]: action.roomReservation
				},
				error: null
			};
		}
		case "ADD_RESERVATION_ERROR": {
			console.log("Add reservation error.");
			return {
				...state,
				error: action.error
			};
		}
		case "GET_RESERVATIONS": {
			console.log("Get reservations.");
			const newReservations = action.roomReservations.length > 0 ?
				action.roomReservations.reduce((obj, roomReservation) => {
				obj[roomReservation.reservations._id] = roomReservation;
				return obj;
			}, {}) : {};
			return {
				...state,
				reservations: newReservations,
				error: null
			};
		}
		case "GET_RESERVATIONS_ERROR": {
			console.log("Get reservations error.");
			return {
				...state,
				error: action.error
			};
		}
		case "DELETE_RESERVATION": {
			console.log("Delete reservation.");
			const updatedReservations = Object.keys(state.reservations)
			.filter(reservationId => reservationId !== action.reservation._id)
			.reduce((obj, reservationId) => {
				obj[reservationId] = state.reservations[reservationId];
				return obj;
			}, {});
			return {
				...state,
				reservations: updatedReservations,
				error: null
			};
		}
		case "DELETE_RESERVATION_ERROR": {
			console.log("Delete reservation error.");
			return {
				...state,
				error: action.error
			};
		}
		case "UPDATE_RESERVATION": {
			console.log("Update reservation");
			const updatedReservations = Object.keys(state.reservations)
			.filter(reservationId => reservationId !== action.roomReservation.reservations._id)
			.reduce((obj, reservationId) => {
				obj[reservationId] = state.reservations[reservationId];
				return obj;
			}, {});
			return {
				...state,
				reservations: {
					...updatedReservations,
					[action.roomReservation.reservations._id]: action.roomReservation
				},
				error: null
			};
		}
		case "UPDATE_RESERVATION_ERROR": {
			console.log("Update reservation error.");
			return {
				...state,
				error: action.error
			};
		}
		default:
			return state;
	}
}

export default reservationReducer;