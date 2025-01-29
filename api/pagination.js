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
      // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=Chicken+Thigh
      // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=Chicken%20Thigh&page=0
      // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=/cheese%20halloumi&page=1
      // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=null&page=2
      if (userRequestUserId["cacheData"]) {
        // console.log(
        //   `userRequestUserId["cacheData"] exist ${userRequestUserId["cacheData"]["url"]}`
        // );
        if (userRequestUserId["cacheData"]["page"] === "cachePage") {
          // console.log(
          //   `userRequestUserId["cacheData"]["page"] exist ${userRequestUserId["cacheData"]["page"]}`
          // );
          userRequestUserId["cacheData"]["page"] = "downloaded";
          newUrl = new URL(userRequestUserId["cacheData"]["url"]);
          console.log(`newUrl : ${newUrl}  pagination.js`);
          userRequestUserId["data"]["page"] = 0;
          // userRequestUserId["cacheData"]["page"] = 0;
          // userRequest[userId]["data"]["page"] =
          // userRequest[userId]["data"]["page"] + 1;
          return getProductCalories(newUrl.searchParams.toString());
        }
      }
      console.log(
        "!!!!!!!!!!!!!!!!!!!!!!FIX NEXT PAGE do not CHECK NEXT ON PAGE ETERNAL PAGINATION!!!!!!!!!!!!!!!!!!!!"
      );
      if (
        !userRequestUserId["cacheData"] ||
        userRequestUserId["cacheData"]["page"] === "downloaded"
      ) {
        // && userRequestUserId["data"]["nextPage"] === "Next"
        {
          // console.log(
          //   `!userRequestUserId["cacheData"] doesn't exist ${userRequestUserId}`
          // );
          console.log(userRequestUserId);
          newUrl = new URL(userRequestUserId["data"]["url"]);
          pageNumber = parseInt(~~newUrl.searchParams.get("page"));
          userRequestUserId["data"]["page"] =
            userRequestUserId["data"]["page"] + 1;
          newUrl.searchParams.set("page", pageNumber + 1);
          console.log(`newUrl : ${newUrl}`);
          return getProductCalories(newUrl.searchParams.toString());
        }
      }
      // const newUrl = new URL(userRequestUserId["data"]["url"]);
      // const pageNumber = parseInt(~~newUrl.searchParams.get("page"));
      // newUrl.searchParams.set("page", pageNumber + 1);
      // console.log(`newUrl : ${newUrl}`);
      // // return getProductCalories(newUrl.searchParams.toString());
      // console.log(
      //   `userRequestUserId["cacheData"]["page"] should be renamed to downloaded :${userRequestUserId["cacheData"]["page"]}`
      // );
      // console.log(use);
    } catch (error) {
      console.error(error);
      return "Request error";
    }
  } else if (command === "Previous") {
    try {
      // const newUrl = new URL(userRequestUserId["cacheData"]["url"]);
      // const pageNumber = parseInt(~~newUrl.searchParams.get("page"));
      if (page > 0) {
        // newUrl.searchParams.set("page", pageNumber - 1);
        // page = page - 1;
        // return getProductCalories(newUrl.searchParams.toString());
        return;
      } else if (page === 0) {
        if (userRequestUserId["cacheData"]) {
          if (userRequestUserId["cacheData"]["page"] === "cachePage") {
            userRequestUserId["cacheData"]["page"] = "downloaded";
          }
        }
        // console.log(userRequestUserId["cacheData"]["page"]);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  pagination,
};
