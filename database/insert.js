require("dotenv").config();
const { logger } = require("../handlers/logger/logger_winston");
const { pool } = require("./pool");

async function insert(postData) {
  try {
    const sqlINSERT = `
      INSERT INTO dailycalories 
      (id_from_phone_contact, dish, dish_portion, calories_per_portion, date) 
      VALUES ($1, $2, $3, $4, CURRENT_DATE)
    `;

    await pool.query(sqlINSERT, postData);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { insert };
