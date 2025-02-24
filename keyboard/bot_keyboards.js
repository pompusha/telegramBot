const { Keyboard, Key } = require("telegram-keyboard");
//
//

const keyboardAcceptDecline = Keyboard.make([
  [Key.callback("Accept", "Accept"), Key.callback("Decline", "Decline")],
  // [Key.callback("Decline", "Decline")],
]).inline();
//
//
function createKeyboard(request, userId, previousPage, nextPage) {
  let finalArrayForKeyBoard = [];
  let rows;
  let keys;
  //
  //
  if (!request[userId]["cacheData"]) {
    rows = Math.ceil(
      request[userId]["data"]["text"][request[userId]["data"]["page"]].length /
        5
    );
    keys = request[userId]["data"]["text"][request[userId]["data"]["page"]].map(
      (el, index) => Key.callback(`${index}`, `action${index}`)
    );
    // return;
  } else {
    if (request[userId]["cacheData"]["page"] === "cachePage") {
      rows = Math.ceil(request[userId]["cacheData"]["text"].length / 5);
      keys = request[userId]["cacheData"]["text"].map((el, index) =>
        Key.callback(`${index}`, `action${index}`)
      );
    }
    //
    else if (request[userId]["cacheData"]["page"] === "downloaded") {
      rows = Math.ceil(
        request[userId]["data"]["text"][request[userId]["data"]["page"]]
          .length / 5
      );
      keys = request[userId]["data"]["text"][
        request[userId]["data"]["page"]
      ].map((el, index) => Key.callback(`${index}`, `action${index}`));
    }
  }
  //
  //
  for (i = 0; i < rows; i++) {
    finalArrayForKeyBoard = [...finalArrayForKeyBoard, ...[keys.splice(0, 5)]];
  }
  finalArrayForKeyBoard.push([
    //
    Key.callback(`${previousPage} Previous`, "Previous"),
    Key.callback(`${nextPage} Next`, "Next"),
    //
  ]);

  return Keyboard.make(finalArrayForKeyBoard).inline();
}

const keyboardForSevenDaysStatistic = Keyboard.reply([
  ["Calories Consumed Per Day"],
  ["All dishes for the current day."],
]);

// const keyboardAllDishesWhatYouHavePerDay = Keyboard.reply([
//   "AllDishes in current day",
// ]);

module.exports = {
  keyboardAcceptDecline,
  createKeyboard,
  keyboardForSevenDaysStatistic,
};
