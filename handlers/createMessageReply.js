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
  // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  // console.log(dishPortionFromUserMessage);
  // console.log(dishFromRequest);
  // console.log(caloriesFromRequestChosenPortion);
  // //
  // console.log(portionFromSource);
  // //
  // console.log(caloriesPerUserPortion);
  // console.log(nameDishFromRequest);
  // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

  let strPortionFromSource;

  if (portionFromSource) {
    strPortionFromSource = portionFromSource.toString().replaceAll(" ", "");

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
    } else if (/\d+(g|ml)/.test(strPortionFromSource)) {
      messageReply = `The dish <i>${nameDishFromRequest}</i> contains <b>${caloriesFromRequestChosenPortion} calories</b>
per portion of <b>${portionFromSource}</b>.
If you consume a portion of <b>${~~dishPortionFromUserMessage}g</b>, it will amount to approximately <b>${~~caloriesPerUserPortion} calories</b>.`;

      keyboard = keyboardAcceptDecline;
      return {
        text: messageReply,
        keyboardAndParseMode: {
          parse_mode: "HTML",
          keyboard,
        },
      };
    }
  } else {
    console.log(
      "Change message and keyboard here for unusual type of dishes to see what i mean create simple request /white vine tesko 234"
    );
    messageReply = dishFromRequest;
    keyboard = keyboardAcceptDecline;
    return {
      text: messageReply,
      keyboardAndParseMode: {
        parse_mode: "HTML",
        keyboard,
      },
    };
  }
}

module.exports = {
  createMessageReply,
};
