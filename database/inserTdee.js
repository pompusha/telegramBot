require("dotenv").config();

const { pool } = require("./pool");

async function insertTdee(tde, userId) {
  try {
    // console.log(paramitersData);
    // let parametersData = [userId, tde, tde];
    let parametersData = [userId, tde, tde];
    // const selectValues = userId;

    // const sqlCheckInsert =
    //   "INSERT INTO `tdee` ( `PersonID`, `TDEE` ) VALUES ( ?, ?) ON DUPLICATE KEY UPDATE `TDEE` = ?";

    // const sqlWhatINeedtoINSERT ="IF (EXISTS (SELECT `PersonID` FROM `calloriesbotdata.tdee`  WHERE `PersonID`=? )) THEN UPDATE `TDEE` = ? WHERE `PersonID`=?; ELSE INSERT INTO `calloriesbotdata.tdee` (`PersonID` , `TDEE` ) VALUES ( ? , ? )";

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
