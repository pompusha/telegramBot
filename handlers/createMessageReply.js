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
      keyboard = keyboardAcceptDecline;
      return {
        text: messageReply,
        keyboardAndParseMode: {
          parse_mode: "HTML",
          keyboard,
        },
      };
      // return {
      //   text: messageReply,
      //   keyboardAndParseMode: {
      //     parse_mode: "HTML",
      //     reply_markup: keyboardAcceptDecline,
      //   },
      // };
      //
      //
    } else if (/\d+(g|ml)/.test(strPortionFromSource)) {
      portionFromSource = parseInt(portionFromSource);
      caloriesPerUserPortion = (
        (caloriesFromRequestChosenPortion / portionFromSource) *
        dishPortionFromUserMessage
      ).toFixed(2);
      messageReply = `The dish <i>${nameDishFromRequest}</i> contains <b>${caloriesFromRequestChosenPortion} calories</b>
  per portion of <b>${portionFromSource}g</b>.
  If you consume a portion of <b>${~~dishPortionFromUserMessage}g</b>, it will amount to approximately <b>${~~caloriesPerUserPortion} calories</b>.`;

      keyboard = keyboardAcceptDecline;
      return {
        text: messageReply,
        keyboardAndParseMode: {
          parse_mode: "HTML",
          keyboard,
        },
      };
      //   return {
      //     text: messageReply,
      //     keyboardAndParseMode: {
      //       parse_mode: "HTML",
      //       reply_markup: keyboardAcceptDecline,
      //     },
      //   };
    }
  } else {
    console.log(
      "Change message and keyboard here for unusual type of dishes to see what i mean create simple request /white vine tesko 234"
    );
    messageReply = dishFromRequest;
    //
    keyboard = keyboardAcceptDecline;
    return {
      text: messageReply,
      keyboardAndParseMode: {
        parse_mode: "HTML",
        keyboard,
      },
    };

    //
    // return {
    //   text: messageReply,
    //   keyboardAndParseMode: {
    //     parse_mode: "HTML",
    //     reply_markup: keyboardAcceptDecline,
    //   },
    // };
  }
}

module.exports = {
  createMessageReply,
};
