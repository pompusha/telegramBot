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
  console.log("/cake query 2 SERVING ERROR");
  portionFromSource = dishFromRequest
    .match(/((?<=\bPer\s)(.*)(?=\s\-))/g)
    .toString()
    .match(/\d+\.?(\d+)?(g|\bml)/g);
  console.log(dishFromRequest);
  // if (
  //   /\//g.test(dishFromRequest.match(/((?<=\bPer\s)(.*)(?=\s\-))/g).toString())
  // )
  if (
    /\d+(\ml|g)/g.test(
      dishFromRequest.match(/((?<=\bPer\s)(.*)(?=\s\-))/g).toString()
    )
  ) {
  } else {
    gramsCalorisFromDeepParse = await deeperRequestForUnusualDish(
      userRequestUserIdDataResponse,
      queryData,
      userRequest
    );
    portionFromSource =
      gramsCalorisFromDeepParse["gramsForPortionFromDeepParse"];
    caloriesFromRequestChosenPortion =
      gramsCalorisFromDeepParse["callForGramsFromDeepParse"];
    console.log("validateUnusualValue");
    console.log(gramsCalorisFromDeepParse);
    console.log(portionFromSource);
    // console.log(caloriesFromRequestChosenPortion);
    console.log("validateUnusualValue");
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
