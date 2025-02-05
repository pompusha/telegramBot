// const { createMessageReply } = require("./createMessageReply");
const { summOfCallories } = require("./summOfCallories");

const { deeperRequestForUnusualDish } = require("../api/deeperRequest");
async function allVariables(
  queryData,
  userMessageText,
  //
  userRequestUserId
  //
  // userId
  //
) {
  let dishFromRequest;
  let urlForUnusualChoosenDish;
  dishPortionFromUserMessage = parseInt(userMessageText.match(/\d+/g));

  // if (userRequestUserId["cacheData"]["page"] === "cachePage"){}
  if (userRequestUserId["data"]["text"]) {
    dishFromRequest =
      userRequestUserId["data"]["text"][userRequestUserId["data"]["page"]][
        parseInt(queryData.match(/\d/g))
      ].toString();
  }
  if (userRequestUserId["cacheData"]) {
    if (userRequestUserId["cacheData"]["page"] === "cachePage") {
      dishFromRequest =
        userRequestUserId["cacheData"]["text"][
          parseInt(queryData.match(/\d/g))
        ].toString();
    }
  }

  // НУжна отладка но не уверен console.log(dishFromRequest);

  caloriesFromRequestChosenPortion = parseInt(
    dishFromRequest.match(/\d+(?=\s\bcalories\b)/g)
  );

  // console.log("/cake query 2 SERVING ERROR");
  portionFromSource = dishFromRequest
    .match(/((?<=\bPer\s)(.*)(?=\s\-))/g)
    .toString()
    .match(/\d+\.?(\d+)?(g|\bml)/g);

  //
  //
  if (
    /\d+(\ml|g)/g.test(
      dishFromRequest.match(/((?<=\bPer\s)(.*)(?=\s\-))/g).toString()
    )
  ) {
  } else {
    let cashOrDownoladed;
    if (userRequestUserId["cacheData"]) {
      if (userRequestUserId["cacheData"]["page"] === "cachePage") {
        console.log("cache");
        cashOrDownoladed = userRequestUserId["data"]["urlForUnusualDishes"][0];
      } else if (userRequestUserId["cacheData"]["page"] === "downloaded") {
        console.log("download");
        cashOrDownoladed =
          userRequestUserId["data"]["urlForUnusualDishes"][
            userRequestUserId["data"]["page"]
          ][parseInt(queryData.match(/\d/g))];
      }
    } else {
      console.log("else downloaded");
      cashOrDownoladed =
        userRequestUserId["data"]["urlForUnusualDishes"][
          userRequestUserId["data"]["page"]
        ][parseInt(queryData.match(/\d/g))];
    }
    //
    //
    //
    console.log(userRequestUserId["data"]["url"]);
    gramsCalorisFromDeepParse = await deeperRequestForUnusualDish(
      cashOrDownoladed,
      // userRequestUserId["data"]["urlForUnusualDishes"][
      //   userRequestUserId["data"]["page"]
      // ][parseInt(queryData.match(/\d/g))],
      // urlForUnusualDishes[0],
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

  // userRequestUserId["data"]["urlForUnusualDishes"][
  //   userRequestUserId["data"]["page"]
  // ][parseInt(queryData.match(/\d/g))];
  //
  //
  //
  if (userRequestUserId["data"]["urlForUnusualDishes"]) {
    if (
      userRequestUserId["data"]["urlForUnusualDishes"][
        userRequestUserId["data"]["page"]
      ].length > 1
    ) {
      console.log(
        "Такое ощущение что тут ошибка и он дробит юрл как то криво allvariables.js"
      );
      urlForUnusualChoosenDish =
        userRequestUserId["data"]["urlForUnusualDishes"][
          userRequestUserId["data"]["page"]
        ][parseInt(queryData.match(/\d/g))];
      //
      console.log(
        `urlForUnusualChoosenDish: ${urlForUnusualChoosenDish} allVariables`
      );
    }
  } else {
    urlForUnusualChoosenDish = ["deep links are not available."];
  }
  //
  //
  //

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
