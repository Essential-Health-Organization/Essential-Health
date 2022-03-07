const router = require("express").Router();
const pool = require("../db");

router.get("/:insperational_message_id", async (req, res) => {
	try {
		const getOneMessage = await pool.query(
			"SELECT * FROM insperational_messages  WHERE insperational_message_id = $1",
			[req.params.insperational_message_id]
		);
		// console.log(getOneMessage.rows[0]);
		// console.log(req);
		res.status(200).json({
			// to send a good status
			status: "success", // of success
			data: {
				message: getOneMessage.rows[0],
			},
		});
	} catch (err) {
		console.error(err.message);
	}
});

module.exports = router;
