function addDataIntoUserCache(
  userCache,
  dishFromRequest,
  currDate,
  dishFromMessage,
  userRequest,
  urlForUnusualChoosenDish
) {
  const page = userRequest[userId]["data"]["page"];
  let url;
  let urlDeepCheck;
  let text;

  if (userRequest[userId]["cacheData"]) {
    if (userRequest[userId]["cacheData"]["page"] === "cachePage") {
      url = userRequest[userId]["cacheData"]["url"];
      // urlDeepCheck = userRequest[userId]["cacheData"]["urlForUnusualDishes"];
    } else if (userRequest[userId]["cacheData"]["page"] === "downloaded") {
      url = userRequest[userId]["data"]["url"];
      // urlDeepCheck = userRequest[userId]["data"]["urlForUnusualDishes"];
      // text = userRequest[userId]["data"]["text"][page];
      // console.log(url);

      // console.log(urlDeepCheck);
      // console.log(text);
      // console.log(page);
    }
  } else {
    url = userRequest[userId]["data"]["url"];
  }

  userCache[userId][currDate][dishFromMessage]["data"]["url"] = JSON.parse(
    JSON.stringify(url)
  );

  userCache[userId][currDate][dishFromMessage]["data"]["urlForUnusualDishes"] =
    [
      ...new Set([
        ...userCache[userId][currDate][dishFromMessage]["data"][
          "urlForUnusualDishes"
        ],
        `${urlForUnusualChoosenDish}`,
      ]),
    ];
  //

  //
  userCache[userId][currDate][dishFromMessage]["data"]["text"].add([
    JSON.parse(JSON.stringify(dishFromRequest)),
  ]);

  // console.log(userRequest[userId]["cacheData"]);
  // console.log("addadatUserChache");
  //
}

module.exports = { addDataIntoUserCache };
