const { allVariables } = require("./allVariables");
const { createMessageReply } = require("./createMessageReply");
const { summOfCallories } = require("./summOfCallories");
const { keyboardAcceptDecline } = require("../keyboard/bot_keyboards");
function handlerQueryKeyboard(
  preparedDataForAccept,
  queryData,
  userMessageText,
  userRequest,
  // queryMessageChatId,
  userId
) {
  console.log(
    "!!!!!!!!!!!EBANAT U TEBIA /0 =>0 porcia 1.3 a vidaet 3g isparavit NE ZABYD !!!!!!!!!"
  );
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
      // console.log(insertIntoDataBase);
      // console.log("Accepted");

      // console.log(preparedDataForAccept[userId]["postAcceptedData"]);
      messageReply = "That data is Accepted and saved into your Statistik";
      return {
        text: messageReply,
        keyboardAndParseMode: {
          parse_mode: "HTML",
        },
      };
    } else {
      messageReply =
        "Choose something different from the list or write something new.";
      return {
        text: messageReply,
        keyboardAndParseMode: {
          parse_mode: "HTML",
        },
      };
    }
  } else {
    return;
  }
}

module.exports = { handlerQueryKeyboard };
