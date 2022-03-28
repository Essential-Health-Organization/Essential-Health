const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");
//regiser
router.post("/register", validInfo, async (req, res) => {
	try {
		//1 destructure the req.body (name ,email,password)

		const { username, email, password } = req.body;

		//2 check if the user exist then if user does not exisit then throw err

		const user = await pool.query(
			"SELECT * FROM login_credentials WHERE email = $1",
			[email]
		);

		//this checks if user exisit

		if (user.rows.length !== 0) {
			return res.status(401).json("user already exisits");
		}
		// res.json(user.rows)

		// 3 bcrypt the user password

		const saltround = 10; //now we are going to encrypt the password if user does not exisit
		const salt = await bcrypt.genSalt(saltround);
		const bcryptPassword = await bcrypt.hash(password, salt);

		//4 enter the user inside the db
		const newUser = await pool.query(
			"INSERT INTO login_credentials(username,email,password)VALUES($1,$2,$3) RETURNING *",
			[username, email, bcryptPassword]
		);

		//5 generate our token
		const token = jwtGenerator(newUser.rows[0].user_id);

		res.json({ token });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("server err");
	}
});

//now we are doing login route
router.post("/login", validInfo, async (req, res) => {
	try {
		//1. destructure the req.body

		const { email, password } = req.body;
		//2. check if user doesn't exist (if not we throw error)
		const user = await pool.query(
			"SELECT * FROM login_credentials WHERE email=$1",
			[email]
		);

		if (user.rows.length === 0) {
			return res.status(401).json("password or email is incorrect");
		}
		//3. check if incoming password is the same the database password
		const validPassword = await bcrypt.compare(password, user.rows[0].password);
		console.log(validPassword);

		if (!validPassword) {
			return res.status(401).json("password or email is not correct");
		}
		//4. check if incoming passsword is the same as the
		const token = jwtGenerator(user.rows[0].user_id);
		res.json({ token });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

router.get("/is-verify", authorization, async (req, res) => {
	try {
		res.json(true);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});
module.exports = router;
