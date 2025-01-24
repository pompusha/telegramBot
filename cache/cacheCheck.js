const { getProductCalories } = require("../api/getProductCalories");

async function cacheCheck(userCache, dishFromMessage, userRequest) {
  let mergeTextForAllCache = [];
  let mergeUrlForUnusualDishesAllCashe = [];
  let cacheUrl;
  let keysFromCasheWithCurrDate = Object.keys(userCache[userId]);
  if (userCache[userId]) {
    keysFromCasheWithCurrDate.forEach((el) => {
      if (dishFromMessage in userCache[userId][el]) {
        mergeTextForAllCache.push(
          ...userCache[userId][el][dishFromMessage]["data"]["text"]
        );
        mergeUrlForUnusualDishesAllCashe.push(
          ...userCache[userId][el][dishFromMessage]["data"][
            "urlForUnusualDishes"
          ]
        );
        if (userCache[userId][el][dishFromMessage]["data"]["url"]) {
          cacheUrl = userCache[userId][el][dishFromMessage]["data"]["url"];
        }
      }
    });
  }

  //
  if (
    (mergeTextForAllCache.length === 0) &
    (mergeUrlForUnusualDishesAllCashe.length === 0)
  ) {
    console.log("Have no data in cache began download");
    userRequest[userId] = {
      data: await getProductCalories(`desc=${dishFromMessage}`),
    };
  }
  if (mergeTextForAllCache.length > 0) {
    console.log("i have data in cache");

    console.log("cachecheck add obj data");
    userRequest[userId] = {
      data: {},
    };

    (userRequest[userId]["data"]["text"] = JSON.parse(
      JSON.stringify([[...mergeTextForAllCache]])
    )),
      (userRequest[userId]["data"]["urlForUnusualDishes"] = JSON.parse(
        JSON.stringify([...mergeUrlForUnusualDishesAllCashe])
      ));

    userRequest[userId]["data"]["url"] = cacheUrl;
    // console.log(userRequest);
  }
}

module.exports = { cacheCheck };
