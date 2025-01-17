// const { createMessageReply } = require("./createMessageReply");
const { summOfCallories } = require("./summOfCallories");
// const { validateUnusualValue } = require("./validateUnusualValue");
const { deeperRequestForUnusualDish } = require("../api/deeperRequest");
async function allVariables(
  queryData,
  userMessageText,
  userRequest,
  userId,
  userRequestUserIdDataResponse
) {
  dishPortionFromUserMessage = parseInt(userMessageText.match(/\d+/g));
  console.log(
    "!!!Error dishFromRequest.match(/d+(?=s\bcalories\b)/g) /Warburtons 7"
  );
  dishFromRequest = userRequest[parseInt(queryData.match(/\d/g))];
  // НУжна отладка но не уверен console.log(dishFromRequest);
  caloriesFromRequestChosenPortion = parseInt(
    dishFromRequest.match(/\d+(?=\s\bcalories\b)/g)
  );
  // console.log(caloriesFromRequestChosenPortion);
  // БЕз нареканий console.log(caloriesFromRequestChosenPortion);
  // console.log(
  //   "/234gpotato tkni 1 <   Calories in Sainsbury's Santa's Grotto Sweets Selection 250g Frosty Foams Per 1/2 pack - 76 calories | 0.1 fat"
  // );
  portionFromSource = dishFromRequest.match(
    /(?<=\bpot\s\()\d+(g|ml)|\d+(g|ml)((?=\)\s-))|(?<=\bPer\s)\d+(g|ml)|((?<=\bPer\s)\w+(?=\s-))/g
  );

  if (
    /\//g.test(dishFromRequest.match(/((?<=\bPer\s)(.*)(?=\s\-))/g).toString())
  ) {
    console.log(dishFromRequest);
    gramsCalorisFromDeepParse = await deeperRequestForUnusualDish(
      userRequestUserIdDataResponse,
      queryData,
      userRequest
    );
    portionFromSource =
      gramsCalorisFromDeepParse["gramsForPortionFromDeepParse"];
    caloriesFromRequestChosenPortion =
      gramsCalorisFromDeepParse["callForGramsFromDeepParse"];
    // console.log("validateUnusualValue");
    // console.log(gramsCalorisFromDeepParse);
    // console.log(portionFromSource);
    // console.log(caloriesFromRequestChosenPortion);
    // console.log("validateUnusualValue");
  }

  caloriesPerUserPortion = summOfCallories(
    caloriesFromRequestChosenPortion,
    portionFromSource,
    dishPortionFromUserMessage
  );
  userIdFromTelegramm = userId;

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
