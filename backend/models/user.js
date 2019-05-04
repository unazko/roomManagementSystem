const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create user Schema & model
const UserSchema = new Schema({
	email: {
		type: String,
		required: [true, "Email field is required"],
		unique: true
	},
	passwordHash: {
		type: String,
		default: ""
	},
	QRUrl: {
		type: String
	},
	name: {
		type: String,
		default: ""
	},
	disciplines: {
		type: [String],
		default: []
	},
	master: {
		type: Boolean,
		default: false
	},
	signedin: {
		type: Boolean,
		default: false
	},
	lastSeen: {
		type: Date
	}
});

const User = mongoose.model("user", UserSchema);

module.exports = User;