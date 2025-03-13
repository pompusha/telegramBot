const { getStatistic } = require("../../database/statistic");
const { logger } = require("../logger/logger_winston");
async function handlerText(msg, fullDishlist, command) {
  try {
    if (command === "sumGet") {
      let avgPerPeriod = await getStatistic(msg.from.id, command);

      if (avgPerPeriod?.[0]?.["tdee"]) {
        resultCall = avgPerPeriod[0]["tdee"] * 0.8 - avgPerPeriod[0]["SUMCall"];
      }

      if (avgPerPeriod[0]?.["SUMCall"] != null) {
        let message;
        message = "";
        if (avgPerPeriod[0]?.["tdee"] != null) {
          message = `You consume ${Math.floor(
            avgPerPeriod[0]["SUMCall"]
          )} calories per day. Your usual norm is ${Math.floor(
            avgPerPeriod[0]["tdee"]
          )}. You have  ${Math.round(resultCall)} calories left to eat.`;
        } else {
          message = `You consume ${Math.floor(
            avgPerPeriod[0]["SUMCall"]
          )} calories. If you add your parameters (use the command: .param), I can also tell you how many calories you have left for the day.`;
        }
        return message;
      } else {
        return `I don't have enough data to generate this. You need to eat something or add parameters (use the command: .param)`;
      }
    } else if (command === "listget") {
      let avgPerPeriod = await getStatistic(msg.from.id, command);
      let arrTextForMEss = avgPerPeriod.map((el, index) => {
        return `${index}. ${el["dish"]}  ${el["dish_portion"]}  ${el["calories_per_portion"]}`;
      });

      let idfordelLIst = [];

      idfordelLIst = avgPerPeriod.reduce((acc, el) => {
        return [...acc, el.id];
      }, []);

      fullDishlist = { [msg.from.id]: [...idfordelLIst] };

      let message = arrTextForMEss.reduce((acc, el, index) => {
        return `${acc} ${el}\n`;
      }, ``);

      return { message, fullDishlist };
    }
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  handlerText,
};
