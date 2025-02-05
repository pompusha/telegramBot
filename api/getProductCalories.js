const cheerio = require("cheerio");
const axios = require("axios");
const URL = require("url");
const { text } = require("stream/consumers");
const { stringify } = require("querystring");
async function getProductCalories(product) {
  // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=Chicken+Thigh
  // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=Chicken%20Thigh&page=0
  // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=/cheese%20halloumi&page=1
  // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=null&page=2
  // AD URL WAY FOR COMPLICATED WORDS CONSISTS FROM MORE THEN ONE WORD "https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=chiken+thigs"

  const url = `https://www.nutracheck.co.uk/CaloriesIn/Product/Search?${product}`;
  console.log(`getProductCalories.js URL : ${url}`);
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const searchNextOnPage = $(
      "body > div.contentStretch > div.CenterContent > div > div:nth-child(4) > div.vMargin.textMedium > a.pull-right"
    )
      .text()
      .replace(/\s+/g, " ");
    if (searchNextOnPage) {
    } else {
    }
    let urlPartForDeeperPage = Array.from(
      new Set(
        response.data.match(
          /(?<=\bhref="\/CaloriesIn\/Product\/)(.*)(?=\"\>\<\bimg)/g
        )
      )
    );
    const nextPage = $(
      "body > div.contentStretch > div.CenterContent > div > div:nth-child(4) > div.vMargin.textMedium > a.pull-right"
    ).text();

    const calorieInfo = {
      page: 0,
      urlForUnusualDishes: [urlPartForDeeperPage],
      url: response["config"]["url"],
      nextPage: nextPage,
      text: [
        $("body > div.contentStretch > div.CenterContent > div > table > tbody")
          .text()
          .replace(/\s+/g, " ")
          .trim()
          .split(/(?<=\bfat)\s(?=Calories)/g)
          .map((el) => {
            return el.trim();
          }),
      ],
    };

    return calorieInfo;
  } catch (error) {
    console.error(error);
    return "Request error";
  }
}

module.exports = { getProductCalories };
