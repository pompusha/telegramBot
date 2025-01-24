function addDataIntoUserCache(
  userCache,
  dishFromRequest,
  currDate,
  dishFromMessage,
  userRequest,
  urlForUnusualChoosenDish
) {
  userCache[userId][currDate][dishFromMessage]["data"]["url"] = JSON.parse(
    JSON.stringify(userRequest[userId]["data"]["url"])
  );

  userCache[userId][currDate][dishFromMessage]["data"][
    "urlForUnusualDishes"
  ].add(JSON.parse(JSON.stringify(urlForUnusualChoosenDish)));
  userCache[userId][currDate][dishFromMessage]["data"]["text"].add(
    JSON.parse(JSON.stringify(dishFromRequest))
  );
  console.log("++++++++++++++++++++");
  console.log(userCache[userId][currDate][dishFromMessage]);
  console.log("++++++++++++++++++++");
}

module.exports = { addDataIntoUserCache };
