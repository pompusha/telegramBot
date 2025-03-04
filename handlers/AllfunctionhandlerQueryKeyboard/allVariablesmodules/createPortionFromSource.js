const { deeperRequestForUnusualDish } = require("../../../api/deeperRequest");

async function createPortionFromSource(
  dishFromRequest,
  queryData,
  cashOrDownoladed
) {
  const everithingBetweenPerDash = /(?<=Per)(.*)(?=\-)/g;
  const regExpDigitSlashDigit = /\d+\/\d+/;
  const regExpFractionDigits = /(\d+(?=\/))/g;
  const regExpFractionDigitsSec = /((?<=\/)\d+)/g;
  const regExpGramsForFracture = /\d+(?=g|ml\s?\bPer)/g;
  const regExpGMLper = /\d+(g|ml)/g;
  const regExpOnlyWords = /[aA-zZ]+/g;
  let portion;

  let firstMatchPortionFromSource = dishFromRequest
    .match(everithingBetweenPerDash)[0]
    .trim();

  if (regExpDigitSlashDigit.test(firstMatchPortionFromSource)) {
    let matchGramsForFraction = dishFromRequest.match(regExpGramsForFracture);
    let gramsForFraction = matchGramsForFraction
      ? parseFloat(matchGramsForFraction[0])
      : 1;

    let portionMathFraction1st =
      firstMatchPortionFromSource.match(regExpFractionDigits);
    let portionMathFraction2st = firstMatchPortionFromSource.match(
      regExpFractionDigitsSec
    );

    portion =
      (gramsForFraction / portionMathFraction2st[0]) *
      portionMathFraction1st[0];

    portion = portion + "g";

    return portion;
  } else if (regExpGMLper.test(firstMatchPortionFromSource)) {
    portion =
      parseFloat(firstMatchPortionFromSource.match(regExpGMLper)[0]) + "g";

    return portion;
  } else if (regExpOnlyWords.test(firstMatchPortionFromSource)) {
    portion = firstMatchPortionFromSource;

    return portion;
  } else {
    gramsCalorisFromDeepParse = await deeperRequestForUnusualDish(
      cashOrDownoladed,
      queryData
    );
  }
}

module.exports = { createPortionFromSource };
