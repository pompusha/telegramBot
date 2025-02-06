function idealConsumptionUserCalories(userParamiters, msg) {
  let userId = msg.from.id;
  let regexpW = /^(\.[wW])/g;
  let regexpH = /^(\.[hH])/g;
  let regexpA = /^(\.[aA])/g;
  let regexpG = /^(\.[gG])/g;
  let regfindDigits = /\d+/;
  let regfindLetters = /(?<=\.g)\s?[aA-zZ]*/g;
  let objKey;
  let value;
  if (/^\.[wWhHaAgG]/g.test(msg.text)) {
    // console.log(/^./g.test(msg.text));

    if (regexpW.test(msg.text)) {
      objKey = "weigth";
    } else if (regexpH.test(msg.text)) {
      objKey = "heigth";
    } else if (regexpA.test(msg.text)) {
      objKey = "age";
    } else if (regexpG.test(msg.text)) {
      objKey = "gender";
    }
    if (objKey === "weigth" || objKey === "heigth" || objKey === "age") {
      if (msg.text.match(regfindDigits) === null) {
        return;
      } else {
        value = parseInt(msg.text.match(regfindDigits).toString());
      }
    } else if (objKey === "gender") {
      value = msg.text
        .match(regfindLetters)
        .toString()
        .replaceAll(",", "")
        .trim();

      console.log(value);
    }
    userParamiters[userId] = {
      ...userParamiters[userId],
      ...{ [objKey]: value },
    };
  }
  //

  //
  if (userParamiters[userId]) {
    if (Object.keys(userParamiters[userId]).length >= 4) {
      if (userParamiters[userId]["gender"] === "f") {
        // console.log("summcull");
        objKey = "totalDailyEnergyExpenditure";
        value = Math.round(
          655.1 +
            9.563 * userParamiters[userId]["weigth"] +
            1.85 * userParamiters[userId]["heigth"] -
            4.676 * userParamiters[userId]["age"]
        );
        userParamiters = {
          ...userParamiters[userId],
          ...{ [objKey]: value },
        };
      } else if (userParamiters[userId]["gender"] === "m") {
        objKey = "totalDailyEnergyExpenditure";
        value = Math.round(
          66.5 +
            13.75 * userParamiters[userId]["weigth"] +
            5.003 * userParamiters[userId]["heigth"] -
            6.775 * userParamiters[userId]["age"]
        );
        userParamiters = {
          ...userParamiters[userId],
          ...{ [objKey]: value },
        };
      }
    }
    console.log(Object.values(userParamiters[userId]));
  } else {
    return;
  }
}
module.exports = { idealConsumptionUserCalories };
