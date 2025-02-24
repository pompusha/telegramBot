const mysql = require("mysql2");
const { pool } = require("./pool");

async function getStatistic(id, command, fullDishlist) {
  console.log("WAKE UP DATABASE");
  let sqlSELECT;
  try {
    const selectValues = [id];
    if (command === "sumGet") {
      sqlSELECT = `
SELECT 
  SUM(dc.calories_per_portion) AS SUMCall, 
  t.TDEE  
FROM dailycalories dc
LEFT JOIN tdee t ON t.PersonID = dc.id_from_phone_contact
WHERE dc.id_from_phone_contact = ? 
  AND dc.date = curdate()
`;

      const [request] = await pool.query(sqlSELECT, selectValues);
      return request;
    } else if (command === "listget") {
      const requArray = [id];
      sqlSELECT =
        "SELECT `id`, `dish`, `dish_portion`, `calories_per_portion` FROM `dailycalories` WHERE `id_from_phone_contact` = ? AND `date` = CURDATE()";

      const [request] = await pool.query(sqlSELECT, selectValues);

      list = request;

      return list;
    }
  } catch (err) {
    `error ${err}`;
  }
}

module.exports = {
  getStatistic,
};
