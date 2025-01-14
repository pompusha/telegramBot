const mysql = require("mysql2");
const { pool } = require("./pool");

async function getStatistic(id) {
  console.log("WAKE UP DATABASE");
  try {
    sqlSELECT =
      "SELECT SUM(`calories_per_portion`) FROM `dailycalories` WHERE `id_from_phone_contact` = ? AND `date` >= CURDATE() - INTERVAL 10 day";
    const selectValues = [id];

    const [request] = await pool.query(sqlSELECT, selectValues);
    // console.log(request);
    return request;
  } catch (err) {
    // console.log(err);
    `error ${err}`;
  }
}

module.exports = {
  getStatistic,
};
