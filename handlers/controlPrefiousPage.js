// controlPrefiousPage

async function controlPrefiousPage(userRequest) {
  if (userRequest[userId]) {
    if (userRequest[userId]["data"]["page"] > 0) {
      userRequest[userId]["data"]["page"] =
        userRequest[userId]["data"]["page"] - 1;
    } else if (userRequest[userId]["data"]["page"] === 0) {
      //
      // console.log(userRequest[userId]["cacheData"]);
      //
      if (userRequest[userId]["cacheData"]) {
        if (userRequest[userId]["cacheData"]["text"]) {
          userRequest[userId]["cacheData"]["page"] = "cachePage";
          console.log("буду испольщовать кэшь обратно");
        }
      } else {
        return;
      }
    }

    console.log(`page ${userRequest[userId]["data"]["page"]}`);

    //
  }
}
//
//
module.exports = { controlPrefiousPage };
