const { createMessageReply } = require("./createMessageReply");

function allVariables(queryData, userMessageText, userRequest) {
  let portionFromUser = parseInt(userMessageText.match(/\d+/g));
  let chosenDish = userRequest[parseInt(queryData.match(/\d/))];
  let nameFromChosenDish = chosenDish
    .match(/(?<=\bin\s)(\s?[aA-zZ]+'?\s?[aA-zZ]?)+/g)
    .toString();
  let caloriesForChosenPortion = parseInt(
    chosenDish.match(/\d+(?=\s\bcalories\b)/g)
  );
  let portionFromSource = chosenDish.match(
    /(?<=\bpot\s\()\d+(g|ml)|\d+(g|ml)((?=\)\s-))|(?<=\bPer\s)\d+(g|ml)|((?<=\bPer\s)\w+(?=\s-))/g
  );
  let sumCalories;
  console.log(`portionFromSource: ${portionFromSource}`);
  return createMessageReply(
    portionFromUser,
    chosenDish,
    nameFromChosenDish,
    caloriesForChosenPortion,
    portionFromSource,
    sumCalories
  );
}

module.exports = {
  allVariables,
};
