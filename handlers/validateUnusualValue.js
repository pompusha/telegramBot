async function validateUnusualValue(
  dishFromRequest,
  userRequestUserIdDataResponse,
  queryData,
  userRequest
) {
  // validateValue = dishFromRequest
  //   .match(/((?<=\bPer\s)(.*)(?=\s\-))/g)
  //   .toString();
  // if (/\//g.test(validateValue)) {
  //   gramsCalorisFromDeepParse = await deeperRequestForUnusualDish(
  //     userRequestUserIdDataResponse,
  //     queryData,
  //     userRequest
  //   );
  //   console.log("validateUnusualValue");
  //   console.log(
  //     "необходимо пофиксть дип чек ибо долбоебы иногда используют куски и прочую хуйню то есть безграммов"
  //   );
  //   console.log("validateUnusualValue");
  //   if (/\d+g/g.test(dishFromRequest)) {
  //     //
  //     let maxPack = parseFloat(dishFromRequest.match(/\d+g/g));
  //     let fraction = validateValue
  //       .match(/\d+\/\d+/g)
  //       .toString()
  //       .split("/");
  //     let valueGramsPerCal = (maxPack / fraction[1]) * fraction[0];
  //     valueGramsPerCal = `${valueGramsPerCal}g`;
  //     return valueGramsPerCal;
  //   }
  // } else {
  //   return dishFromRequest.match(/\d+\.?\d+g|\bml/g);
  // }
}

module.exports = { validateUnusualValue };
