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
    } else if (userRequest[userId]["cacheData"]["page"] === "downloaded") {
      url = userRequest[userId]["data"]["url"];
    }
  } else {
    url = userRequest[userId]["data"]["url"];
  }

  if (userCache[userId][currDate][dishFromMessage]?.["data"]) {
    userCache[userId][currDate][dishFromMessage]["data"]["url"] = JSON.parse(
      JSON.stringify(url)
    );

    userCache[userId][currDate][dishFromMessage]["data"][
      "urlForUnusualDishes"
    ] = [
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
    // ВоТ эта сука
  }
  // ВоТ эта сука
}

module.exports = { addDataIntoUserCache };
