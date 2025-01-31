function cacheFirstMessage(userRequest) {
  let page;
  let firstAnswer;
  // console.log("111111111111111111111");
  // console.log(JSON.stringify(userRequest));
  // console.log("11111111111111111111");
  if (userRequest[userId]["cacheData"]) {
    console.log("1");
    if (userRequest[userId]["cacheData"]["page"] === "cachePage") {
      // console.log("Выбирает первый массив с перечнем из кеша");
      // console.log(userRequest[userId]["cacheData"]["text"]);
      // console.log("Выбирает первый массив с перечнем из кеша");
      firstAnswer = userRequest[userId]["cacheData"]["text"];
      return firstAnswer;
    }
  } else {
    page = userRequest[userId]["data"]["page"];
    console.log("Выбирает первое сообщение в массиве если нет кеша");
    console.log(userRequest[userId]["data"]["text"][0]);
    console.log("Выбирает первое сообщение в массиве если нет кеша");
    firstAnswer = userRequest[userId]["data"]["text"][page];
    return firstAnswer;
  }
  // console.log("cacheFirstMessage");
  // console.log(userRequest);
  // console.log("cacheFirstMessage");
}

module.exports = { cacheFirstMessage };
