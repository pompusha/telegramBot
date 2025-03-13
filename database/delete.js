const mysql = require("mysql2");
const { pool } = require("./pool");
const { logger } = require("../handlers/logger/logger_winston");

async function deletefromDB(msg, fullDishlist) {
  try {
    if (Object.keys(fullDishlist).length > 0) {
      const reqExpDiit = /\d+/;
      const userId = msg.from.id;
      const numberOfId = reqExpDiit.test(msg.text)
        ? parseInt(msg.text.match(reqExpDiit).toString())
        : NaN;
      const idDISH = fullDishlist[userId][numberOfId];

      const values = [userId, idDISH];

      const sqlDelete = `
        DELETE FROM "dailycalories" 
        WHERE "id_from_phone_contact" = $1 
          AND "date" = CURRENT_DATE 
          AND "id" = $2
      `;
      await pool.query(sqlDelete, values);
    }
  } catch (error) {
    logger.error(error);
  }
}

module.exports = { deletefromDB };
