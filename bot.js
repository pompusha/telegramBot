const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const { errors } = require("node-telegram-bot-api/src/telegram");
const cheerio = require("cheerio");
const { getProductCalories } = require("./api/axiosHttpRequest");
const { Keyboard, Key } = require("telegram-keyboard");
require("dotenv").config();
const { con } = require("./database/database");
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const { allVariables } = require("./handlers/allVariables");
const {
  keyboardAcceptDecline,
  createKeyboard,
} = require("./keyboard/bot_keyboards");

bot.on("polling_error", (error) => {
  console.log(`[polling_error] ${error.code}: ${error.message}`);
});

let userRequest = [];
let userMessageText;
console.log("server started");

bot.on("message", async (msg, match) => {
  let dishFromMessage = msg.text
    .toLowerCase()
    .match(/((?!(\s?\d))(?!g\s))[a-z]+/g);

  if (/^\//g.test(msg.text)) {
    userMessageText = msg.text;
    userRequest = await getProductCalories(dishFromMessage);
    console.log(userRequest);
    if (userRequest[0] == "") {
      bot.sendMessage(msg.chat.id, "No any results pls format your request");
    } else {
      bot.sendMessage(
        msg.chat.id,
        userRequest.reduce((el, acc, index) => {
          return `${index}. ${acc}\n${el}`;
        }, ""),
        createKeyboard(userRequest)
      );
      return userRequest, userMessageText;
    }
  }
});

bot.on("callback_query", async (query) => {
  if (query.data) {
    if (userRequest.length > 0) {
      bot.sendMessage(
        query.message.chat.id,
        allVariables(query.data, userMessageText, userRequest),
        {
          parse_mode: "HTML",
          reply_markup: keyboardAcceptDecline.reply_markup,
        }
      );
    } else {
      return bot.sendMessage(
        query.message.chat.id,
        "Please write the name of the dish you'd like to calculate calories for."
      );
    }
  }
});
