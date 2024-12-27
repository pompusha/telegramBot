const { Keyboard, Key } = require("telegram-keyboard");

const keyboardAcceptDecline = Keyboard.make([
  [Key.callback("Accept", "action1"), Key.callback("Decline", "action2")],
]).inline();

function createKeyboard(request) {
  let finalArrayForKeyBoard = [];
  let rows = Math.ceil(request.length / 5);
  let keys = request.map((el, index) =>
    Key.callback(`${index}`, `action${index}`)
  );
  for (i = 0; i < rows; i++) {
    finalArrayForKeyBoard = [...finalArrayForKeyBoard, ...[keys.splice(0, 5)]];
  }
  return Keyboard.make(finalArrayForKeyBoard).inline();
}

module.exports = {
  keyboardAcceptDecline,
  createKeyboard,
};
