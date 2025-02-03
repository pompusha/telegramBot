// controlNextPage
const { getProductCalories } = require("../api/getProductCalories");
const { pagination } = require("../api/pagination");
async function controlNextPage(userRequest, query) {
  if (!userRequest[userId]["data"]["text"]) {
    //

    //
    let takeAllSighnAfterEquival = /(?<=\=)(.*)/g;
    url = userRequest[userId]["cacheData"]["url"]
      .match(takeAllSighnAfterEquival)
      .toString();
    // nextDatapage = await getProductCalories(url);
    userRequest[userId]["cacheData"]["page"] = "downloaded";
    //
    let data = await getProductCalories(`desc=${url}`);
    // userRequest[userId] = { ...userRequest[userId], ...data };
    userRequest[userId]["data"] = await getProductCalories(`desc=${url}`);
    // {
    //   data: await getProductCalories(`desc=${url}`),
    // };
  } else {
    if (
      userRequest[userId]["data"]["text"].length >
      userRequest[userId]["data"]["page"] + 1
    ) {
      userRequest[userId]["data"]["page"] =
        userRequest[userId]["data"]["page"] + 1;
    } else if (
      userRequest[userId]["data"]["text"].length ===
      userRequest[userId]["data"]["page"] + 1
    ) {
      //
      nextDatapage = await pagination(
        userRequest[userId],
        query.data,
        userRequest[userId]["data"]["page"]
      );
      //
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
  // console.log("NEXTNEXTNEXTNEXTNEXT");
  console.log(userRequest[userId]["data"]["text"]);
  // console.log("=====================");
  // console.log(JSON.stringify(userRequest));
  // console.log("NEXTNEXTNEXTNEXTNEXT");
}

module.exports = { controlNextPage };
