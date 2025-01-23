const { getProductCalories } = require("../api/getProductCalories");

async function cacheCheck(userCache, dishFromMessage, userRequest) {
  let mergeTextForAllCache = [];
  let mergeUrlForUnusualDishesAllCashe = [];
  let cacheUrl;
  let keysFromCasheWithCurrDate = Object.keys(userCache[userId]);
  if (userCache[userId]) {
    console.log("1");
    keysFromCasheWithCurrDate.forEach((el) => {
      if (dishFromMessage in userCache[userId][el]) {
        // console.log("2");
        console.log(`we have this key ${dishFromMessage} in obj`);
        mergeTextForAllCache.push(
          ...userCache[userId][el][dishFromMessage]["data"]["text"]
        );
        mergeUrlForUnusualDishesAllCashe.push(
          ...userCache[userId][el][dishFromMessage]["data"][
            "urlForUnusualDishes"
          ]
        );
      }
    });
  }

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

    userRequest[userId] = {
      data: {},
    };
    cacheUrl =
      userCache[userId][keysFromCasheWithCurrDate[0]][dishFromMessage]["data"][
        "url"
      ];

    userRequest[userId]["data"]["text"] = JSON.parse(
      JSON.stringify([...mergeTextForAllCache])
    );
    userRequest[userId]["data"]["urlForUnusualDishes"] = JSON.parse(
      JSON.stringify([...mergeUrlForUnusualDishesAllCashe])
    );

    userRequest[userId]["data"]["url"] = cacheUrl;
    console.log(userRequest);
  }
}

module.exports = { cacheCheck };
