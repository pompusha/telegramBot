const { getStatistic } = require("../database/statistic");

async function handlerText(msg) {
  try {
    console.log(msg.from.id);

    // console.log("Here you will see average calories");
    let avgPerPeriod = await getStatistic(msg.from.id);
    // console.log(avgPerPeriod[0]["AVG(`calories_per_portion`)"]);
    return `You consume ${~~avgPerPeriod[0][
      "AVG(`calories_per_portion`)"
    ]} calories per day`;
    // You consume approximately ${~~avgPerPeriod[0]["AVG(calories_per_portion)"]} calories per day.
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  handlerText,
};
