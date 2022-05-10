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

//register and login routes

app.use("/auth", require("./routes/jwtAuth"));

//Home

app.use("/home", require("./routes/home"));

//get one message // this is one route to get one message

// insperational_messages route good
app.use("/message", require("./routes/message"));

//good

app.use("/pform", require("./routes/personalform"));

//geting personal information GOOD
//good

app.use("/mform", require("./routes/medicalform"));

//resources
app.use("/results", require("./routes/results"));

//reviews
app.use("/", require("./routes/Reviews"));

// inserting into medical information GOOD
app.post("/api/v1/MForm/:username", async (req, res) => {
	try {
		const result = await db.query(
			"INSERT INTO medical_info (username,any_medication,medication_description,insurance) VALUES($1,$2,$3,$4) RETURNING * ",
			[
				req.params.username,
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

// updating the medical information good
app.put("/api/v1/MForm/update/:username", async (req, res) => {
	try {
		const result = await db.query(
			"UPDATE medical_info SET any_medication = $1, medication_description = $2, insurance = $3 WHERE username = $4 RETURNING * ",
			[
				req.body.any_medication,
				req.body.medication_description,
				req.body.insurance,
				req.params.username,
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

// retrieve into medical information Good
app.get("/api/v1/MForm/:username", async (req, res) => {
	try {
		const result = await db.query(
			"SELECT * FROM medical_info WHERE username=$1 ",
			[req.params.username]
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

app.get("/api/v1/Res/:username", async (req, res) => {
	try {
		const result = await db.query(
			"SELECT * FROM resources INNER JOIN personal_info on resources.state=personal_info.state WHERE username= $1;",
			[req.params.username]
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
