const mysql = require("mysql2");
const { pool } = require("./pool");

async function getStatistic(id) {
  console.log("WAKE UP DATABASE");
  try {
    const selectValues = [id];

    sqlSELECT = `
  SELECT 
    SUM(dc.calories_per_portion) AS SUMCall, 
    t.TDEE  
  FROM dailycalories dc
  JOIN tdee t ON t.PersonID = dc.id_from_phone_contact
  WHERE dc.id_from_phone_contact = ? 
    AND dc.date >= DATE_SUB(CURDATE(), INTERVAL 1 DAY)
`;
    // "SELECT SUM(`calories_per_portion`) as SUMCall, `TDEE`  FROM `dailycalories`  JOIN `tdee`
    //  ON `PersonID` = `id_from_phone_contact` WHERE `id_from_phone_contact` =? AND  CURDATE() interval 1 day";

    const [request] = await pool.query(sqlSELECT, selectValues);
    // console.log(request);
    return request;
  } catch (err) {
    `error ${err}`;
  }
}

module.exports = {
  getStatistic,
};
