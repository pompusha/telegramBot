function cacheFirstMessage(userRequest) {
  let page;
  let firstAnswer;

  if (userRequest[userId]["cacheData"]) {
    if (userRequest[userId]["cacheData"]["page"] === "cachePage") {
      firstAnswer = userRequest[userId]["cacheData"]["text"];

      return firstAnswer;
    }
  } else {
    page = userRequest[userId]["data"]["page"];

    firstAnswer = userRequest[userId]["data"]["text"][page];

    return firstAnswer;
  }
}

module.exports = { cacheFirstMessage };
