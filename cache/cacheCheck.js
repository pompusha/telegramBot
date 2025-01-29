const { getProductCalories } = require("../api/getProductCalories");

async function cacheCheck(userCache, dishFromMessage, userRequest) {
  // console.log("-");
  // console.log(userCache[userId]);
  // console.log("-");
  // let b = [];
  let mergeTextForAllCache = [];
  let mergeUrlForUnusualDishesAllCashe = [];
  let cacheUrl;
  let keysFromCasheWithCurrDate = Object.keys(userCache[userId]);
  if (userCache[userId]) {
    keysFromCasheWithCurrDate.forEach((el) => {
      if (dishFromMessage in userCache[userId][el]) {
        // mergeTextForAllCache.push(
        //   ...userCache[userId][el][dishFromMessage]["data"]["text"]
        // );
        //
        let arrayFromSetText = [
          ...userCache[userId][el][dishFromMessage]["data"]["text"],
        ];
        arrayFromSetText.forEach((el) => {
          mergeTextForAllCache = [
            ...new Set([...mergeTextForAllCache, `${el}`]),
          ];
          // c = new Set(b);
          // c = [...c];
        });

        let arrayFromSetUrlForUnusualDishes = [
          ...userCache[userId][el][dishFromMessage]["data"][
            "urlForUnusualDishes"
          ],
        ];
        console.log(arrayFromSetUrlForUnusualDishes);
        arrayFromSetUrlForUnusualDishes.forEach((el) => {
          mergeUrlForUnusualDishesAllCashe = [
            ...new Set([...mergeUrlForUnusualDishesAllCashe, `${el}`]),
          ];
        });
        //
        //
        // mergeUrlForUnusualDishesAllCashe.push(
        //   ...userCache[userId][el][dishFromMessage]["data"][
        //     "urlForUnusualDishes"
        //   ]
        // );

        if (userCache[userId][el][dishFromMessage]["data"]["url"]) {
          cacheUrl = userCache[userId][el][dishFromMessage]["data"]["url"];
        }
      }
    });
  }
  // console.log("bbbbbbbbbbbbb");
  // console.log(b);
  // console.log("bbbbbbbbbbbbb");
  //
  // console.log("MMMMMMMM");
  // console.log(mergeUrlForUnusualDishesAllCashe);
  // console.log("MMMMMMMM");
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

    // console.log("need to change page 0 to cashePage");

    userRequest[userId] = {
      data: { page: 0 },
    };
    //
    userRequest[userId]["cacheData"] = { page: "cachePage" };
    // userRequest[userId]["cacheData"]["text"] = new Set();
    userRequest[userId]["cacheData"]["text"] = JSON.parse(
      JSON.stringify([...mergeTextForAllCache])
    );

    userRequest[userId]["cacheData"]["urlForUnusualDishes"] = JSON.parse(
      JSON.stringify([...mergeUrlForUnusualDishesAllCashe])
    );
    //
    userRequest[userId]["data"]["text"] = JSON.parse(
      JSON.stringify([[...mergeTextForAllCache]])
    );
    userRequest[userId]["data"]["urlForUnusualDishes"] = JSON.parse(
      JSON.stringify([...mergeUrlForUnusualDishesAllCashe])
    );

    userRequest[userId]["cacheData"]["url"] = cacheUrl;
    userRequest[userId]["data"]["url"] = cacheUrl;
    // console.log("!!!!!!!");
    // console.log(userRequest);
    // console.log("!!!!!!!");
    // console.log("000000");
    // console.log(userRequest[userId]["cacheData"]["text"]);
    // console.log("000000");
  }
}
//
//
module.exports = { cacheCheck };
