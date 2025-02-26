const axios = require("axios");
const cheerio = require("cheerio");
const { url } = require("inspector");
const { URL } = require("url");

async function deeperRequestForUnusualDish(
  urlForUnusualDishes,
  queryData
  // userRequest
) {
  let regExpQuantityportionMLGandDigits = /\d+\.?\s?(ml|g)/g;
  // let regExpAllBetweenPerandDash = /((?<=\bPer\s)(.*)(?=\s\-))/g;
  // let regExpGMLper = /\d+(g|ml)/g;

  try {
    let url = `https://www.nutracheck.co.uk/CaloriesIn/Product/${urlForUnusualDishes}`;
    console.log(`deeperRequestForUnusualDish.js URL: ${url}`);
    let request = await axios.get(url);

    const $ = cheerio.load(request.data);
    let callForGramsFromDeepParse = $("#prodDetails1 > h2 > span").text();

    let gramsForPortionFromDeepParse = $(
      "#prodbreakdown > select > option"
    )?.text();

    console.log(
      `\ndeeperRequestForUnusualDish callForGramsFromDeepParse:${callForGramsFromDeepParse}`
    );
    console.log(
      `deeperRequestForUnusualDish gramsForPortionFromDeepParse:${gramsForPortionFromDeepParse}\n`
    );
    //
    //

    //
    //

    if (regExpQuantityportionMLGandDigits.test(gramsForPortionFromDeepParse)) {
    }
    if (
      callForGramsFromDeepParse.length === 0 ||
      gramsForPortionFromDeepParse.length === 0
    ) {
      console.log(
        "deeperRequestForUnusualDish.js Deeper parsing failed because the page does not exist. URL: " +
          url
      );
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
  } catch (error) {}
}

module.exports = {
  deeperRequestForUnusualDish,
};
