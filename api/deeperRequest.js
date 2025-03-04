const axios = require("axios");
const cheerio = require("cheerio");
const { url } = require("inspector");
const { URL } = require("url");
const { logger } = require("../handlers/logger/logger_winston");

async function deeperRequestForUnusualDish(urlForUnusualDishes, queryData) {
  let regExpQuantityportionMLGandDigits = /\d+\.?\s?(ml|g)/g;

  try {
    let url = `https://www.nutracheck.co.uk/CaloriesIn/Product/${urlForUnusualDishes}`;

    let request = await axios.get(url);

    const $ = cheerio.load(request.data);
    let callForGramsFromDeepParse = $("#prodDetails1 > h2 > span").text();

    let gramsForPortionFromDeepParse = $(
      "#prodbreakdown > select > option"
    )?.text();

    if (
      callForGramsFromDeepParse.length === 0 ||
      gramsForPortionFromDeepParse.length === 0
    ) {
      callForGramsFromDeepParse = 0;
      gramsForPortionFromDeepParse = 0;
      return { callForGramsFromDeepParse, gramsForPortionFromDeepParse };
    } else if (
      callForGramsFromDeepParse.length > 0 ||
      gramsForPortionFromDeepParse.length > 0
    ) {
      callForGramsFromDeepParse = callForGramsFromDeepParse
        .match(/\d+/g)
        .toString();

      return { callForGramsFromDeepParse, gramsForPortionFromDeepParse };
    }
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  deeperRequestForUnusualDish,
};
