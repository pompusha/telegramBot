require("dotenv").config();
const { logger } = require("../handlers/logger/logger_winston");
const { pool } = require("./pool");

async function insert(postData) {
  try {
    const sqlINSERTtdee = "INSERT INTO `tdee` ( `PersonID`, `TDEE` )";

    const sqlINSERT =
      "INSERT INTO `dailycalories` ( `id_from_phone_contact`, `dish`, `dish_portion`, `calories_per_portion`, `date`) VALUES (?, ?, ?, ?, CURDATE())";
    const [result, fields] = await pool.query(sqlINSERT, postData);
  } catch (error) {
    logger.error(error);
  }
}
module.exports = {
  insert,
};
