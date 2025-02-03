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
const { addDataIntoUserCache } = require("../cache/addDataIntoUserCache");
//
//
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
  dishFromMessage,
  result
) {
  let keyboard;
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

      addDataIntoUserCache(
        userCache,
        preparedDataForAccept[userId]["dishFromRequest"],
        currDate,
        dishFromMessage ? dishFromMessage : ["null"],
        userRequest,
        result["urlForUnusualChoosenDish"]
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
      keyboard = createKeyboard(userRequest, userId);

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
      //
    } else if (queryData === "Previous") {
      console.log("previus !!!!!");

      if (userRequest[userId]["cacheData"]) {
        if (userRequest[userId]["cacheData"]["page"] === "cachePage") {
          messageReply = userRequest[userId]["cacheData"]["text"].reduce(
            (el, acc, index) => {
              return `${index}. ${acc}\n${el}`;
            },
            ""
          );
          console.log(messageReply);
        }
        keyboard = createKeyboard(userRequest, userId);
        return {
          text: messageReply,
          keyboardAndParseMode: {
            parse_mode: "HTML",
            keyboard,
          },
        };
      } else if (userRequest[userId]["data"]) {
        //

        messageReply = userRequest[userId]["data"]["text"][
          userRequest[userId]["data"]["page"]
        ].reduce((el, acc, index) => {
          return `${index}. ${acc}\n${el}`;
        }, "");
        keyboard = createKeyboard(userRequest, userId);
        console.log("!!!!!!!!!!zashelElseif");
        return {
          text: messageReply,
          keyboardAndParseMode: {
            parse_mode: "HTML",
            keyboard,
          },
        };

        //
      } else {
        console.log(
          "previus else doesnt wor because here we should change keyboard not in BOT"
        );
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
    }
  } else {
    return;
  }
}

module.exports = { handlerQueryKeyboard };
