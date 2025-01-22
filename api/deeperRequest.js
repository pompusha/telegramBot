const axios = require("axios");
const cheerio = require("cheerio");
const { url } = require("inspector");
const { URL } = require("url");

async function deeperRequestForUnusualDish(
  urlForUnusualDishes,
  queryData
  // userRequest
) {
  // console.log(userRequestUserIdDataResponse.text);
  // const $ = await cheerio.load(userRequestUserIdDataResponse.data);
  // // console.log($);
  //www.nutracheck.co.uk/CaloriesIn/Product/   22/Sainsbury%27s+Santa%27s+Grotto+Cake+670g
  // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=gpotato
  // https://www.nutracheck.co.uk/CaloriesIn/Product/41/Sainsbury%27s+Santa%27s+Grotto+Sweets+Selection+250g+Frosty+Foams

  // console.log("aaaa");
  try {
    // let urlPart = Array.from(
    //   new Set(
    //     userRequestUserIdDataResponse.data.match(
    //       /(?<=\bhref="\/CaloriesIn\/Product\/)(.*)(?=\"\>\<\bimg)/g
    //     )
    //   )
    // );
    // console.log(urlForUnusualDishes);

    console.log("+++++++++++++");
    console.log(urlForUnusualDishes[parseFloat(queryData.match(/\d+/g))]);
    console.log("+++++++++++++");
    let url = `https://www.nutracheck.co.uk/CaloriesIn/Product/${
      urlForUnusualDishes[parseFloat(queryData.match(/\d+/g))]
    }`;
    let request = await axios.get(url);
    // https://www.nutracheck.co.uk/CaloriesIn/Product/70/Brazil+Nuts
    const $ = cheerio.load(request.data);
    let callForGramsFromDeepParse = $("#prodDetails2 > h2 > span").text();
    console.log(`callForGramsFrom: ----- ${callForGramsFromDeepParse}`);

    let gramsForPortionFromDeepParse = $(
      "#prodbreakdown > select > option:nth-child(2)"
    )?.text();

    if (
      callForGramsFromDeepParse.length === 0 ||
      gramsForPortionFromDeepParse.length === 0
    ) {
      console.log(
        "Deeper parsing failed because the page does not exist. URL: " + url
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
      console.log(`callForGramsFrom: ----- ${callForGramsFromDeepParse}`);
      return { callForGramsFromDeepParse, gramsForPortionFromDeepParse };
    }

    // callForGramsFromDeepParse = callForGramsFromDeepParse
    //   .match(/\d+/g)
    //   ?.toString();
    // console.log(`callForGramsFrom: ----- ${callForGramsFromDeepParse}`);

    // if (
    //   (callForGramsFromDeepParse === undefined) |
    //   (gramsForPortionFromDeepParse === undefined)
    // ) {
    //   console.log(
    //     "Deeper parsing failed because the page does not exist. URL: " + url
    //   );
    //   callForGramsFromDeepParse = 0;
    //   gramsForPortionFromDeepParse = 0;
    //   return { callForGramsFromDeepParse, gramsForPortionFromDeepParse };
    // } else {
    //   return { callForGramsFromDeepParse, gramsForPortionFromDeepParse };
    // }

    //
    //
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
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  deeperRequestForUnusualDish,
};
