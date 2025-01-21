// const { allVariables } = require("./allVariables");
const { createMessageReply } = require("./createMessageReply");
// const { summOfCallories } = require("./summOfCallories");
const {
  keyboardForSevenDaysStatistic,
  keyboardAcceptDecline,
} = require("../keyboard/bot_keyboards");
const { insert } = require("../database/insert");
const { insertAcceptedData } = require("../database/insert");
const { postAcceptedDataToDatabase } = require("../database/statistic");
const { createKeyboard } = require("../keyboard/bot_keyboards");
const { pagination } = require("../api/pagination");
const { addDataIntoUserCache } = require("../cache/addDataIntoUserCache");
// userRequestUserIdDataText"]
// userRequest
function handlerQueryKeyboard(
  preparedDataForAccept,
  queryData,
  userMessageText,
  userRequestUserIdDataText,
  userId,
  currentUrl,
  userRequest,
  userCache,
  currDate,
  dishFromMessage
) {
  // console.log(
  //   "!!!MISTAKES TEBIA /0 =>0 porcia 1.3 a vidaet 3g isparavit NE ZABYD !"
  // );

  // console.log(`handlerQueryKeyboard :${queryData}`);

  // console.log(userMessageText);
  // if (userMessageText === "Average Calories (7 Days)") {
  // console.log("send Average Calories (7 Days)");

  if (/\w+\d/g.test(queryData)) {
    return createMessageReply(
      preparedDataForAccept[userId]["dishPortionFromUserMessage"],
      preparedDataForAccept[userId]["dishFromRequest"],
      preparedDataForAccept[userId]["caloriesFromRequestChosenPortion"],
      preparedDataForAccept[userId]["portionFromSource"],
      preparedDataForAccept[userId]["caloriesPerUserPortion"],
      preparedDataForAccept[userId]["nameDishFromRequest"]
    );
  } else if (/\w+/g.test(queryData)) {
    if (queryData === "Accept") {
      messageReply = "That data is Accepted and saved into your Statistik";
      console.log(dishFromMessage);
      addDataIntoUserCache(
        userCache,
        preparedDataForAccept[userId]["dishFromRequest"],
        currDate,
        dishFromMessage ? dishFromMessage[0] : ["null"],
        userRequest
      );
      keyboard = {};
      return {
        text: messageReply,
        keyboardAndParseMode: {
          parse_mode: "HTML",
          keyboard,
        },
      };
    } else if (queryData === "Next") {
      let keyboard = createKeyboard(userRequest, userId);
      console.log(`handlequery v Next : ${queryData}`);

      messageReply = userRequestUserIdDataText.reduce((el, acc, index) => {
        return `${index}. ${acc}\n${el}`;
      }, "");

      return {
        text: messageReply,
        keyboardAndParseMode: {
          parse_mode: "HTML",
          keyboard,
        },
      };
    } else if (queryData === "Previous") {
      //
      // console.log(`handlequery v Prev : ${queryData}`);
      let reply_markup = createKeyboard(userRequest, userId);
      // console.log("handlequery Previous");

      // console.log(a);
      messageReply = userRequestUserIdDataText.reduce((el, acc, index) => {
        return `${index}. ${acc}\n${el}`;
      }, "");

      keyboard = createKeyboard(userRequest, userId);
      return {
        text: messageReply,
        keyboardAndParseMode: {
          parse_mode: "HTML",
          keyboard,
        },
      };

      //
    } else {
      messageReply =
        "Choose something different from the list or write something new.";
      return {
        text: messageReply,
        keyboardAndParseMode: {
          parse_mode: "HTML",
          keyboard,
        },
      };
    }
    //

    //
  } else {
    return;
  }
}

module.exports = { handlerQueryKeyboard };
