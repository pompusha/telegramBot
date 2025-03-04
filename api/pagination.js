const cheerio = require("cheerio");
const axios = require("axios");
const { URL } = require("url");
const { getProductCalories } = require("./getProductCalories");
const { logger } = require("../handlers/logger/logger_winston");

async function pagination(userRequestUserId, command, page) {
  if (command === "Next") {
    let newUrl;
    let pageNumber;
    try {
      if (userRequestUserId["cacheData"]) {
        if (userRequestUserId["cacheData"]["page"] === "cachePage") {
          userRequestUserId["cacheData"]["page"] = "downloaded";
          newUrl = new URL(userRequestUserId["cacheData"]["url"]);
          userRequestUserId["data"]["page"] = 0;
          return getProductCalories(newUrl.searchParams.toString());
        }
      }

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

          return getProductCalories(newUrl.searchParams.toString());
        } else {
          return userRequestUserId["data"];
        }
      }
    } catch (error) {
      logger.error(error);
    }
  } else if (command === "Previous") {
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
      logger.error(error);
    }
  }
}

module.exports = {
  pagination,
};
