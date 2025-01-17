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
  // console.log(`portionFromSource : ${portionFromSource}  createmessage`);
  // console.log(`parseFloat : ${parseFloat(["1/2"])}`);
  // console.log(parseFloat("1/2"));
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
