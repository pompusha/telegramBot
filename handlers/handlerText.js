const { getStatistic } = require("../database/statistic");

async function handlerText(msg) {
  try {
    let avgPerPeriod = await getStatistic(msg.from.id);

    return `You consume ${~~avgPerPeriod[0][
      "SUM(`calories_per_portion`)"
    ]} calories per day`;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  handlerText,
};
