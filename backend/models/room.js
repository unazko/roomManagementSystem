const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create roomBooking Schema
const ReservationSchema = new Schema({
	teacherName: {
		type: String
	},
	discipline: {
		type: String,
		required: [true, "discipline field is required"]
	},
	startDate: {
		type: Date
	},
	endDate: {
		type: Date,
		required: [true, "endDate field is required"]
	},
	duration: {
		type: Number,
		min: 1,
		max: 6,
		required: [true, "duration field is required"]
	}
});

// create room Schema & model
const RoomSchema = new Schema({
	number: {
		type: Number,
		required: [true, "Room number field is required"],
		unique: true
	},
	QRUrl: {
		type: String
	},
	hasProector: {
		type: Boolean,
		default: false
	},
	isComputerRoom: {
		type: Boolean,
		default: false
	},
	isAvailable: {
		type: Boolean,
		default: false
	},
	reservationCounter: {
		type: Number,
		default: 0
	},
	reservations: [ReservationSchema]
});

const Room = mongoose.model("room", RoomSchema);

module.exports = Room;