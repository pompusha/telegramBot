// const { createMessageReply } = require("./createMessageReply");
const { summOfCallories } = require("./summOfCallories");

function allVariables(queryData, userMessageText, userRequest, userId) {
  dishPortionFromUserMessage = parseInt(userMessageText.match(/\d+/g));
  //  dishFromRequest.match(/\d+(?=\s\bcalories\b)/g)
  console.log(
    "!!!Error dishFromRequest.match(/d+(?=s\bcalories\b)/g) /Warburtons 7"
  );
  dishFromRequest = userRequest[parseInt(queryData.match(/\d/g))];
  caloriesFromRequestChosenPortion = parseInt(
    dishFromRequest.match(/\d+(?=\s\bcalories\b)/g)
  );
  portionFromSource = dishFromRequest.match(
    /(?<=\bpot\s\()\d+(g|ml)|\d+(g|ml)((?=\)\s-))|(?<=\bPer\s)\d+(g|ml)|((?<=\bPer\s)\w+(?=\s-))/g
  );
  caloriesPerUserPortion = summOfCallories(
    caloriesFromRequestChosenPortion,
    portionFromSource,
    dishPortionFromUserMessage
  );
  userIdFromTelegramm = userId;
  //
  //
  nameDishFromRequest = dishFromRequest
    .match(/(?<=\bin\s)(.*)(?=\bPer)/g)
    .toString()
    .trim();

  postAcceptedData = [
    userIdFromTelegramm,
    nameDishFromRequest,
    // dishFromRequest,
    dishPortionFromUserMessage,
    caloriesFromRequestChosenPortion,
  ];
  return {
    dishPortionFromUserMessage: dishPortionFromUserMessage,
    dishFromRequest: dishFromRequest,
    caloriesFromRequestChosenPortion: caloriesFromRequestChosenPortion,
    portionFromSource: portionFromSource,
    caloriesPerUserPortion: caloriesPerUserPortion,
    postAcceptedData: postAcceptedData,
    nameDishFromRequest: nameDishFromRequest,
  };
}

module.exports = {
  allVariables,
};
