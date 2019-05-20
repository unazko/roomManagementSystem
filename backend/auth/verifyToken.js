const jwt = require("jsonwebtoken");
const config = require("../config.json");

// auth middleware
const verifyToken = function (req, res, next) {
	var token = req.headers['x-access-token'];
	if (!token) {
		res.status(403).send({ auth: false, message: 'No token provided.'});
	}
	jwt.verify(token, config.secret, function(err, decoded) {
		if (err) {
			res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
		}
		// if everything is good, save to request for use in other routes
		req.userId = decoded._id;
		next();
	});
}

module.exports = verifyToken;