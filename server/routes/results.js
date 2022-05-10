const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/occ", authorization, async (req, res) => {
	try {
		console.log(req);
		const result = await pool.query(
			// "SELECT occupation,COUNT(occupation) FROM resources GROUP BY occupation;",

			"SELECT occupation,COUNT(occupation) as values FROM resources GROUP BY occupation"
		);

		console.log(req);
		console.log(result);
		res.status(200).json({
			status: "success",
			data: {
				occupationResults: result.rows, //this gets the one row we need
			},
		});
	} catch (err) {
		console.error(err.message);
	}
});

router.get("/:user_id", authorization, async (req, res) => {
	try {
		const result = await pool.query(
			// "SELECT * FROM resources INNER JOIN personal_info on resources.state=personal_info.state AND resources.occupation=personal_info.occupation WHERE user_id= $1;",

			"SELECT * FROM resources left join (select resource_id, count(*),trunc(avg(rating),1) as average_rating from reviews group by resource_id) reviews on resources.resource_id = reviews.resource_id LEFT JOIN personal_info on resources.state=personal_info.state AND resources.occupation=personal_info.occupation WHERE user_id=$1;",
			[req.params.user_id]
		);

		console.log("This is getting occupation", req.params);

		res.status(200).json({
			status: "success",
			data: {
				resource_information: result.rows, //this gets the one row we need
			},
		});
	} catch (err) {
		console.error(err.message);
	}
});

module.exports = router;
