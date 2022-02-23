require("dotenv").config();
const express = require("express"); // required to talk to the db
const morgan = require("morgan");
const app = express();
const cors = require("cors");
//connecting to db
const db = require("./db");

app.use(morgan("dev"));
const port = process.env.PORT || 3001;

//middleware
app.use(cors());
app.use(express.json());

// ROUTES
//get one message // this is one route to get one message

// insperational_messages route
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

// login
// insert into
app.post("/api/v1/SignUp", async (req, res) => {
	try {
		const result = await db.query(
			"INSERT INTO login_credentials (email,username,password) VALUES($1,$2,$3) RETURNING *",
			[req.body.email, req.body.username, req.body.password]
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
//to get a user
app.get("/api/v1/Login/:login_credential_id", async (req, res) => {
	try {
		const { username, password } = req.body;
		const result = await db.query(
			"SELECT (username,password) FROM login_credentials  WHERE login_credential_id= $1",
			[req.params.login_credential_id]
		);

		// console.log(req.body);

		//now we want to make sure that if that user does exist we need to make a validator

		// console.log(result.rows[0]);
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

// Insert into personal info table

app.post("/api/v1/PForm", async (req, res) => {
	try {
		const result = await db.query(
			"INSERT INTO personal_info (login_credential_id_fk,first_name,last_name,pronoun,phone_number,location,state,area_of_expertise) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING * ",
			[
               
				req.body.first_name,
				req.body.last_name,
				req.body.pronoun,
				req.body.phone_number,
				req.body.location,
				req.body.state,
				req.body.area_of_expertise,
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

app.put("/api/v1/PForm/", async (req, res) => {
	try {
		const result = await db.query(
			"UPDATE personal_info SET first_name=$1, last_name= $2, pronoun = $3, phone_number = $4, location=$5 , state = $6, area_of_expertise = $7 WHERE personal_info_id=$8 RETURNING * ",
			[
				req.body.first_name,
				req.body.last_name,
				req.body.pronoun,
				req.body.phone_number,
				req.body.location,
				req.body.state,
				req.body.area_of_expertise,
				req.body.personal_info_id,
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
app.post("/api/v1/MForm", async (req, res) => {
	try {
		const result = await db.query(
			"INSERT INTO medical_info (any_medication,medication_description,insurance) VALUES($1,$2,$3) RETURNING * ",
			[
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
app.put("/api/v1/MForm", async (req, res) => {
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
