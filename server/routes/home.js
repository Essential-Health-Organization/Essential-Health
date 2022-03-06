const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// by passing through the authorization we are able to accesss the request id user object to access
// the users id information
router.get("/", authorization, async (req, res) => {
	try {
		const user = await pool.query(
			"SELECT username FROM login_credentials WHERE user_id=$1",
			[req.user]
		);
		res.json(user.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).json("Server Error");
	}
});

module.exports = router;
