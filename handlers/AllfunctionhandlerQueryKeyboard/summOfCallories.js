function summOfCallories(
  caloriesForChosenPortion,
  portionFromSource,
  dishPortionFromUserMessage
) {
  regExpGMLper = /\d+(g|ml)/g;
  if (portionFromSource) {
    if (regExpGMLper.test(portionFromSource)) {
    } else {
      portionFromSource = "1g";
      dishPortionFromUserMessage > 5
        ? (dishPortionFromUserMessage = 1)
        : dishPortionFromUserMessage;
    }
    if (/\d+/g.test(portionFromSource)) {
      const summ = (
        (caloriesForChosenPortion / parseFloat(portionFromSource)) *
        dishPortionFromUserMessage
      ).toFixed(0);

      return summ;
    } else {
      return 0;
    }
  }
}

module.exports = {
  summOfCallories,
};
