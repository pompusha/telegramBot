const { summOfCallories } = require("../summOfCallories");
const { createDishFromRequest } = require("./createDishFromRequest");
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

  if (
    regExpQuantityportionMLGandDigits.test(
      dishFromRequest.match(regExpAllBetweenPerandDash)
    )
  ) {
  } else {
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
  }

  portionFromSource = await createPortionFromSource(
    dishFromRequest,
    queryData,
    cashOrDownoladed
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
