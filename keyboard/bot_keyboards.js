const { Keyboard, Key } = require("telegram-keyboard");
//
//

const keyboardAcceptDecline = Keyboard.make([
  [Key.callback("Accept", "Accept"), Key.callback("Decline", "Decline")],
]).inline();
//
//
function createKeyboard(request, userId, previousPage, nextPage) {
  let finalArrayForKeyBoard = [];
  let rows;
  let keys;
  //
  //
  // console.log(request[userId]["cacheData"]);
  if (!request[userId]["cacheData"]) {
    // console.log("nocachedata");
    // console.log(request);
    // console.log("nocachedata");
    rows = Math.ceil(
      request[userId]["data"]["text"][request[userId]["data"]["page"]].length /
        5
    );
    keys = request[userId]["data"]["text"][request[userId]["data"]["page"]].map(
      (el, index) => Key.callback(`${index}`, `action${index}`)
    );
    // return;
  } else {
    //
    if (request[userId]["cacheData"]["page"] === "cachePage") {
      rows = Math.ceil(request[userId]["cacheData"]["text"][0].length / 5);
      keys = request[userId]["cacheData"]["text"].map((el, index) =>
        Key.callback(`${index}`, `action${index}`)
      );
      // console.log(`PAGA ${request[userId]["cacheData"]["page"]}`);
    }
    //
    else if (request[userId]["cacheData"]["page"] === "downloaded") {
      // console.log(`paga downloaded`);
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
  // rows = Math.ceil(request[userId]["data"]["text"][0].length / 5);
  // keys = request[userId]["data"]["text"][0].map((el, index) =>
  //   Key.callback(`${index}`, `action${index}`)
  // );
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
  "Calories Consumed Per Day",
]);

module.exports = {
  keyboardAcceptDecline,
  createKeyboard,
  keyboardForSevenDaysStatistic,
};
