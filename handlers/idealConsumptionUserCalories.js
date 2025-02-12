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
  // console.log("++++");
  // console.log(arrayFromUserMessage);
  // console.log("++++");
  if (arrayFromUserMessage != null) {
    fullBoduParam = param.reduce((acc, ell) => {
      let regexpDigits = /\d+/g;
      let regexpGender = /\bmale|female/g;
      // console.log(arrayFromUserMessage);
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
            console.log("nullchik");

            result = result.match(regexpGender).toString();
            // console.log(` else result: ${result}`);
          }
        }
      }

      // console.log(result);
      acc = { ...acc, ...{ [ell]: result } };
      // acc.push({ [ell]: result });

      return acc;
    }, {});

    arrForCheckUndefineKeys = Object.values(fullBoduParam);
    // console.log(arrForCheckUndefineKeys);

    if (
      arrForCheckUndefineKeys.some(
        (el) => el === undefined && userParamiters[userId]
      )
    ) {
      console.log("Fill all information ");
    } else {
      console.log("No undefined");
      // console.log(fullBoduParam);
      // console.log("No undefined");
      if (
        fullBoduParam["gender"]?.match(/\b(male)|(female)/g).toString() ===
        "male"
      ) {
        // console.log(coefActiv);

        value = Math.round(
          66.5 +
            13.75 * fullBoduParam["weigth"] +
            5.003 * fullBoduParam["heigth"] -
            6.775 * fullBoduParam["age"] * coefActiv[fullBoduParam["pac"] - 1]
        );
      } else {
        console.log("else");

        value = Math.round(
          655.1 +
            9.563 * fullBoduParam["weigth"] +
            1.85 * fullBoduParam["heigth"] -
            4.676 * fullBoduParam["age"] * coefActiv[fullBoduParam["pac"] - 1]
        );
      }
      // console.log("!!!!!!!");
      console.log(`value: ${value}`);
      idAndPac = { [userId]: value };
      console.log("++++");
      console.log(idAndPac);
      console.log("++++");
      // userParamiters = { ...userParamiters, ...idAndPac };
    }
    if (idAndPac[userId]) {
      if (isNaN(idAndPac[userId])) {
        console.log("NaN");
        console.log(idAndPac[userId]);
      } else {
        console.log("!=NaN");
        return idAndPac;
      }
    }
  }
  console.log(arrForCheckUndefineKeys);
}
// }

module.exports = { idealConsumptionUserCalories };
