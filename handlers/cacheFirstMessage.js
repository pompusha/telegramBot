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
    // console.log("Выбирает первое сообщение в массиве если нет кеша");
    // console.log(userRequest[userId]["data"]["text"][userRequest[userId]["data"]["text"]]);
    // console.log("Выбирает первое сообщение в массиве если нет кеша");
    firstAnswer = userRequest[userId]["data"]["text"][page];

    return firstAnswer;
  }
}

module.exports = { cacheFirstMessage };
