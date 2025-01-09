const cheerio = require("cheerio");
const axios = require("axios");

async function getProductCalories(product) {
  console.log("!!!FIX AXIOS URL FOR DISH CONSISNED MORE THEN ONE WORD");
  // AD URL WAY FOR COMPLICATED WORDS CONSISTS FROM MORE THEN ONE WORD "https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=chiken+thigs"
  const url = `https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=${product}`;
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const calorieInfo = $(
      "body > div.contentStretch > div.CenterContent > div > table > tbody"
    )
      .text()
      .replace(/\s+/g, " ");
    return calorieInfo
      .trim()
      .split(/(?<=\bfat)\s(?=Calories)/g)
      .map((el) => {
        return el.trim();
      });
  } catch (error) {
    console.error(error);
    return "Request error";
  }
}

module.exports = { getProductCalories };
