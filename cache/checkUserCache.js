const { cacheCheck } = require("./cacheCheck");
async function checkUserCache(
  userId,
  currDate,
  userMessageText,
  dishFromMessage,
  userCache,
  userRequest,
  msgText
) {
  if (!userCache[userId]) {
    userCache[userId] = {};
  }
  if (!userCache[userId][currDate]) {
    userCache[userId][currDate] = {};
  }
  if (!userCache[userId][currDate][dishFromMessage]) {
    userCache[userId][currDate][dishFromMessage] = {
      data: {
        text: new Set(),
        urlForUnusualDishes: [],
        page: 0,
        url: "",
      },
    };
    //
    //
  }
  if (
    userCache[userId][currDate][dishFromMessage]["data"]["text"].size === 0 ||
    userCache[userId][currDate][dishFromMessage]["data"]["text"].size > 0
  ) {
    await cacheCheck(userCache, dishFromMessage, userRequest);
  }
}

module.exports = { checkUserCache };
