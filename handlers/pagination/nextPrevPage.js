const { controlNextPage } = require("./controlNextPage");
const { controlPreviousPage } = require("./controlPreviousPage");

async function nextPrevPage(userRequest, query) {
  if (query.data === "Next") {
    if (userRequest[userId]) {
      await controlNextPage(userRequest, query);
    }
  }
  if (query.data === "Previous") {
    await controlPreviousPage(userRequest);
  }
}

module.exports = { nextPrevPage };
