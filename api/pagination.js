const cheerio = require("cheerio");
const axios = require("axios");
const { URL } = require("url");
const { getProductCalories } = require("./axiosHttpRequest");
// const { Url } = require("url");
async function pagination(requestURL, command) {
  if (command === "Next") {
    try {
      // console.log(requestURL);
      // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=Chicken+Thigh
      // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=Chicken%20Thigh&page=0
      // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=/cheese%20halloumi&page=1
      // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=null&page=2

      const newUrl = new URL(requestURL);
      const pageNumber = parseInt(~~newUrl.searchParams.get("page"));
      newUrl.searchParams.set("page", pageNumber + 1);
      console.log(newUrl.searchParams.toString());
      return getProductCalories(newUrl.searchParams.toString());
    } catch (error) {
      console.error(error);
      return "Request error";
    }
  } else if (command === "Previous") {
    try {
      const newUrl = new URL(requestURL);
      const pageNumber = parseInt(~~newUrl.searchParams.get("page"));
      if (pageNumber > 0) {
        newUrl.searchParams.set("page", pageNumber - 1);
        // console.log(newUrl.searchParams.toString());
        return getProductCalories(newUrl.searchParams.toString());
      } else {
        console.log("menishe null");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  pagination,
};
