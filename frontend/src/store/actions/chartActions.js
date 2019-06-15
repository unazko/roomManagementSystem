import config from "../../config";
import axios from "axios";

export const getPopularRooms = () => {
	return (dispatch, getState) => {
		axios({
			method: "GET",
			url: config.apiURL + "/rooms/chart",
			headers: {
				"Content-Type": "application/json",
			},
			responseType: "json"
		})
		.then(({ data }) => {
			dispatch({type: "POPULAR_ROOMS_SUCCESS", rooms: data});
		})
		.catch(error => {
			dispatch({type: "POPULAR_ROOMS_ERROR", error});
		});
	}
}