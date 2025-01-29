// const { createMessageReply } = require("./createMessageReply");
const { summOfCallories } = require("./summOfCallories");

const { deeperRequestForUnusualDish } = require("../api/deeperRequest");
async function allVariables(
  queryData,
  userMessageText,
  //
  userRequestUserId,
  //
  userId,
  urlForUnusualDishes
) {
  let dishFromRequest;
  let urlForUnusualChoosenDish;
  dishPortionFromUserMessage = parseInt(userMessageText.match(/\d+/g));
  // console.log(
  //   "!!!Error dishFromRequest.match(/d+(?=s\bcalories\b)/g) /Warburtons 7"
  // );
  // console.log(userRequestUserId);
  if (userRequestUserId["data"]) {
    dishFromRequest =
      userRequestUserId["data"]["text"][userRequestUserId["data"]["page"]][
        parseInt(queryData.match(/\d/g))
      ].toString();
  }
  if (userRequestUserId["cacheData"]) {
    // console.log("!!!!!!!");
    // console.log(userRequestUserId["cacheData"]["text"][0]);
    // console.log("!!!!!!!");
    if (userRequestUserId["cacheData"]["page"] === "cachePage") {
      // console.log("cache page");
      // console.log(userRequestUserId["cacheData"]["text"][0][0]);
      // console.log("cache page");
      // console.log("parseInt(queryData.match(/d/g))");
      // console.log(parseInt(queryData.match(/\d/g)));
      // console.log("parseInt(queryData.match(/d/g))");
      dishFromRequest =
        userRequestUserId["cacheData"]["text"][
          parseInt(queryData.match(/\d/g))
        ].toString();
    }
  }
  // console.log("------------");
  // console.log(dishFromRequest);
  // console.log("------------");
  // НУжна отладка но не уверен console.log(dishFromRequest);

  caloriesFromRequestChosenPortion = parseInt(
    dishFromRequest.match(/\d+(?=\s\bcalories\b)/g)
  );

  console.log("/cake query 2 SERVING ERROR");
  portionFromSource = dishFromRequest
    .match(/((?<=\bPer\s)(.*)(?=\s\-))/g)
    .toString()
    .match(/\d+\.?(\d+)?(g|\bml)/g);

  if (
    /\d+(\ml|g)/g.test(
      dishFromRequest.match(/((?<=\bPer\s)(.*)(?=\s\-))/g).toString()
    )
  ) {
  } else {
    gramsCalorisFromDeepParse = await deeperRequestForUnusualDish(
      urlForUnusualDishes[0],
      queryData
    );

    portionFromSource =
      gramsCalorisFromDeepParse["gramsForPortionFromDeepParse"];
    caloriesFromRequestChosenPortion =
      gramsCalorisFromDeepParse["callForGramsFromDeepParse"];
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

  if (urlForUnusualDishes.length > 1) {
    urlForUnusualChoosenDish =
      urlForUnusualDishes[parseFloat(queryData.match(/\d+/g))];
  } else {
    urlForUnusualChoosenDish = "deep links are not available.";
  }
  // console.log(parseFloat(queryData.match(/\d+/g)));
  // console.log(urlForUnusualDishes[parseFloat(queryData.match(/\d+/g))]);
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
    urlForUnusualChoosenDish: urlForUnusualChoosenDish,
  };
}

module.exports = {
  allVariables,
};
