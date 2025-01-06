function summOfCallories(
  caloriesForChosenPortion,
  portionFromSource,
  dishPortionFromUserMessage
) {
  if (portionFromSource) {
    if (/\d+(g|ml)/.test(portionFromSource)) {
      portionFromSource = parseInt(portionFromSource);
      const summ = (
        (caloriesForChosenPortion / parseInt(portionFromSource)) *
        dishPortionFromUserMessage
      ).toFixed(0);
      return summ;
    } else {
      console.log("vozvrat NULL tam gde CUP,MUG");
      return null;
    }
  }
}

module.exports = {
  summOfCallories,
};
