async function controlPrefiousPage(userRequest) {
  if (userRequest[userId]) {
    if (userRequest[userId]["data"]["page"] > 0) {
      userRequest[userId]["data"]["page"] =
        userRequest[userId]["data"]["page"] - 1;
    } else if (userRequest[userId]["data"]["page"] === 0) {
      if (userRequest[userId]["cacheData"]) {
        if (userRequest[userId]["cacheData"]["text"]) {
          userRequest[userId]["cacheData"]["page"] = "cachePage";
        }
      } else {
        return;
      }
    }
  }
}

module.exports = { controlPrefiousPage };
