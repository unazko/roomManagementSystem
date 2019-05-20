const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const User = require("../models/user");
const verifyToken = require("../auth/verifyToken");
const config = require("../config.json");

/* room routes */

// master user can add new room
router.post("/rooms", verifyToken, async function(req, res, next) {
	try {
		await User
			.findById(req.userId)
			.where("master")
			.equals(true)
			.orFail(new Error("Unauthrorized Access"));
		const room = await Room.create(req.body);
		user.QRUrl = req.headers.origin + "/room/" + room._id + "/reservation/add";
		const updatedRoom = await room.save();
		res.send(updatedRoom);
	} catch(err) {
		next(err);
	};
});

// master user can edit a room
router.put("/rooms/:id", verifyToken, async function(req, res, next) {
	try {
		await User
			.findById(req.userId)
			.where("master")
			.equals(true)
			.orFail(new Error("Unauthrorized Access"));
		await Room.findByIdAndUpdate(req.params.id, req.body);
		const updatedRoom = await Room.findById(req.params.id);
		res.send(updatedRoom);
	} catch(err) {
		next(err);
	};
});

// master user and user can serach for rooms by specific cryteria
router.get("/rooms", verifyToken, async function(req, res, next) {
	try {
		const roomsQuery = Room.find({});
		Object.keys(req.query).forEach(function(queryParam) {
			roomsQuery.where(queryParam).equals(req.query[queryParam]);
		});
		const rooms = await roomsQuery.exec();
		res.send(rooms);
	} catch(err) {
		next(err);
	}
});

// master user can delete a room
router.delete("/rooms/:id", verifyToken ,async function(req, res, next) {
	try {
		await User
			.findById(req.userId)
			.where("master")
			.equals(true)
			.orFail(new Error("Unauthrorized Access"));
		const room = await Room.findByIdAndDelete(req.params.id);
		res.send(room);
	} catch(err) {
		next(err);
	}
});

/* reservation routes */

// user can add a reservation
router.post("/rooms/:id/reservations", verifyToken, async function(req, res, next) {
	try {
		const loggedUser = await User
			.findById(req.userId)
			.where("master")
			.equals(false)
			.orFail(new Error("Unauthrorized Access"));

		const room = await Room.findById(req.params.id);
		const startDate = req.body.startDate ? new Date(req.body.startDate) : new Date();
		const endDate = new Date(startDate);
		endDate.setHours(startDate.getHours() + parseInt(req.body.duration));

		// check if the room is available at that time
		const aggregatedRoomsAtTime = await Room.aggregate([
			{ $unwind: "$reservations" },
			{ $match: {
				"_id": room._id,
				"reservations.startDate": { $lte: endDate },
				"reservations.endDate": { $gte: startDate }
			}
		}]);
		if (aggregatedRoomsAtTime.length > 0) {
			throw new Error("The room is taken at that time");
		}

		// if room available save to database
		room.reservations.push({
			...req.body,
			tracherName: loggedUser.name,
			startDate,
			endDate
		});
		++room.reservationCounter;
		const updatedRoom = await room.save();
		const aggregatedRooms = await Room.aggregate([{ $unwind: "$reservations" }, { $match: {"_id": updatedRoom._id}}]);
		res.send(aggregatedRooms[aggregatedRooms.length - 1]);
	} catch(err) {
		next(err);
	}
});

// user can remove a reservation
router.delete("/rooms/:roomId/reservations/:reservationId", verifyToken, async function(req, res, next) {
	try {
		await User
			.findById(req.userId)
			.where("master")
			.equals(false)
			.orFail(new Error("Unauthrorized Access"));
		const room = await Room.findById(req.params.roomId);
		const reservation = room.reservations.id(req.params.reservationId).remove();
		await room.save()
		res.send(reservation);
	} catch(err) {
		next(err);
	}
});

// user can edit a reservation
router.put("/rooms/:roomId/reservations/:reservationId", verifyToken, async function(req, res, next) {
	try {
		await User
			.findById(req.userId)
			.where("master")
			.equals(false)
			.orFail(new Error("Unauthrorized Access"));
		const room = await Room.findById(req.params.roomId);
		const reservation = room.reservations.id(req.params.reservationId);
		reservation.set(req.body);
		const updateRoom = await room.save();

		const aggregatedRooms = await Room.aggregate([{ $unwind: "$reservations" }, { $match: { "_id": updateRoom._id}}]);
		const agregatedReservation = aggregatedRooms.filter(function(room) {
			return room.reservations._id.toString() === req.params.reservationId;
		}).reduce(function(reservation) {
			return reservation;
		});
		res.send(agregatedReservation);
	} catch(err) {
		next(err);
	}
});

// 1) One QR code per room/ if student scans the code then room info will be shown
// 2) search for reservations
// - by room number
// - by teacher name
// - by discipline
// - by date range

// everyone can see reservatios based on a search cryteria
router.get("/rooms/reservations", async function(req, res, next) {
	try {
		const agregationArray = [{ $unwind: "$reservations" }];
		if (Object.keys(req.query).length) {
			const match = { $match: {}};
			Object.keys(req.query).forEach(function(queryParam) {
				let path = "reservations." + queryParam;
				if (queryParam === "number") {
					match.$match[queryParam] = parseInt(req.query[queryParam], 10);
				} else if (queryParam === "startDate") {
					match.$match[path] = { $gte: new Date(req.query.startDate) };
				} else if (queryParam === "endDate") {
					match.$match[path] = { $lte: new Date(req.query.endDate) };
				} else {
					match.$match[path] = new RegExp(req.query[queryParam], "i");
				}
			});
			agregationArray.push(match);
		}
		const rooms = await Room.aggregate(agregationArray);
		res.send(rooms);
	} catch(err) {
		next(err);
	}
});

// everyone can scan the room QR code and see the reservations for that room
// if teacher scans the room then there will be additional tab in the page
// from which the room can be booked by setting a reservation period and discipline
router.get("/rooms/:roomId/reservations", async function(req, res, next) {
	try {
		const room = await Room.findById(req.params.roomId);
		res.send(room.reservations);
	} catch(err) {
		next(err);
	}
});

// 3) Chart showing most popular rooms,
// Used to draw bar chart representing room poplularity
// top 10 of the most frequently reserved rooms
router.get("/rooms/chart", async function(req, res, next) {
	try {
		const rooms = await Room.find({})
			.limit(config.chartRoomLimit)
			.sort("-reservationCounter")
			.exec()
		res.send(rooms);
	} catch(err) {
		next(err);
	}
});

module.exports = router;