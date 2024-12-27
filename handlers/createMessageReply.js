// const { allVariablesFinalText } = require("./allVariablesFinalText");

function createMessageReply(
  portionFromUser,
  chosenDish,
  nameFromChosenDish,
  caloriesForChosenPortion,
  portionFromSource,
  sumCalories
) {
  let strPortionFromSource;

  if (portionFromSource) {
    strPortionFromSource = portionFromSource.toString();
    if (/[aA-zZ]{3,}/.test(strPortionFromSource)) {
      messageReply = `The dish <i>${nameFromChosenDish}</i> contains <b>${caloriesForChosenPortion} calories</b> 
per <b>${portionFromSource}</b> portion.`;
      return messageReply;
    } else if (/\d+(g|ml)/.test(strPortionFromSource)) {
      portionFromSource = parseInt(portionFromSource);
      // console.log(portionFromSource);
      sumCalories = (
        (caloriesForChosenPortion / portionFromSource) *
        portionFromUser
      ).toFixed(2);
      messageReply = `The dish <i>${nameFromChosenDish}</i> contains <b>${caloriesForChosenPortion} calories</b> 
per portion of <b>${portionFromSource}g</b>. 
If you consume a portion of <b>${~~portionFromUser}g</b>, it will amount to approximately <b>${~~sumCalories} calories</b>.`;

      return messageReply;
    }
  } else {
    messageReply = chosenDish;
    return messageReply;
  }

  return messageReply;
}

module.exports = {
  createMessageReply,
};
