const { controlNextPage } = require("./controlNextPage");
const { controlPrefiousPage } = require("./controlPrefiousPage");

async function nextPrevPage(userRequest, query) {
  // userRequest, query
  if (query.data === "Next") {
    if (userRequest[userId]) {
      console.log(`bot.js Next`);
      await controlNextPage(userRequest, query);
    }
  }
  if (query.data === "Previous") {
    console.log("bot.js Previous");
    await controlPrefiousPage(userRequest);
  }
}

module.exports = { nextPrevPage };
