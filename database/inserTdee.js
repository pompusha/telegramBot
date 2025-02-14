require("dotenv").config();

const { pool } = require("./pool");

async function insertTdee(tde, userId) {
  try {
    let parametersData = [userId, tde, tde];

    const insertParam =
      "INSERT INTO `tdee` (`PersonID`, `TDEE`) VALUES ( ? , ? ) ON DUPLICATE KEY UPDATE `TDEE`=?";
    const [result, fields] = await pool.query(insertParam, parametersData);
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  insertTdee,
};
