function addDataIntoUserCache(
  userCache,
  dishFromRequest,
  currDate,
  dishFromMessage,
  userRequest
) {
  // userCache[userId][currDate][dishFromMessage]["data"]["response"] = userRequest[userId]["data"]["response"]
  // };
  // );
  // userRequest;
  // console.log(Array.isArray(userRequestFUll[userId]["data"]["response"]));
  // console.log(userRequestFUll[userId]);
  userCache[userId][currDate][dishFromMessage]["data"]["url"] = JSON.parse(
    JSON.stringify(userRequest[userId]["data"]["url"])
  );
  // userCache[userId][currDate][dishFromMessage]["data"]["url"] = {
  //   ...userRequestFUll[userId]["data"]["url"],
  // };

  // ["text"] = Set конвертируй в Array
  // dishFromMessage ? dishFromMessage[0] : ["null"], заплатка стоит если будет тупить выдернуть чеку
  // userCache[userId][currDate][dishFromMessage]["data"]["text"].add(
  //   dishFromRequest
  // );
  // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  // console.log(dishFromRequest);
  // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  userCache[userId][currDate][dishFromMessage]["data"]["text"].add(
    JSON.parse(JSON.stringify(dishFromRequest))
  );
  console.log(userCache[userId][currDate][dishFromMessage]);
  // console.log(JSON.stringify(userCache));

  //
  //
  //
  // console.log(dishFromRequest);
  // console.log("+++++++++++++++++++++");
  // console.log(userCache[userId][currDate]);
  // console.log("_________________________________");
  // console.log(userCache[userId][currDate][dishFromMessage]["data"]["text"]);
}

module.exports = { addDataIntoUserCache };
