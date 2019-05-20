const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const socket = require("socket.io");
const config = require("./config.json");

// set up express app
const app = express();

// ES6 Promises
mongoose.Promise = global.Promise;

// connect to mongodb
mongoose.connect(config.connectionString, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
});

mongoose.connection.once("open", function() {
	console.log("Connection has been made");
}).on("error", function(error) {
	console.log("Connection error", error);
});

// middleware to anable cross site origin requests
app.use(cors({
	origin: "*",//["http://localhost:3000", "http://147e0c21.ngrok.io"],
	methods: ["GET", "PUT", "POST", "DELETE"],
	exposedHeaders: ["x-access-token"],
	preflightContinue: true,
	optionsSuccessStatus: 200
}));

//app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// initialize routes
app.use("/api", require("./routes/roomRoutes"));
app.use("/api", require("./routes/userRoutes"));

// error handling middleware
app.use(function(err, req, res, next) {
	if (err.message === "Unauthrorized Access") {
		res.status(401).send({error: err.message});
	} else {
		res.status(422).send({error: err.message});
	}
});

// listen for requests
const server = app.listen(config.port, function() {
	console.log("Listening on port " + config.port);
});

// Socket setup
/*const io = socket(server);

io.on("connection", function(socket) {
	console.log("made socket connection");

	socket.on("signin", function(data) {
		io.sockets.emit("signin", data);
	});

	socket.on("signout", function(data) {
		io.sockets.emit("signout", data);
	});
});*/