const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const verifyToken = require("../auth/verifyToken");

// add new user to the database
router.post("/users", verifyToken, async function(req, res, next) {
	try {
		await User
			.findById(req.userId)
			.where("master")
			.equals(true)
			.orFail(new Error("Unauthrorized Access"));
		const user = await User.create(req.body);
		user.QRUrl = req.headers.origin + "/password/" + user._id;
		const updatedUser = await user.save();
		res.send(updatedUser);
	} catch(err) {
		next(err);
	};
});

// initial signin, not token protected path, password must be changed by scanning the QR code
router.post("/users/:id", async function(req, res, next) {
	try {
		const user = await User.findById(req.params.id).
			orFail(new Error("That QR code is't used anymore"));

		if (user.signedin) {
			const { passwordHash, ...userWithoutHash } = user.toObject();
			res.send(userWithoutHash);
		} else {
			if (user.passwordHash) {
				throw new Error("You have already changed your password");
			}
			if (req.body.password === req.body.retypePassword) {
				const hash = bcrypt.hashSync(req.body.password, 10);
				user.passwordHash = hash;
				user.signedin = true;
				const updatedUser = await user.save();
				const token = jwt.sign({_id: updatedUser.id}, config.secret);
				const { passwordHash, ...userWithoutHash } = updatedUser.toObject();
				res.send({
					...userWithoutHash,
					token
				});
			} else {
				throw new Error("Passwords must match");
			}
		}
	} catch(err) {
		next(err);
	}
});

// signin with a user
router.post("/signin", async function(req, res, next) {
	try {
		const user = await User.findOne({email: req.body.email})
			.orFail(new Error("Account on that email doesn't exist yet"));

		if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
			user.signedin = true;
			user.lastSeen = undefined;
			const updatedUser = await user.save();
			const token = jwt.sign({_id: updatedUser.id}, config.secret);
			const { passwordHash, ...userWithoutHash } = updatedUser.toObject();
			res.send({
				...userWithoutHash,
				token
			});
		} else {
			throw new Error("Unauthrorized Access");
		}
	} catch(err) {
		next(err);
	}
});

// signout request from the front end
router.get("/signout", verifyToken, async function(req, res, next) {
	try {
		await User.findByIdAndUpdate(req.userId, {signedin: false, lastSeen: new Date()})
					.orFail(new Error("You must sign in first"));;
		const user = await User.findById(req.userId);
		const { passwordHash, ...userWithoutHash } = user.toObject();
		res.send(userWithoutHash);
	} catch(err) {
		next(err);
	}
});

// get list of users from the databse
router.get("/users", async function(req, res, next) {
	try {
		const usersQuery = User.find({});
		Object.keys(req.query).forEach(function(queryParam) {
			usersQuery.where(queryParam).equals(new RegExp(req.query[queryParam], "i"));
		});
		const users = await usersQuery.exec();
		const usersWithoutHash = [];
		users.forEach(function(user) {
			const { passwordHash, ...userWithoutHash } = user.toObject();
			usersWithoutHash.push(userWithoutHash);
		}); 
		res.send(usersWithoutHash);
	} catch(err) {
		next(err);
	}
});


// update a user in the database
router.put("/users/:id", verifyToken, async function(req, res, next) {
	try {
		await User
			.findById(req.userId)
			.where("master")
			.equals(true)
			.orFail(new Error("Unauthrorized Access"));
		await User.findByIdAndUpdate(req.params.id, req.body);
		const updatedUser = await User.findById(req.params.id);
		const { passwordHash, ...userWithoutHash } = updatedUser.toObject();
		res.send(userWithoutHash);
	} catch(err) {
		next(err);
	}
});

// delete a user from the database
router.delete("/users/:id", verifyToken, async function(req, res, next) {
	try {
		await User
			.findById(req.userId)
			.where("master")
			.equals(true)
			.orFail(new Error("Unauthrorized Access"));
		const user = await User.findByIdAndDelete(req.params.id);
		const { passwordHash, ...userWithoutHash } = user.toObject();
		res.send(userWithoutHash);
	} catch(err) {
		next(err);
	}
});

// sockets could be used to emit a message to be used as an action by redux
// to update the clients templtes instantly
// The message could cotain
// action -> BOOK_ROOM
// object { roomNumber: 123, teacherId: 123}

module.exports = router;