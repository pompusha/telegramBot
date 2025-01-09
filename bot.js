const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const { errors } = require("node-telegram-bot-api/src/telegram");
const cheerio = require("cheerio");
const { getProductCalories } = require("./api/axiosHttpRequest");
const { Keyboard, Key } = require("telegram-keyboard");
require("dotenv").config();
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const { allVariables } = require("./handlers/allVariables");
const { handlerQueryKeyboard } = require("./handlers/handlerQueryKeyboard");
const { handlerText } = require("./handlers/handlerText");
const {
  keyboardAcceptDecline,
  createKeyboard,
  keyboardForSevenDaysStatistic,
} = require("./keyboard/bot_keyboards");

let preparedDataForAccept = {};
const userRequest = {};
const userMessageText = {};

bot.on("polling_error", (error) => {
  console.log(`[polling_error] ${error.code}: ${error.message}`);
});
console.log("Wake up SERVER");

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Welcome! If you want to find the calories of your dishes, write the name of your dish followed by the grams after /",
    keyboardForSevenDaysStatistic
  );
});

bot.on("message", async (msg, match) => {
  let dishFromMessage = msg.text
    .toLowerCase()
    .match(/((?!(\s?\d))(?!g\s))[a-z]+/g);

  // bot.onText(/\/[s]tart/, (msg) => {
  //   bot.sendMessage(
  //     msg.chat.id,
  //     "Welcome! If you want to find the calories of your dishes, write the name of your dish followed by the grams after /",
  //     keyboardForSevenDaysStatistic
  //   );
  // });

  if (msg.text === "Calories Consumed Per Day") {
    bot.sendMessage(msg.chat.id, await handlerText(msg));
  }

  if (/^\//g.test(msg.text) && !/\/\b[Ss]tart/g.test(msg.text)) {
    userId = msg.from.id;

    userMessageText[userId] = { text: msg.text };
    userRequest[userId] = {
      text: await getProductCalories(dishFromMessage),
    };

    if (userRequest[userId]["text"][0] == "") {
      bot.sendMessage(msg.chat.id, "No any results pls format your request");
    } else {
      bot.sendMessage(
        msg.chat.id,
        userRequest[userId]["text"].reduce((el, acc, index) => {
          return `${index}. ${acc}\n${el}`;
        }, ""),
        createKeyboard(userRequest, userId)
      );
      return userRequest, userMessageText;
    }
  }
});
let result;
let dishFromRequest;
let caloriesFromRequestChosenPortion;
let postAcceptedData;
let portionFromSource;
let caloriesPerUserPortion;
let dishPortionFromUserMessage;
let nameDishFromRequest;

bot.on("callback_query", async (query) => {
  userId = query.message.chat.id;
  //
  // console.log(userRequest[userId]["text"][query.data]);
  //
  if (query.data) {
    // console.log(query.data);
    if (userRequest?.[userId]?.text?.length) {
      if (userRequest[userId]["text"].length > 0) {
        if (query.data.match("action")) {
          result = allVariables(
            query.data,
            userMessageText[userId]["text"],
            userRequest[userId]["text"],
            userId
          );

          preparedDataForAccept = {
            ...preparedDataForAccept,
            [userId]: result,
          };
        }
        let messageText = handlerQueryKeyboard(
          preparedDataForAccept,
          query.data,
          userMessageText[userId]["text"],
          userRequest[userId]["text"],
          userId
        );
        bot.sendMessage(
          query.message.chat.id,
          messageText["text"],
          messageText["keyboardAndParseMode"]
        );
      } else {
        return bot.sendMessage(
          query.message.chat.id,
          "Please write the name of the dish you'd like to calculate calories for."
        );
      }
    }
    return;
  }
});
