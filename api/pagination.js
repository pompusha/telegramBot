const cheerio = require("cheerio");
const axios = require("axios");
const { URL } = require("url");
const { getProductCalories } = require("./getProductCalories");

// const { Url } = require("url");
async function pagination(userRequestUserId, command, page) {
  // console.log("pkdfkspofksfposks");
  // console.log(command);
  // console.log("pkdfkspofksfposks");
  // console.log(`COMMAND IN pagination : ${command}`);
  if (command === "Next") {
    let newUrl;
    let pageNumber;
    try {
      //
      //
      // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=Chicken+Thigh
      // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=Chicken%20Thigh&page=0
      // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=/cheese%20halloumi&page=1
      // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=null&page=2
      //
      //
      if (userRequestUserId["cacheData"]) {
        if (userRequestUserId["cacheData"]["page"] === "cachePage") {
          console.log(
            `PAGINATION SHOUDNT WORK userRequestUserId["cacheData"]["page"] === "cachePage" `
          );
          userRequestUserId["cacheData"]["page"] = "downloaded";
          newUrl = new URL(userRequestUserId["cacheData"]["url"]);
          console.log(`newUrl : ${newUrl}  pagination.js`);
          userRequestUserId["data"]["page"] = 0;
          return getProductCalories(newUrl.searchParams.toString());
        }
      }
      //
      //

      console.log(
        "!!!!!!!!!!!!!!!!!!!!!!FIX NEXT PAGE do not CHECK NEXT ON PAGE ETERNAL PAGINATION!!!!!!!!!!!!!!!!!!!!"
      );
      //
      if (
        !userRequestUserId["cacheData"] ||
        userRequestUserId["cacheData"]["page"] === "downloaded"
      ) {
        if (userRequestUserId["data"]["nextPage"] === "Next") {
          newUrl = new URL(userRequestUserId["data"]["url"]);
          pageNumber = parseInt(~~newUrl.searchParams.get("page"));
          userRequestUserId["data"]["page"] =
            userRequestUserId["data"]["page"] + 1;
          newUrl.searchParams.set("page", pageNumber + 1);
          console.log(`newUrl : ${newUrl}`);

          return getProductCalories(newUrl.searchParams.toString());
        } else {
          return userRequestUserId["data"];
        }
      }
    } catch (error) {
      console.error(error);
      return "Request error";
    }
  }
  //
  else if (command === "Previous") {
    try {
      if (page > 0) {
        return;
      } else if (page === 0) {
        if (userRequestUserId["cacheData"]) {
          if (userRequestUserId["cacheData"]["page"] === "cachePage") {
            userRequestUserId["cacheData"]["page"] = "downloaded";
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  pagination,
};
