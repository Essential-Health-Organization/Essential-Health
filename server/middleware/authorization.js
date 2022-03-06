const jwt = require("jsonwebtoken");
require("dotenv").config();

// before it hits routes it's going to get access to the requested
// resonse then if everything ends up working ok, it will continue on
// with the process of next so it can keep going with the routes
module.exports = async (req, res, next) => {
	try {
		const jwtToken = req.header("token");

		if (!jwtToken) {
			return res.status(403).json("Not Authorized");
		}
		// if this is verified it is going to return us a payload that we can use within our routes
		const payload = jwt.verify(jwtToken, process.env.jwtSecret);

		req.user = payload.user;

		next();
	} catch (err) {
		console.error(err.message);
		return res.status(403).json("Not Authorized");
	}
};
