function summOfCallories(
  caloriesForChosenPortion,
  portionFromSource,
  dishPortionFromUserMessage
) {
  if (portionFromSource) {
    if (/\d+(g|ml)/.test(portionFromSource)) {
      portionFromSource = parseFloat(portionFromSource);
      // console.log(caloriesForChosenPortion);
      // console.log(dishPortionFromUserMessage);
      // console.log()

      const summ = (
        (caloriesForChosenPortion / parseFloat(portionFromSource)) *
        dishPortionFromUserMessage
      ).toFixed(0);
      // console.log(parseFloat(portionFromSource));
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
