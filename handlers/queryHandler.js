const {
  handlerQueryKeyboard,
} = require("./AllfunctionhandlerQueryKeyboard/handlerQueryKeyboard");

const {
  allVariables,
} = require("./AllfunctionhandlerQueryKeyboard/allVariablesmodules/allVariables");

const { nextPrevPage } = require("./pagination/nextPrevPage");

async function queryHandler(
  userRequest,
  query,
  userMessageText,
  preparedDataForAccept,
  userCache,
  currDate,
  dishFromMessage,
  result
) {
  let messageText;
  if (query.data && userMessageText) {
    await nextPrevPage(userRequest, query);

    if (Object.keys(userRequest) != 0) {
      if (query.data.match("action")) {
        result = await allVariables(
          query.data,
          userMessageText[userId]["text"],
          userRequest[userId]
        );
        preparedDataForAccept = {
          ...preparedDataForAccept,
          [userId]: result,
        };
      }

      messageText = handlerQueryKeyboard(
        preparedDataForAccept,
        query.data,
        userRequest,
        userCache,
        currDate,
        dishFromMessage,
        result
      );
    } else {
      messageText =
        "Please write the name of the dish you'd like to calculate calories for.";
    }
    return { messageText, preparedDataForAccept };
  }
}

module.exports = { queryHandler };
