const { pool } = require("./pool");
const { logger } = require("../handlers/logger/logger_winston");
async function getStatistic(id, command, fullDishlist) {
  try {
    const selectValues = [id];

    if (command === "sumGet") {
      const sqlSELECT = `SELECT 
    COALESCE(SUM(CAST(dc."calories_per_portion" AS INTEGER)), 0) AS "SUMCall",
    t."tdee"
FROM "dailycalories" dc
LEFT JOIN "tdee" t ON t."personid" = dc."id_from_phone_contact"
WHERE dc."id_from_phone_contact" = $1
  AND dc."date" = CURRENT_DATE
GROUP BY t."tdee";`;

      const { rows } = await pool.query(sqlSELECT, selectValues);

      return rows;
    } else if (command === "listget") {
      const sqlSELECT = `
        SELECT 
          "id", 
          "dish", 
          "dish_portion", 
          "calories_per_portion"
        FROM "dailycalories"
        WHERE "id_from_phone_contact" = $1
          AND "date" = CURRENT_DATE
      `;

      const { rows } = await pool.query(sqlSELECT, selectValues);
      return rows;
    }
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  getStatistic,
};
