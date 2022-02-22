const { Pool } = require("pg");
const Mongoose = require("mongoose");
const pool = new Pool();
module.exports = {
	query: (text, params) => pool.query(text, params),
};
