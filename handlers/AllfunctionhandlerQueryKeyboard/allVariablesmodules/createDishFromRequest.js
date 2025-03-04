function createDishFromRequest(arrayWithText, numberFromQueruData) {
  if (arrayWithText.length > numberFromQueruData) {
    dishFromRequest = arrayWithText[numberFromQueruData].toString();
  } else {
    dishFromRequest =
      arrayWithText[numberFromQueruData % arrayWithText.length].toString();
  }
  return dishFromRequest;
}

module.exports = { createDishFromRequest };
