// const { createMessageReply } = require("./createMessageReply");
const { summOfCallories } = require("./summOfCallories");

const { deeperRequestForUnusualDish } = require("../api/deeperRequest");
async function allVariables(
  queryData,
  userMessageText,
  //
  userRequestUserId,
  //
  userId
  //
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
  console.log("============");
  // console.log(userRequestUserId["data"]["urlForUnusualDishes"]);
  // console.log("------------");
  // console.log(userRequestUserId);
  // console.log("------------");
  console.log(
    userRequestUserId["data"]["urlForUnusualDishes"][
      userRequestUserId["data"]["page"]
    ][parseInt(queryData.match(/\d/g))]
  );
  console.log("============");
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

  if (
    userRequestUserId["data"]["urlForUnusualDishes"][
      userRequestUserId["data"]["page"]
    ].length > 1
  ) {
    //
    console.log(
      `urlForUnusualChoosenDish: ${urlForUnusualChoosenDish} allVariables`
    );
    //
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
  } else {
    urlForUnusualChoosenDish = ["deep links are not available."];
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
