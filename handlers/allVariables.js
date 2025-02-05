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
  let dishPortionFromUserMessage = parseInt(userMessageText.match(/\d+/g));
  const numberFromQueruData = parseFloat(queryData.match(/\d+/g).toString());
  // console.log(numberFromQueruData);
  // if (userRequestUserId["cacheData"]["page"] === "cachePage"){}
  if (userRequestUserId["data"]["text"]) {
    // console.log("allVariables");
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
  // console.log("!!!!!!!");
  // console.log(caloriesFromRequestChosenPortion);
  // console.log("!!!!!!!");
  // console.log("/cake query 2 SERVING ERROR");
  portionFromSource = dishFromRequest
    .match(/((?<=\bPer\s)(.*)(?=\s\-))/g)
    .toString()
    .match(/\d+\.?(\d+)\s?(g|\bml)/g);

  // console.log("++++++++++++++");
  // console.log(portionFromSource);
  // console.log("++++++++++++++");
  // console.log("!!!!!!!");
  // console.log(
  //   /\d+/g.test(dishFromRequest.match(/((?<=\bPer\s)(.*)(?=\s\-))/g).toString())
  // );
  // console.log("!!!!!!!");
  if (
    /\d+/g.test(dishFromRequest.match(/((?<=\bPer\s)(.*)(?=\s\-))/g).toString())
  ) {
    // console.log("allVariables");
  } else {
    console.log(
      `allVariables.js something thor into non digts zone ${dishFromRequest}`
    );
    let cashOrDownoladed;
    if (userRequestUserId["cacheData"]) {
      if (userRequestUserId["cacheData"]["page"] === "cachePage") {
        cashOrDownoladed =
          userRequestUserId["cacheData"]["urlForUnusualDishes"][
            numberFromQueruData
          ];
        console.log("cache");
        console.log(`allvariables.js cashOrDownoladed :${cashOrDownoladed}`);
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
      // console.log(
      //   "Такое ощущение что тут ошибка и он дробит юрл как то криво allvariables.js"
      // );
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
