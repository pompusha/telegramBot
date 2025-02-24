const { createKeyboard } = require("../../keyboard/bot_keyboards");

function prevcheckpage(arrayWithTextFromRequest) {
  let messageReply;
  let keyboard;

  if (userRequest[userId]["cacheData"]) {
    if (
      userRequest[userId]["cacheData"]["page"] === "cachePage" &&
      userRequest[userId]["data"]["page"] === 0
    ) {
      messageReply = userRequest[userId]["cacheData"]["text"].reduce(
        (el, acc, index) => {
          return `${el}\n ${index}. ${acc}\n`;
        },
        ""
      );
    } else {
      messageReply = userRequest[userId]["data"]["text"][
        userRequest[userId]["data"]["page"]
      ].reduce((el, acc, index) => {
        return `${el}\n ${index}. ${acc}\n`;
      }, "");
    }
    keyboard = createKeyboard(userRequest, userId);
  } else if (userRequest[userId]["data"]) {
    messageReply = arrayWithTextFromRequest.reduce((el, acc, index) => {
      return `${el}\n ${index}. ${acc}\n`;
    }, "");
    keyboard = createKeyboard(userRequest, userId);
  } else {
    messageReply =
      "Choose something different from the list or write something new.";
  }
  return [messageReply, keyboard];
}

module.exports = { prevcheckpage };
