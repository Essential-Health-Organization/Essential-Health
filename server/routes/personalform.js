const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
// insert user info
router.post("/:user_id", async (req, res) => {
	//console.log("Request Data:", req.data);
	try {
		const result = await pool.query(
			"INSERT INTO personal_info (user_id,first_name,last_name,pronoun,occupation,phone_number,city,state,zip) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING * ",
			[
				req.params.user_id,
				req.body.first_name,
				req.body.last_name,
				req.body.pronoun,
				req.body.occupation,
				req.body.phone_number,
				req.body.city,
				req.body.state,
				req.body.zip,
			]
		);
		console.log(req.body);
		res.status(201).json({
			status: "success",
			data: {
				personal_information: result.rows[0], //this gets the one row we need
			},
		});
	} catch (err) {
		console.error(err.message);
	}
});
//update user info
router.put("/update/:userId", async (req, res) => {
	console.log("Request Data:", req.body);
	try {
		const result = await pool.query(
			"UPDATE personal_info SET first_name=$1,last_name=$2,pronoun=$3,occupation=$4,phone_number=$5,city=$6,state=$7,zip=$8 WHERE user_id = $9 RETURNING * ",
			[
				req.body.firstName,
				req.body.lastName,
				req.body.pronoun,
				req.body.occupation,
				req.body.phoneNumber,
				req.body.city,
				req.body.state,
				req.body.zip,
				req.params.userId,
			]
		);
		console.log("New Row:", result.rows[0]);
		res.status(200).json({
			status: "success",
			data: {
				personal_information: result.rows[0], //this gets the one row we need
			},
		});
	} catch (err) {
		console.error("Error:", err.message);
	}
});
//get back user info
router.get("/getting/:user_id", async (req, res) => {
	try {
		const result = await pool.query(
			"SELECT * FROM personal_info WHERE user_id=$1 ",
			[req.params.user_id]
		);
		console.log(req.params);
		res.status(200).json({
			status: "success",
			data: {
				personal_information: result.rows[0], //this gets the one row we need
			},
		});
	} catch (err) {
		console.error(err.message);
	}
});
module.exports = router;

// const router = require("express").Router();
// const pool = require("../db");
// const authorization = require("../middleware/authorization");

// router.get("/getting/:user_id", authorization, async (req, res) => {
// 	try {
// 		const result = await pool.query(
// 			"SELECT * FROM personal_info WHERE user_id=$1 ",
// 			[req.params.user_id]
// 		);

// 		console.log(req.params);

// 		res.status(200).json({
// 			status: "success",
// 			data: {
// 				personal_information: result.rows[0], //this gets the one row we need
// 			},
// 		});
// 	} catch (err) {
// 		console.error(err.message);
// 	}
// });

// router.post("/:user_id", authorization, async (req, res) => {
// 	try {
// 		const result = await pool.query(
// 			"INSERT INTO personal_info (user_id,first_name,last_name,pronoun,occupation,phone_number,city,state,zip) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING * ",
// 			[
// 				req.params.user_id,
// 				req.body.first_name,
// 				req.body.last_name,
// 				req.body.pronoun,
// 				req.body.occupation,
// 				req.body.phone_number,
// 				req.body.city,
// 				req.body.state,
// 				req.body.zip,
// 			]
// 		);

// 		console.log(req.body);

// 		res.status(201).json({
// 			status: "success",
// 			data: {
// 				personal_information: result.rows[0], //this gets the one row we need
// 			},
// 		});
// 	} catch (err) {
// 		console.error(err.message);
// 	}
// });

// //THIS ONE IS ALREADY COMMENTED IT
// // router.put("/update/:user_id", authorization, async (req, res) => {
// // 	try {
// // 		const result = await pool.query(
// // 			"UPDATE personal_info SET first_name=$1,last_name=$2,pronoun=$3,occupation=$4,phone_number=$5,city=$6,state=$7,zip=$8 WHERE user_id = $9 RETURNING * ",
// // 			[
// // 				req.body.first_name,
// // 				req.body.last_name,
// // 				req.body.pronoun,
// // 				req.body.occupation,
// // 				req.body.phone_number,
// // 				req.body.city,
// // 				req.body.state,
// // 				req.body.zip,
// // 				req.params.user_id,
// // 			]
// // 		);

// // 		console.log(req.body);

// // 		res.status(200).json({
// // 			status: "success",
// // 			data: {
// // 				personal_information: result.rows[0], //this gets the one row we need
// // 			},
// // 		});
// // 	} catch (err) {
// // 		console.error(err.message);
// // 	}
// // });
// router.put("/update/:userId", authorization, async (req, res) => {
// 	console.log("Request Data:", req.body);

// 	try {
// 		const result = await pool.query(
// 			"UPDATE personal_info SET first_name=$1,last_name=$2,pronoun=$3,occupation=$4,phone_number=$5,city=$6,state=$7,zip=$8 WHERE user_id = $9 RETURNING * ",
// 			[
// 				req.body.firstName,
// 				req.body.lastName,
// 				req.body.pronoun,
// 				req.body.occupation,
// 				req.body.phoneNumber,
// 				req.body.city,
// 				req.body.state,
// 				req.body.zip,
// 				req.params.userId,
// 			]
// 		);

// 		console.log("New Row:", result.rows[0]);

// 		res.status(200).json({
// 			status: "success",
// 			data: {
// 				personal_information: result.rows[0], //this gets the one row we need
// 			},
// 		});
// 	} catch (err) {
// 		console.error("Error:", err.message);
// 	}
// });

// //THIS ONE IS ALREADY COMMENETED
// // router.get("/getting/:user_id", authorization, async (req, res) => {
// // 	try {
// // 		const result = await pool.query(
// // 			"SELECT * FROM personal_info WHERE user_id=$1 ",
// // 			[req.params.user_id]
// // 		);

// // 		console.log(req.params);

// // 		res.status(200).json({
// // 			status: "success",
// // 			data: {
// // 				personal_information: result.rows[0], //this gets the one row we need
// // 			},
// // 		});
// // 	} catch (err) {
// // 		console.error(err.message);
// // 	}
// // });

// module.exports = router;
