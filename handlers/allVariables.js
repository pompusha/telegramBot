const { createMessageReply } = require("./createMessageReply");
const { summOfCallories } = require("./summOfCallories");

function allVariables(queryData, userMessageText, userRequest, userId) {
  // console.log(queryData);
  // console.log(userMessageText);
  // console.log(userRequest);
  // console.log(queryMessageChatId);
  // console.log(userId);
  dishPortionFromUserMessage = parseInt(userMessageText.match(/\d+/g));
  dishFromRequest = userRequest[parseInt(queryData.match(/\d/g))];
  // console.log(dishFromRequest);
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
  nameDishFromRequest = dishFromRequest.match(/(?<=\bin\s)(.*)(?=\bPer)/g);
  // (?<=\s\bin\s)(\w+,?\s?\&?\s?)+
  //
  //
  postAcceptedData = [
    userIdFromTelegramm,
    dishFromRequest,
    dishPortionFromUserMessage,
    caloriesFromRequestChosenPortion,
    nameDishFromRequest,
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
