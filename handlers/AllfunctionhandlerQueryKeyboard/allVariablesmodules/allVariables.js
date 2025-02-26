const { summOfCallories } = require("../summOfCallories");
const { createDishFromRequest } = require("./createDishFromRequest");
const { deeperRequestForUnusualDish } = require("../../../api/deeperRequest");
const { createPortionFromSource } = require("./createPortionFromSource");
async function allVariables(queryData, userMessageText, userRequestUserId) {
  let dishFromRequest;
  let urlForUnusualChoosenDish;
  let dishPortionFromUserMessage = !parseInt(userMessageText.match(/\d+/g))
    ? null
    : parseInt(userMessageText.match(/\d+/g));
  const numberFromQueruData = parseFloat(queryData.match(/\d+/g).toString());
  const regExpDigitCalories = /\d+(?=\s\bcalories\b)/g;
  const regExpQuantityportionMLGandDigits = /\d+\.?\s?(ml|g)/g;
  const regExpAllBetweenPerandDash = /((?<=\bPer\s)(.*)(?=\s\-))/g;
  const regExpDigitSlashDigit = /\d+\/\d+/;
  let cashOrDownoladed;
  //
  //
  if (userRequestUserId["data"]["text"]) {
    dishFromRequest = createDishFromRequest(
      userRequestUserId["data"]["text"][userRequestUserId["data"]["page"]],
      numberFromQueruData
    );
  }

  if (userRequestUserId["cacheData"]) {
    if (userRequestUserId["cacheData"]["page"] === "cachePage") {
      dishFromRequest = createDishFromRequest(
        userRequestUserId["cacheData"]["text"],
        numberFromQueruData
      );
    }
  }
  caloriesFromRequestChosenPortion = parseInt(
    dishFromRequest.match(regExpDigitCalories)
  );
  //
  //
  //
  // portionFromSource =await createPortionFromSource(dishFromRequest,queryData, cashOrDownoladed);
  // dishFromRequest
  //   .match(regExpAllBetweenPerandDash)
  //   .toString()
  //   .match(regExpQuantityportionMLGandDigits);

  //
  // createPortionFromSource(dishFromRequest);
  // console.log(`portionFromSource FIRST !!! ${portionFromSource}`);
  //

  if (
    regExpQuantityportionMLGandDigits.test(
      dishFromRequest.match(regExpAllBetweenPerandDash)
    )
  ) {
  } else {
    // let cashOrDownoladed;

    if (userRequestUserId["cacheData"]) {
      if (userRequestUserId["cacheData"]["page"] === "cachePage") {
        cashOrDownoladed =
          userRequestUserId["cacheData"]["urlForUnusualDishes"][
            numberFromQueruData
          ];
      } else if (userRequestUserId["cacheData"]["page"] === "downloaded") {
        cashOrDownoladed =
          userRequestUserId["data"]["urlForUnusualDishes"][
            userRequestUserId["data"]["page"]
          ][numberFromQueruData];
      }
    } else {
      cashOrDownoladed =
        userRequestUserId["data"]["urlForUnusualDishes"][
          userRequestUserId["data"]["page"]
        ][numberFromQueruData];
    }

    console.log(
      `allVariables.js something wrong into non digts zone ${dishFromRequest}`
    );

    //
    //
    //
    // portionFromSource = dishFromRequest
    //   .match(regExpAllBetweenPerandDash)
    //   .toString();
    //
    // console.log(`portionFromSource before deep Parse ${portionFromSource}`);
    //

    // checkPortionFromSource(portionFromSource, dishFromRequest);
    //
    // gramsCalorisFromDeepParse = await deeperRequestForUnusualDish(
    //   cashOrDownoladed,
    //   queryData
    // );
    //
    //
    // console.log(`allVariables.js portionFromSource : ${portionFromSource}`);
    //
    // checkPortionFromSource(portionFromSource, dishFromRequest);
    //
    //
    //
    // if (!portionFromSource) {
    //   if (gramsCalorisFromDeepParse) {
    //     portionFromSource =
    //       gramsCalorisFromDeepParse["gramsForPortionFromDeepParse"];
    //     console.log(
    //       `\nall variables IF portionFromSource ${portionFromSource}\n`
    //     );
    //     caloriesFromRequestChosenPortion =
    //       gramsCalorisFromDeepParse["callForGramsFromDeepParse"];
    //     //
    //   } else {
    //     portionFromSource = dishFromRequest
    //       .match(regExpAllBetweenPerandDash)
    //       .toString();
    //     console.log("!!!!!!");
    //   }
    // }
  }
  //
  portionFromSource = await createPortionFromSource(
    dishFromRequest,
    queryData,
    cashOrDownoladed
  );
  //
  console.log(
    `\nallVariab  caloriesFromRequestChosenPortion:${caloriesFromRequestChosenPortion}\nportionFromSource:${portionFromSource}\ndishPortionFromUserMessage:${dishPortionFromUserMessage}`
  );

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

  if (userRequestUserId["data"]["urlForUnusualDishes"]) {
    if (
      userRequestUserId["data"]["urlForUnusualDishes"][
        userRequestUserId["data"]["page"]
      ].length > 1
    ) {
      urlForUnusualChoosenDish =
        userRequestUserId["data"]["urlForUnusualDishes"][
          userRequestUserId["data"]["page"]
        ][numberFromQueruData];
      //
    }
  } else {
    urlForUnusualChoosenDish = ["deep links are not available."];
  }

  postAcceptedData = [
    userIdFromTelegramm,
    nameDishFromRequest,
    dishPortionFromUserMessage,
    caloriesPerUserPortion,
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
