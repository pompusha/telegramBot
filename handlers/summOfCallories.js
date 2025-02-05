function summOfCallories(
  caloriesForChosenPortion,
  portionFromSource,
  dishPortionFromUserMessage
) {
  if (portionFromSource) {
    // console.log("111111111111111111");
    if (/\d+/.test(portionFromSource)) {
      // console.log("22222222222222222");
      // console.log(caloriesForChosenPortion);
      // console.log(parseFloat(portionFromSource));
      // console.log(dishPortionFromUserMessage);
      const summ = (
        (caloriesForChosenPortion / parseFloat(portionFromSource)) *
        dishPortionFromUserMessage
      ).toFixed(0);

      return summ;
    } else {
      console.log("vozvrat NULL tam gde CUP,MUG");
      return 0;
    }
  }
}

module.exports = {
  summOfCallories,
};
