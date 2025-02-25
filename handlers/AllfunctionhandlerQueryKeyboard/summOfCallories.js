function summOfCallories(
  caloriesForChosenPortion,
  portionFromSource,
  dishPortionFromUserMessage
) {
  if (portionFromSource) {
    if (/\d+/.test(portionFromSource)) {
    } else {
      portionFromSource = "1g";
      dishPortionFromUserMessage > 5
        ? (dishPortionFromUserMessage = 1)
        : dishPortionFromUserMessage;
    }
    if (/\d+/.test(portionFromSource)) {
      console.log(
        `\n summcall caloriesForChosenPortion ${caloriesForChosenPortion}\n parseFloat(portionFromSource) :${parseFloat(
          portionFromSource
        )} \n dishPortionFromUserMessage ${dishPortionFromUserMessage}\n`
      );
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
