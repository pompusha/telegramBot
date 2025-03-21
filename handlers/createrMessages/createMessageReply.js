const {
  keyboardAcceptDecline,
  keyboardForSevenDaysStatistic,
} = require("../../keyboard/bot_keyboards");

function createMessageReply(
  dishPortionFromUserMessage,
  dishFromRequest,
  caloriesFromRequestChosenPortion,
  portionFromSource,
  caloriesPerUserPortion,
  nameDishFromRequest,
  queryData
) {
  const regExpOnlyWords = /[aA-zZ]+/g;
  let strPortionFromSource;

  if (portionFromSource) {
    strPortionFromSource = portionFromSource.toString().replaceAll(" ", "");

    if (regExpOnlyWords.test(portionFromSource)) {
      messageReply = `${queryData
        .match(/\d+/g)
        .toString()}. The dish <i>${nameDishFromRequest}</i> contains <b>${caloriesFromRequestChosenPortion} calories</b> per <b> ${portionFromSource}</b>. Total calories: <b>${Math.floor(
        caloriesPerUserPortion
      )}</b>`;
      keyboard = keyboardAcceptDecline;
      return {
        text: messageReply,
        keyboardAndParseMode: {
          parse_mode: "HTML",
          keyboard,
        },
      };
    } else if (/\d+(g|ml)/.test(strPortionFromSource)) {
      messageReply = `${queryData
        .match(/\d+/g)
        .toString()}. The dish <i>${nameDishFromRequest}</i> contains <b>${caloriesFromRequestChosenPortion} calories</b>
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
