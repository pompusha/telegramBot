require("dotenv").config();

const { pool } = require("./pool");

async function insert(postData) {
  try {
    const sqlINSERT =
      "INSERT INTO `dailycalories` ( `id_from_phone_contact`, `dish`, `dish_portion`, `calories_per_portion`, `date`) VALUES (?, ?, ?, ?, CURDATE())";
    const [result, fields] = await pool.query(sqlINSERT, postData);
    console.log(result);
    console.log(fields);
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  insert,
};
