const { Keyboard, Key } = require("telegram-keyboard");

const keyboardAcceptDecline = Keyboard.make([
  [Key.callback("Accept", "Accept"), Key.callback("Decline", "Decline")],
]).inline();

function createKeyboard(request, userId, previousPage, nextPage) {
  let finalArrayForKeyBoard = [];
  let rows = Math.ceil(request[userId]["data"]["text"].length / 5);
  let keys = request[userId]["data"]["text"].map((el, index) =>
    Key.callback(`${index}`, `action${index}`)
  );
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
