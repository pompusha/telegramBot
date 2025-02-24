function idealConsumptionUserCalories(userParamiters, msg) {
  let userId = msg.from.id;
  let fullBoduParam;
  let result;
  let arrForCheckUndefineKeys;
  let value;
  let idAndPac;
  let coefActiv = [1.2, 1.375, 1.55, 1.7, 1.9];
  // if (/^\./g.test(msg.text) && msg.text != ".param") {
  let regExpFindEverything =
    // /(w\s?\d+|h\s?\d+|a\s?\d+|(?<=g)\s?(male|female)|p\s?\d+)/g;
    /(w\s?\d+|h\s?\d+|a\s?\d+|g\s?(male|female)|p\s?\d+)/g;
  // let firstLetter = /^\w/g;
  const param = ["weigth", "heigth", "age", "gender", "pac"];

  userMessage = msg.text;
  arrayFromUserMessage = userMessage.match(regExpFindEverything);

  if (arrayFromUserMessage != null) {
    fullBoduParam = param.reduce((acc, ell) => {
      let regexpDigits = /\d+/g;
      let regexpGender = /\bmale|female/g;

      if (arrayFromUserMessage != null) {
        result = arrayFromUserMessage.find((elem) => {
          return (
            elem.match(/^[aA-zZ]/g).toString() ===
            ell.match(/^[aA-zZ]/g).toString()
          );
          // } else {
        });
      }

      if (result) {
        if (regexpDigits.test(result)) {
          if (result.match(regexpDigits) != null) {
            result = parseFloat(result.match(regexpDigits).toString());
          } else {
            result = result.match(regexpGender).toString();
          }
        }
      }
      acc = { ...acc, ...{ [ell]: result } };
      return acc;
    }, {});

    arrForCheckUndefineKeys = Object.values(fullBoduParam);
    if (
      arrForCheckUndefineKeys.some(
        (el) => el === undefined && userParamiters[userId]
      )
    ) {
    } else {
      if (
        fullBoduParam["gender"]?.match(/\b(male)|(female)/g).toString() ===
        "male"
      ) {
        value = Math.round(
          (66.5 +
            13.75 * fullBoduParam["weigth"] +
            5.003 * fullBoduParam["heigth"] -
            6.775 * fullBoduParam["age"]) *
            coefActiv[fullBoduParam["pac"] - 1]
        );
      } else {
        value = Math.round(
          (655.1 +
            9.563 * fullBoduParam["weigth"] +
            1.85 * fullBoduParam["heigth"] -
            4.676 * fullBoduParam["age"]) *
            coefActiv[fullBoduParam["pac"] - 1]
        );
      }

      idAndPac = { [userId]: value };
    }
    if (idAndPac[userId]) {
      if (isNaN(idAndPac[userId])) {
      } else {
        return idAndPac;
      }
    }
  }
  console.log(`idealConsumptionUserCalories.js`);
}
// }

module.exports = { idealConsumptionUserCalories };
