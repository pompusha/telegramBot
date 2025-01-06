// const { allVariablesFinalText } = require("./allVariablesFinalText");
const { keyboardAcceptDecline } = require("../keyboard/bot_keyboards");
function createMessageReply(
  dishPortionFromUserMessage,
  dishFromRequest,
  caloriesFromRequestChosenPortion,
  portionFromSource,
  caloriesPerUserPortion,
  nameDishFromRequest
) {
  // console.log(dishPortionFromUserMessage);
  // console.log(dishFromRequest);
  // console.log(caloriesFromRequestChosenPortion);
  // console.log(portionFromSource);
  // console.log(caloriesPerUserPortion);

  let strPortionFromSource;

  if (portionFromSource) {
    strPortionFromSource = portionFromSource.toString();
    if (/[aA-zZ]{3,}/.test(strPortionFromSource)) {
      messageReply = `The dish <i>${nameDishFromRequest}</i> contains <b>${caloriesFromRequestChosenPortion} calories</b> per <b>${portionFromSource}</b> portion.`;
      return {
        text: messageReply,
        keyboardAndParseMode: {
          parse_mode: "HTML",
          reply_markup: keyboardAcceptDecline.reply_markup,
        },
      };
    } else if (/\d+(g|ml)/.test(strPortionFromSource)) {
      portionFromSource = parseInt(portionFromSource);
      caloriesPerUserPortion = (
        (caloriesFromRequestChosenPortion / portionFromSource) *
        dishPortionFromUserMessage
      ).toFixed(2);
      messageReply = `The dish <i>${nameDishFromRequest}</i> contains <b>${caloriesFromRequestChosenPortion} calories</b>
  per portion of <b>${portionFromSource}g</b>.
  If you consume a portion of <b>${~~dishPortionFromUserMessage}g</b>, it will amount to approximately <b>${~~caloriesPerUserPortion} calories</b>.`;

      return {
        text: messageReply,
        keyboardAndParseMode: {
          parse_mode: "HTML",
          reply_markup: keyboardAcceptDecline.reply_markup,
        },
      };
    }
  } else {
    messageReply = dishFromRequest;
    return {
      text: messageReply,
      keyboardAndParseMode: {
        parse_mode: "HTML",
      },
    };
  }
  // messageReply = "bla";
  // return messageReply;
}

module.exports = {
  createMessageReply,
};
