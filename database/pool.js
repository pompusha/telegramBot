const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "Ermax",
  password: process.env.DB_PASSWORD,
  database: `calloriesbotdata`,
});

module.exports = {
  pool,
};
