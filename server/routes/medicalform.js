const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization")

//insert into medical info
router.post("/:user_id",authorization, async (req, res) => {
	try {
		const result = await pool.query(
			"INSERT INTO medical_info (user_id,any_medication,medication_description,insurance) VALUES($1,$2,$3,$4) RETURNING * ",
			[
				req.params.user_id,
				req.body.any_medication,
				req.body.medication_description,
				req.body.insurance,
			]
		);

		console.log(req.body);

		res.status(201).json({
			status: "success",
			data: {
				medical_information: result.rows[0], //this gets the one row we need
			},
		});
	} catch (err) {
		console.error(err.message);
	}
});

//update medical info
router.put("/update/:user_id",authorization, async (req, res) => {
	try {
		const result = await pool.query(
			"UPDATE medical_info SET any_medication = $1, medication_description = $2, insurance = $3 WHERE user_id = $4 RETURNING * ",
			[
				req.body.any_medication,
				req.body.medication_description,
				req.body.insurance,
				req.params.user_id,
			]
		);

		console.log(req.body);

		res.status(200).json({
			status: "success",
			data: {
				medical_information: result.rows[0], //this gets the one row we need
			},
		});
	} catch (err) {
		console.error(err.message);
	}
});
//get medical info
router.get("/getMform/:user_id",authorization,async (req, res) => {
	try {
		const result = await pool.query(
			"SELECT * FROM medical_info WHERE user_id=$1 ",
			[req.params.user_id]
		);

		console.log(req.params);

		res.status(200).json({
			status: "success",
			data: {
				medical_information: result.rows[0], //this gets the one row we need
			},
		});
	} catch (err) {
		console.error(err.message);
	}
});

module.exports = router;