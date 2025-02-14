const { getStatistic } = require("../database/statistic");

async function handlerText(msg) {
  try {
    let avgPerPeriod = await getStatistic(msg.from.id);
    let resultCall = avgPerPeriod[0]["TDEE"] - avgPerPeriod[0]["SUMCall"];
    console.log("HandlerText++++++++++++++++++++++");
    console.log(avgPerPeriod);
    console.log("HandlerText++++++++++++++++++++++");
    if (avgPerPeriod) {
      return `You consume ${Math.floor(
        avgPerPeriod[0]["SUMCall"]
      )} calories per day. Your usual norm is ${Math.floor(
        avgPerPeriod[0]["TDEE"]
      )}. You have ${resultCall} calories left to eat.`;
    } else {
      return `I don't have enough data to generate this.`;
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  handlerText,
};
