require("dotenv").config();
const { logger } = require("../handlers/logger/logger_winston");
const { pool } = require("./pool");

async function insertTdee(tde, userId) {
  try {
    const parametersData = [userId, tde];

    const insertParam = `
      INSERT INTO tdee ("personid", "tdee") 
      VALUES ($1, $2) 
      ON CONFLICT ("personid") 
      DO UPDATE SET "tdee" = EXCLUDED."tdee";
    `;

    const { rows } = await pool.query(insertParam, parametersData);
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  insertTdee,
};
