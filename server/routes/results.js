const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization")

router.get("/:user_id",authorization, async (req, res) => {
	try {
		const result = await pool.query(
			"SELECT * FROM resources INNER JOIN personal_info on resources.state=personal_info.state WHERE user_id= $1;",
			[req.params.user_id]
		);

		console.log(req.params);

		res.status(200).json({
			status: "success",
			data: {
				resource_information: result.rows[0], //this gets the one row we need
			},
		});
	} catch (err) {
		console.error(err.message);
	}
});
module.exports = router;