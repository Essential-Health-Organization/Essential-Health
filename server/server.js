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
		res.status(200).json({// to send a good status 
			status: "success",// of success 
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
app.post("/api/v1/SignUp", async (req,res)=>{
    try {
        const result = await db.query("INSERT INTO login_credentials (email,username,password) VALUES($1,$2,$3) RETURNING *",
        [req.body.email, req.body.username, req.body.password])
        console.log(req.body);

		res.status(201).json({
			status: "success",
			data: {
				login: result.rows[0], //this gets the one row we need
			},
		});
    } catch (err) {
        console.error(err.message)
    }
})
//to get a user 
app.get("/api/v1/Login/:id", async (req,res)=>{
    try {
        const result = await db.query("SELECT FROM login_credentials (username,password) WHERE id = $1 RETURNING *",
        [req.body.username, req.body.password])
        
        console.log(req.body);

		res.status(201).json({
			status: "success",
			data: {
				login: result.rows[0], //this gets the one row we need
			},
		});
    } catch (err) {
        console.error(err.message)
    }
})









app.listen(port, () => {
	console.log(`the server is up ${port}`);
});
