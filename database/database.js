const mysql = require("mysql2");
require("dotenv").config();

const con = mysql.createConnection({
  host: "localhost",
  user: "Ermax",
  password: process.env.DB_PASSWORD,
});
con.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Connected to the database");
  }
});

con.end();

module.exports = {
  con,
};
