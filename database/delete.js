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

      const sqlDelete =
        "DELETE FROM `dailycalories` WHERE `id_from_phone_contact` = ? AND `date` = CURDATE() AND `id` = ? ";
      await pool.query(sqlDelete, values);
    }
  } catch (error) {
    logger.error(error);
    throw err;
  }
}

module.exports = { deletefromDB };
