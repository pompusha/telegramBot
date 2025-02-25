const { createMessageReply } = require("../createrMessages/createMessageReply");
// const { summOfCallories } = require("./summOfCallories");
const {
  keyboardForSevenDaysStatistic,
  keyboardAcceptDecline,
} = require("../../keyboard/bot_keyboards");
const { insert } = require("../../database/insert");
const { insertAcceptedData } = require("../../database/insert");
const { postAcceptedDataToDatabase } = require("../../database/statistic");
const { createKeyboard } = require("../../keyboard/bot_keyboards");
const { prevcheckpage } = require("../pagination/prevcheckpage");
const { addDataIntoUserCache } = require("../../cache/addDataIntoUserCache");
const {
  fillArrayWithTextFromRequest,
} = require("../../cache/fillArrayWithTextFromRequest");

function handlerQueryKeyboard(
  preparedDataForAccept,
  queryData,
  userRequest,
  userCache,
  currDate,
  dishFromMessage,
  result
) {
  let pageData = userRequest[userId]["data"]["page"];
  let arrayWithTextFromRequest = fillArrayWithTextFromRequest(
    userRequest,
    pageData
  );

  let messageReply;
  let keyboard;

  if (/\baction\d+/.test(queryData)) {
    return createMessageReply(
      preparedDataForAccept[userId]["dishPortionFromUserMessage"],
      preparedDataForAccept[userId]["dishFromRequest"],
      preparedDataForAccept[userId]["caloriesFromRequestChosenPortion"],
      preparedDataForAccept[userId]["portionFromSource"],
      preparedDataForAccept[userId]["caloriesPerUserPortion"],
      preparedDataForAccept[userId]["nameDishFromRequest"],
      queryData
    );
  } else if (/\w+/g.test(queryData)) {
    if (queryData === "Accept") {
      messageReply = `${preparedDataForAccept[userId]["postAcceptedData"][1]} \n Total Calories: ${preparedDataForAccept[userId]["postAcceptedData"][3]}.\nThis data has been accepted and saved into your statistics.`;

      console.log(
        `preparedDataForAccept :${preparedDataForAccept[userId]["postAcceptedData"]}`
      );

      insert(preparedDataForAccept[userId]["postAcceptedData"]);

      addDataIntoUserCache(
        userCache,
        preparedDataForAccept[userId]["dishFromRequest"],
        currDate,
        dishFromMessage ? dishFromMessage : ["null"],
        userRequest,
        result["urlForUnusualChoosenDish"]
      );
      keyboard = {};
    } else if (queryData === "Decline") {
      [messageReply, keyboard] = prevcheckpage(arrayWithTextFromRequest);
    } else if (queryData === "Next") {
      keyboard = createKeyboard(userRequest, userId);
      messageReply = arrayWithTextFromRequest.reduce((el, acc, index) => {
        return `${el}\n ${index}. ${acc}\n`;
      }, "");
    } else if (queryData === "Previous") {
      [messageReply, keyboard] = prevcheckpage(arrayWithTextFromRequest);
    }

    return {
      text: messageReply,
      keyboardAndParseMode: {
        parse_mode: "HTML",
        keyboard,
      },
    };
  } else {
    return;
  }
}

module.exports = { handlerQueryKeyboard };
