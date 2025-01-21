function checkUserCache(
  userId,
  currDate,
  userMessageText,
  dishFromMessage,
  userCache,
  userRequest
) {
  // console.log("SYKA");
  if (!userCache[userId]) {
    userCache[userId] = {};
    // console.log("userID");
  }
  if (!userCache[userId][currDate]) {
    userCache[userId][currDate] = {};
    // console.log("currDate");
  }
  //  id: { date: { dishFromMessage: [results, result], meet: [results, result] } },
  if (!userCache[userId][currDate][dishFromMessage]) {
    userCache[userId][currDate][dishFromMessage] = {
      data: { text: new Set() },
    };
  } else if (
    userCache[userId][currDate][dishFromMessage] &&
    userCache[userId][currDate][dishFromMessage]["data"]["text"].size > 0
  ) {
    console.log("checkUserCache past SIZE test");
    let keyUserCasheDishFromUserMessage = Object.keys(
      userCache[userId][currDate]
    );
    userMessageText[userId] = { text: keyUserCasheDishFromUserMessage };
    userRequest[userId]["data"]["text"] = [
      ...userCache[userId][currDate][dishFromMessage]["data"]["text"],
    ];

    console.log("SYAKKAKAKAKAKAKKA");
    console.log(userRequest[userId]);
    console.log(userRequest[userId]);
    console.log("SYAKKAKAKAKAKAKKA");
  }
}
// {
//   '339084941': {
//     data: {
//       response: [Object],
//       url: 'https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=potato',
//       text: [Array]
//     }
//   }
// }
// checkUserCache();

module.exports = { checkUserCache };
