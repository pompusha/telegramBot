// const { allVariablesFinalText } = require("./allVariablesFinalText");
const {
  keyboardAcceptDecline,
  keyboardForSevenDaysStatistic,
} = require("../keyboard/bot_keyboards");
function createMessageReply(
  dishPortionFromUserMessage,
  dishFromRequest,
  caloriesFromRequestChosenPortion,
  portionFromSource,
  caloriesPerUserPortion,
  nameDishFromRequest
) {
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
          keyboardForSevenDaysStatistic,
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
          // reply_markup: keyboardForSevenDaysStatistic.reply_markup,
        },
      };
    }
  } else {
    console.log(
      "Change message and keyboard here for unusual type of dishes to see what i mean create simple request /white vine tesko 234"
    );
    //
    console.log(dishFromRequest);
    messageReply = dishFromRequest;
    return {
      text: messageReply,
      keyboardAndParseMode: {
        parse_mode: "HTML",
        reply_markup: keyboardAcceptDecline.reply_markup,
      },
      //
    };
  }
  // messageReply = "bla";
  // return messageReply;
}

module.exports = {
  createMessageReply,
};
