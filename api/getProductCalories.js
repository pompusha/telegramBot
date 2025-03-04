const cheerio = require("cheerio");
const axios = require("axios");
const URL = require("url");
const { logger } = require("../handlers/logger/logger_winston");
const { text } = require("stream/consumers");
const { stringify } = require("querystring");
async function getProductCalories(product) {
  const url = `https://www.nutracheck.co.uk/CaloriesIn/Product/Search?${product}`;

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
    logger.error(error);
    return "Request error";
  }
}

module.exports = { getProductCalories };
