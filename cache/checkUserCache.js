const { getProductCalories } = require("../api/getProductCalories");

async function checkUserCache(
  userId,
  currDate,
  userMessageText,
  dishFromMessage,
  userCache,
  userRequest,
  msgText
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
  }
  if (
    userCache[userId][currDate][dishFromMessage] &&
    userCache[userId][currDate][dishFromMessage]["data"]["text"].size > 0
  ) {
    console.log("checkUserCache past SIZE test");
    let keyUserCasheDishFromUserMessage = Object.keys(
      userCache[userId][currDate]
    );
    // userMessageText[userId] = { text: keyUserCasheDishFromUserMessage };
    userRequest[userId]["data"]["text"] = [
      ...userCache[userId][currDate][dishFromMessage]["data"]["text"],
    ];
  }
  if (
    // userCache[userId][currDate][dishFromMessage] &&
    userCache[userId][currDate][dishFromMessage]["data"]["text"].size === 0
  ) {
    // console.log(
    //   userCache[userId][currDate][dishFromMessage]["data"]["text"].size
    // );
    console.log("cachau");
    // let testUserReq = {};
    // let a = {};
    // a[userId] = { text: msgText };
    userRequest[userId] = {
      data: await getProductCalories(`desc=${dishFromMessage}`),
    };

    // userMessageText[userId] = { text: msgText };
    // userRequest[userId] = {
    //   data: await getProductCalories(`desc=${dishFromMessage}`),
    // };
    // console.log("AAAAAAAAAAAAAAA");
    // console.log(userRequest[userId]["data"]["urlForUnusualDishes"][3]);
    // console.log(userRequest[userId]["data"][" urlForUnusualDishes"]);
    // console.log("AAAAAAAAAAAAAAA");
  }
  // console.log(
  //   userCache[userId][currDate][dishFromMessage]["data"]["text"].size
  // );
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
