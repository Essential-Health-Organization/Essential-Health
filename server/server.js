require("dotenv").config();
const express = require("express"); // required to talk to the db
const morgan = require("morgan");
const app = express();
const cors = require("cors");
//connecting to db
const db = require("./db");

// git pull origin main or branch name

app.use(morgan("dev"));
const port = process.env.PORT || 3001;
// const jwt_key = process.env.JWT_KEY;

//middleware
app.use(cors());
app.use(express.json());

// ROUTES
//get one message // this is one route to get one message

// insperational_messages route good
app.get("/api/v1/message/:insperational_message_id", async (req, res) => {
	try {
		const getOneMessage = await db.query(
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

// login good,
// insert into
app.post("/api/v1/SignUp", async (req, res) => {
	try {
		const result = await db.query(
			"INSERT INTO login_credentials (username,email,password) VALUES($1,$2,$3) RETURNING *",
			[req.body.username, req.body.email, req.body.password]
		);
		console.log(req.body);

		res.status(201).json({
			status: "success",
			data: {
				login: result.rows[0], //this gets the one row we need
			},
		});
	} catch (err) {
		console.error(err.message);
	}
});

//good
//to get a user, maybe will change  to post later on, we need to implement validation g
// app.get("/api/v1/Login", async (req, res) => {
// 	try {
// 		const result = await db.query(
// 			`SELECT email,password FROM login_credentials WHERE email = '${req.body.email}'`
// 		);

// 		console.log(req.body);

// 		// console.log(result.rows[0]);
// 		res.status(201).json({
// 			status: "success",
// 			data: {
// 				login: result.rows[0], //this gets the one row we need
// 			},
// 		});
// 	} catch (err) {
// 		console.error(err.message);
// 	}
// });

//good
// Insert into personal info table,need to fix vulnerability risk
//login credential = 2 medical info = 4
app.post("/api/v1/PForm/:username", async (req, res) => {
	try {
		const result = await db.query(
			"INSERT INTO personal_info (username,first_name,last_name,pronoun,area_of_expertise,phone_number,city,state,zip) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING * ",
			[
				req.params.username,
				req.body.first_name,
				req.body.last_name,
				req.body.pronoun,
				req.body.area_of_expertise,
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

// updating user information
// '${req.body.email}'

app.put("/api/v1/PForm/:username", async (req, res) => {
	try {
		const result = await db.query(
			"UPDATE personal_info SET first_name=$1,last_name=$2,pronoun=$3,area_of_expertise=$4,phone_number=$5,city=$6,state=$7,zip=$8 WHERE username=$9 RETURNING * ",
			[
				req.params.username,
				req.body.first_name,
				req.body.last_name,
				req.body.pronoun,
				req.body.area_of_expertise,
				req.body.phone_number,
				req.body.city,
				req.body.state,
				req.body.zip,
			]
		);

		console.log(req.body);

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

// geting personal information
app.get("/api/v1/PForm/:personal_info_id", async (req, res) => {
	try {
		const result = await db.query(
			"SELECT * FROM personal_info WHERE personal_info_id=$1 ",
			[req.params.personal_info_id]
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

// inserting into medical information
app.post("/api/v1/MForm/:login_credential_id_fk", async (req, res) => {
	try {
		const result = await db.query(
			"INSERT INTO medical_info (any_medication,medication_description,insurance) VALUES($1,$2,$3) RETURNING * ",
			[
				req.params.login_credential_id_fk,
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

// updating the medical information
app.put("/api/v1/MForm/", async (req, res) => {
	try {
		const result = await db.query(
			"UPDATE medical_info SET any_medication = $1, medication_description = $2, insurance = $3 WHERE medical_info_id = $4 RETURNING * ",
			[
				req.body.any_medication,
				req.body.medication_description,
				req.body.insurance,
				req.body.medical_info_id,
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

// inserting into medical information
app.get("/api/v1/MForm/:medical_info_id", async (req, res) => {
	try {
		const result = await db.query(
			"SELECT * FROM medical_info WHERE medical_info_id=$1 ",
			[req.params.medical_info_id]
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

// getting the resources

app.get("/api/v1/Res/:resource_id", async (req, res) => {
	try {
		const result = await db.query(
			"SELECT * FROM resources WHERE resource_id=$1 ",
			[req.params.resource_id]
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

app.listen(port, () => {
	console.log(`the server is up ${port}`);
});
