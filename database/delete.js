const mysql = require("mysql2");
const { pool } = require("./pool");

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
      console.log(`delete.js Record deleted successfully ${values}`);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { deletefromDB };
