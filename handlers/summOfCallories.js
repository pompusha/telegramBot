function summOfCallories(
  caloriesForChosenPortion,
  portionFromSource,
  dishPortionFromUserMessage
) {
  if (portionFromSource) {
    if (/\d+(g|ml)/.test(portionFromSource)) {
      // portionFromSource = parseFloat(portionFromSource);
      // console.log("222222222");
      // console.log(caloriesForChosenPortion);
      // console.log(dishPortionFromUserMessage);
      // console.log(portionFromSource);
      // console.log("22222222");

      const summ = (
        (caloriesForChosenPortion / parseFloat(portionFromSource)) *
        dishPortionFromUserMessage
      ).toFixed(0);
      // console.log(`caloriesForChosenPortion ${caloriesForChosenPortion} / parseFloat(portionFromSource ${parseFloat(
      //   portionFromSource
      // )})) *
      //   dishPortionFromUserMessage ${dishPortionFromUserMessage}`);
      // console.log(parseFloat(portionFromSource));
      return summ;
    } else {
      console.log(portionFromSource);
      console.log("vozvrat NULL tam gde CUP,MUG");
      return null;
    }
  }
}

module.exports = {
  summOfCallories,
};
