const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
router.post("/reviews/:resource", authorization, async (req, res) => {
	try {
		const result = await pool.query(
			"INSERT INTO reviews (resource_id,name,review,rating) VALUES ($1,$2,$3,$4) RETURNING *",
			[req.params.resource_id, req.body.name, req.body.review, req.body.rating]
		);
		console.log(req.body);
		res.status(200).json({
			status: "success",
			data: {
				review_information: result.rows[0], //this gets the one row we need
			},
		});
	} catch (err) {
		console.error(err.message);
	}
});
router.get("/Getreviews/:resource_id", authorization, async (req, res) => {
	try {
		// "SELECT * FROM reviews WHERE resource_id = $1";

		const result = await pool.query(
			"SELECT * FROM reviews left join(select resource_id, count(*),trunc(avg(rating),1) as average_rating from reviews group by resource_id) resource on resource.resource_id = reviews.resource_id WHERE reviews.resource_id = $1;",
			[
				// req.params.id,
				// req.body.name,
				req.params.resource_id,
				// req.body.review,
				// req.body.rating,
			]
		);
		console.log("This is the review console log", req.params);
		res.status(200).json({
			status: "success",
			data: {
				review_information: result.rows, //this gets the one row we need
			},
		});
	} catch (err) {
		console.error(err.message);
	}
});
module.exports = router;
