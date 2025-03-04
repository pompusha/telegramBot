const { getProductCalories } = require("../api/getProductCalories");

async function cacheCheck(userCache, dishFromMessage, userRequest) {
  let mergeTextForAllCache = [];
  let mergeUrlForUnusualDishesAllCashe = [];
  let cacheUrl;
  let keysFromCasheWithCurrDate = Object.keys(userCache[userId]);
  if (userCache[userId]) {
    keysFromCasheWithCurrDate.forEach((el) => {
      if (dishFromMessage in userCache[userId][el]) {
        let arrayFromSetText = [
          ...userCache[userId][el][dishFromMessage]["data"]["text"],
        ];
        arrayFromSetText.forEach((el) => {
          mergeTextForAllCache = [
            ...new Set([...mergeTextForAllCache, `${el}`]),
          ];
        });

        let arrayFromSetUrlForUnusualDishes = [
          ...userCache[userId][el][dishFromMessage]["data"][
            "urlForUnusualDishes"
          ],
        ];

        arrayFromSetUrlForUnusualDishes.forEach((el) => {
          mergeUrlForUnusualDishesAllCashe = [
            ...new Set([...mergeUrlForUnusualDishesAllCashe, `${el}`]),
          ];
        });

        if (userCache[userId][el][dishFromMessage]["data"]["url"]) {
          cacheUrl = userCache[userId][el][dishFromMessage]["data"]["url"];
        }
      }
    });
  }

  if (
    (mergeTextForAllCache.length === 0) &
    (mergeUrlForUnusualDishesAllCashe.length === 0)
  ) {
    userRequest[userId] = {
      data: await getProductCalories(`desc=${dishFromMessage}`),
    };
  }
  if (mergeTextForAllCache.length > 0) {
    userRequest[userId] = {
      data: { page: 0 },
    };

    userRequest[userId]["cacheData"] = { page: "cachePage" };
    userRequest[userId]["cacheData"]["text"] = JSON.parse(
      JSON.stringify([...mergeTextForAllCache])
    );

    userRequest[userId]["cacheData"]["urlForUnusualDishes"] = JSON.parse(
      JSON.stringify([...mergeUrlForUnusualDishesAllCashe])
    );

    userRequest[userId]["cacheData"]["url"] = cacheUrl;
  }
}

module.exports = { cacheCheck };
