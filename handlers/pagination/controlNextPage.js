const { getProductCalories } = require("../../api/getProductCalories");
const { pagination } = require("../../api/pagination");
async function controlNextPage(userRequest, query) {
  if (!userRequest[userId]["data"]["text"]) {
    let takeAllSighnAfterEquival = /(?<=\=)(.*)/g;
    url = userRequest[userId]["cacheData"]["url"]
      .match(takeAllSighnAfterEquival)
      .toString();

    userRequest[userId]["cacheData"]["page"] = "downloaded";

    userRequest[userId]["data"] = await getProductCalories(`desc=${url}`);
  } else {
    if (
      userRequest[userId]["data"]["text"].length >
      userRequest[userId]["data"]["page"] + 1
    ) {
      userRequest[userId]["data"]["page"] =
        userRequest[userId]["data"]["page"] + 1;
      if (userRequest[userId]["cacheData"]) {
        if (userRequest[userId]["cacheData"]["page"]) {
          userRequest[userId]["cacheData"]["page"] = "downloaded";
        }
      }
    } else if (
      userRequest[userId]["data"]["text"].length ===
      userRequest[userId]["data"]["page"] + 1
    ) {
      nextDatapage = await pagination(
        userRequest[userId],
        query.data,
        userRequest[userId]["data"]["page"]
      );

      userRequest[query.from.id]["data"]["text"] = [
        ...userRequest[query.from.id]["data"]["text"],
        ...nextDatapage["text"],
      ];
      userRequest[query.from.id]["data"]["urlForUnusualDishes"] = [
        ...userRequest[query.from.id]["data"]["urlForUnusualDishes"],
        ...nextDatapage["urlForUnusualDishes"],
      ];
      userRequest[query.from.id]["data"]["url"] = JSON.parse(
        JSON.stringify(nextDatapage["url"])
      );
    }
  }
}

module.exports = { controlNextPage };
