const { deeperRequestForUnusualDish } = require("../api/deeperRequest");

async function validateUnusualValue(
  dishFromRequest,
  userRequestUserIdDataResponse,
  queryData,
  userRequest
) {
  // console.log("___________________");

  // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=gpotato
  // https://www.nutracheck.co.uk/CaloriesIn/Product/41/Sainsbury%27s+Santa%27s+Grotto+Sweets+Selection+250g+Frosty+Foams
  // "/CaloriesIn/Product/41/Sainsbury%27s+Santa%27s+Grotto+Sweets+Selection+250g+Frosty+Foams"
  // <a href="/CaloriesIn/Product/41/Sainsbury%27s+Santa%27s+Grotto+Sweets+Selection+250g+Frosty+Foams"><img src="//d2lhwe7okuon6r.cloudfront.net/media/images/info/3/right_circle_arrow.gif" class="pull-right"></a>
  //

  // document.querySelector("body > div.contentStretch > div.CenterContent > div > table > tbody > tr:nth-child(2) > td.calsinResultsArrow > a")
  // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=cofee
  // document.querySelector("body > div.contentStretch > div.CenterContent > div > table > tbody > tr:nth-child(9) > td.calsinResultsArrow > a")
  //<a href="/CaloriesIn/Product/62/Coffee%2C+Semi-Skimmed+Milk%2C+2+Sugars"><img src="//d2lhwe7okuon6r.cloudfront.net/media/images/info/3/right_circle_arrow.gif" class="pull-right"></a>
  validateValue = dishFromRequest
    .match(/((?<=\bPer\s)(.*)(?=\s\-))/g)
    .toString();
  // console.log(/\//g.test(validateValue));
  if (/\//g.test(validateValue)) {
    gramsCalorisFromDeepParse = await deeperRequestForUnusualDish(
      userRequestUserIdDataResponse,
      queryData,
      userRequest
    );

    console.log("validateUnusualValue");
    console.log(gramsCalorisFromDeepParse);
    console.log("validateUnusualValue");
    // return gramsCalorisFromDeepParse;
    if (/\d+g/g.test(dishFromRequest)) {
      //
      let maxPack = parseFloat(dishFromRequest.match(/\d+g/g));
      let fraction = validateValue
        .match(/\d+\/\d+/g)
        .toString()
        .split("/");
      let valueGramsPerCal = (maxPack / fraction[1]) * fraction[0];
      valueGramsPerCal = `${valueGramsPerCal}g`;

      return valueGramsPerCal;
      // console.log(
      //   `valueGramsPerCal = (${maxPack}/${fraction[1]})*${fraction[0]} : ${valueGramsPerCal}`
      // );
    }
  } else {
    return dishFromRequest.match(/\d+\.?\d+g|\bml/g);
  }

  // console.log(`dishFromRequest : ${dishFromRequest}`);
  // console.log(`dishFromRequest
  // .match(/((?<=\bPer\s)(.*)(?=\s\-))/g)
  // .toString() ${dishFromRequest
  //   .match(/((?<=\bPer\s)(.*)(?=\s\-))/g)
  //   .toString()}`);
  // console.log("___________________");
}

module.exports = { validateUnusualValue };
