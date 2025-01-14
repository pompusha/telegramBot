const cheerio = require("cheerio");
const axios = require("axios");
const URL = require("url");
const { text } = require("stream/consumers");
async function getProductCalories(product) {
  // console.log("!!!FIX AXIOS URL FOR DISH CONSISNED MORE THEN ONE WORD");
  // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=Chicken+Thigh
  // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=Chicken%20Thigh&page=0
  // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=/cheese%20halloumi&page=1
  // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=null&page=2
  // AD URL WAY FOR COMPLICATED WORDS CONSISTS FROM MORE THEN ONE WORD "https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=chiken+thigs"

  const url = `https://www.nutracheck.co.uk/CaloriesIn/Product/Search?${product}`;
  // console.log("_____");
  // console.log(url);
  // console.log("_____");
  try {
    const response = await axios.get(url);
    // console.log(response["config"]["url"]);
    const $ = cheerio.load(response.data);
    // currentUrl = response;
    const searchNextOnPage = $(
      "body > div.contentStretch > div.CenterContent > div > div:nth-child(4) > div.vMargin.textMedium > a.pull-right"
    )
      .text()
      .replace(/\s+/g, " ");
    // console.log(searchNextOnPage);
    if (searchNextOnPage) {
      // console.log("searchNextOnPage exists");
    } else {
      // console.log("searchNextOnPage not exists");
    }
    const calorieInfo = {
      url: response["config"]["url"],
      text: $(
        "body > div.contentStretch > div.CenterContent > div > table > tbody"
      )
        .text()
        .replace(/\s+/g, " ")
        .trim()
        .split(/(?<=\bfat)\s(?=Calories)/g)
        .map((el) => {
          return el.trim();
        }),
    };
    // console.log(new URL(response));
    // console.log(calorieInfo);
    return calorieInfo;
    // .trim()
    // .split(/(?<=\bfat)\s(?=Calories)/g)
    // .map((el) => {
    //   return el.trim();
    // });

    // userRequest[userId] = {
    //       text: await getProductCalories(dishFromMessage),
    //     };
  } catch (error) {
    console.error(error);
    return "Request error";
  }
}

module.exports = { getProductCalories };
