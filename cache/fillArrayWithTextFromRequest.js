function fillArrayWithTextFromRequest(userRequest, pageData) {
  let arrayWithTextFromRequest;
  if (userRequest[userId]["data"]["text"]) {
    if (userRequest[userId]["cacheData"]) {
      if (userRequest[userId]["cacheData"]["page"] === "downloaded") {
        arrayWithTextFromRequest =
          userRequest[userId]["data"]["text"][pageData];
      }
    } else {
      arrayWithTextFromRequest = userRequest[userId]["data"]["text"][pageData];
    }
  } else if (
    userRequest[userId]["cacheData"] &&
    userRequest[userId]["cacheData"]["page"] === "cachePage"
  ) {
    arrayWithTextFromRequest =
      userRequest[userId]["cacheData"]["text"][pageData];
  }

  return arrayWithTextFromRequest;
}

module.exports = { fillArrayWithTextFromRequest };
