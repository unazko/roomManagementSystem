import authReducer from "./authReducer";
import reservationReducer from "./reservationReducer";
import roomReducer from "./roomReducer";
import userReducer from "./userReducer";
import chartReducer from "./chartReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
	auth: authReducer,
	reservation: reservationReducer,
	room: roomReducer,
	user: userReducer,
	chart: chartReducer
});

export default rootReducer;