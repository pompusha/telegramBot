const { pagination } = require("./pagination");

// function checkAndParseWhoalPages(){

// }

async function checkAndParseWhoalPages(urlPart) {
  // console.log("!!!FIX AXIOS URL FOR DISH CONSISNED MORE THEN ONE WORD");
  // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=Chicken+Thigh
  // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=Chicken%20Thigh&page=0
  // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=/cheese%20halloumi&page=1
  // https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=null&page=2
  // AD URL WAY FOR COMPLICATED WORDS CONSISTS FROM MORE THEN ONE WORD "https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=chiken+thigs"
  let dataFromPars = {};
  // console.log(urlPart);
  const url = `https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=${urlPart}`;
  // console.log(url);
  pagination(url);
}

module.exports = { checkAndParseWhoalPages };
