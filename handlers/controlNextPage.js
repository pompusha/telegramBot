// controlNextPage
const { getProductCalories } = require("../api/getProductCalories");
const { pagination } = require("../api/pagination");
async function controlNextPage(userRequest, query) {
  if (!userRequest[userId]["data"]["text"]) {
    let takeAllSighnAfterEquival = /(?<=\=)(.*)/g;
    url = userRequest[userId]["cacheData"]["url"]
      .match(takeAllSighnAfterEquival)
      .toString();

    userRequest[userId]["cacheData"]["page"] = "downloaded";

    userRequest[userId]["data"] = await getProductCalories(`desc=${url}`);
  } else {
    // console.log("!datatext else");
    if (
      userRequest[userId]["data"]["text"].length >
      userRequest[userId]["data"]["page"] + 1
    ) {
      // console.log("if controlNextPage");
      userRequest[userId]["data"]["page"] =
        userRequest[userId]["data"]["page"] + 1;
      if (userRequest[userId]["cacheData"]) {
        // console.log("sec");
        if (userRequest[userId]["cacheData"]["page"]) {
          // console.log("third");
          userRequest[userId]["cacheData"]["page"] = "downloaded";
        }
      }
    }
    // !!!
    else if (
      userRequest[userId]["data"]["text"].length ===
      userRequest[userId]["data"]["page"] + 1
    ) {
      console.log("else if pagination");
      console.log(
        `length : ${userRequest[userId]["data"]["text"].length} === page ${userRequest[userId]["data"]["page"]}+1`
      );
      nextDatapage = await pagination(
        userRequest[userId],
        query.data,
        userRequest[userId]["data"]["page"]
      );
      // !!!
      console.log("later work");
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
  //!!!
  console.log(
    `downloaded Quantity in ["data"]["text"] : ${userRequest[userId]["data"]["text"].length} controlNextPage`
  );
}

module.exports = { controlNextPage };
