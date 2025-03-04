const { controlNextPage } = require("./controlNextPage");
const { controlPrefiousPage } = require("./controlPrefiousPage");

async function nextPrevPage(userRequest, query) {
  if (query.data === "Next") {
    if (userRequest[userId]) {
      await controlNextPage(userRequest, query);
    }
  }
  if (query.data === "Previous") {
    await controlPrefiousPage(userRequest);
  }
}

module.exports = { nextPrevPage };
