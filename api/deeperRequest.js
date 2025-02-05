const axios = require("axios");
const cheerio = require("cheerio");
const { url } = require("inspector");
const { URL } = require("url");

async function deeperRequestForUnusualDish(
  urlForUnusualDishes,
  queryData
  // userRequest
) {
  // const $ = await cheerio.load(userRequestUserIdDataResponse.data);

  //www.nutracheck.co.uk/CaloriesIn/Product/   22/Sainsbury%27s+Santa%27s+Grotto+Cake+670g
  // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=gpotato
  // https://www.nutracheck.co.uk/CaloriesIn/Product/41/Sainsbury%27s+Santa%27s+Grotto+Sweets+Selection+250g+Frosty+Foams

  try {
    let url = `https://www.nutracheck.co.uk/CaloriesIn/Product/${urlForUnusualDishes}`;
    console.log(`deeperRequestForUnusualDish.js deep parse url URL: ${url}`);
    let request = await axios.get(url);

    const $ = cheerio.load(request.data);
    let callForGramsFromDeepParse = $("#prodDetails2 > h2 > span").text();

    let gramsForPortionFromDeepParse = $(
      "#prodbreakdown > select > option:nth-child(2)"
    )?.text();

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
  } catch (error) {
    // console.log(error);
  }
}

module.exports = {
  deeperRequestForUnusualDish,
};
