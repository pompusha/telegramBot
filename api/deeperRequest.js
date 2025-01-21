const axios = require("axios");
const cheerio = require("cheerio");
const { url } = require("inspector");
const { URL } = require("url");

async function deeperRequestForUnusualDish(
  userRequestUserIdDataResponse,
  queryData,
  userRequest
) {
  // console.log(userRequestUserIdDataResponse.text);
  // const $ = await cheerio.load(userRequestUserIdDataResponse.data);
  // // console.log($);
  //www.nutracheck.co.uk/CaloriesIn/Product/   22/Sainsbury%27s+Santa%27s+Grotto+Cake+670g
  // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=gpotato
  // https://www.nutracheck.co.uk/CaloriesIn/Product/41/Sainsbury%27s+Santa%27s+Grotto+Sweets+Selection+250g+Frosty+Foams

  // console.log("aaaa");
  try {
    let urlPart = Array.from(
      new Set(
        userRequestUserIdDataResponse.data.match(
          /(?<=\bhref="\/CaloriesIn\/Product\/)(.*)(?=\"\>\<\bimg)/g
        )
      )
    );
    let request = await axios.get(
      `https://www.nutracheck.co.uk/CaloriesIn/Product/${
        urlPart[parseFloat(queryData.match(/\d+/g))]
      }`
    );

    const $ = cheerio.load(request.data);
    const callForGramsFromDeepParse = $("#prodDetails2 > h2 > span")
      .text()
      .match(/\d+/g)
      .toString();
    const gramsForPortionFromDeepParse = $(
      "#prodbreakdown > select > option:nth-child(2)"
    ).text();

    // console.log(request.data.replace(/\s+/g, " "));

    // console.log(callForGrams.text());
    // console.log(callGramsForCallories.text());
    // console.log(a);
    // const newLine = deepLink.text();
    // .match(/(?<=\bhref="\/CaloriesIn\/Product\/)(.*)(?=\"\s\bclass)/g);
    // console.log(deepLink.text());
    // console.log(deepLink);
    // console.log(typeof deepLink);
    // console.log(
    //   deepLink.text().replace(/\s+/g, " ").replace(/\s+/g, " ")
    //   // .trim()
    //   // .match(/(?<=\bhref="\/CaloriesIn\/Product\/)(.*)(?=\"\s\bclass)/g)
    //   // .map((el) => {
    //   //   return el.trim();
    //   // })
    // );
    // console.log("aaaa");
    //(?<=\bhref="\/CaloriesIn\/Product\/)(.*)(?=\"\s\bclass)
    // console.log(callForGramsFromDeepParse);
    // console.log(gramsForPortionFromDeepParse);
    return { callForGramsFromDeepParse, gramsForPortionFromDeepParse };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  deeperRequestForUnusualDish,
};
