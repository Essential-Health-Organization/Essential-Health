const router = require("express").Router();
const { json, response } = require("express");
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
//registering

router.post("/register", async (req, res) => {
	try {
		// 1. destructure the req.body(name,email,password)
		const { username, email, password } = req.body;

		// 2. check if user exists (if user exists then throw error)
		const user = await pool.query(
			"SELECT * FROM login_credentials WHERE email =$1",
			[email]
		);
		if (user.rows.length !== 0) {
			return res.status(401).send("User already exists");
		}
		// res.json(user.rows);
		// 3. bycrpyt the user password

		const saltRound = 10;
		const salt = await bcrypt.genSalt(saltRound);

		const bcryptPassword = await bcrypt.hash(password, salt);

		// 4. enter the new user inside our database

		const newUser = await pool.query(
			"INSERT INTO login_credentials (username,email,password) VALUES ($1,$2,$3) RETURNING *",
			[username, email, bcryptPassword]
		);

		// res.json(newUser.rows[0]);
		// 5. generate our jwt token
		const token = jwtGenerator(newUser.rows[0].user_id);

		res.json({ token });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("server error");
	}
});
module.exports = router;
