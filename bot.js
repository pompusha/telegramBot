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

const { testHandlerText } = require("./handlers/testHandlerText");
const {
  keyboardAcceptDecline,
  createKeyboard,
  keyboardForSevenDaysStatistic,
} = require("./keyboard/bot_keyboards");
const { pagination } = require("./api/pagination");

let preparedDataForAccept = {};
const userRequest = {};
const userMessageText = {};
let testreq = "nichego";

// const currentUrl = "";

let result;
let dishFromRequest;
let caloriesFromRequestChosenPortion;
let postAcceptedData;
let portionFromSource;
let caloriesPerUserPortion;
let dishPortionFromUserMessage;
let nameDishFromRequest;

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
  // console.log("_____");
  // console.log(dishFromMessage);
  // console.log("_____");

  if (msg.text === "Calories Consumed Per Day") {
    bot.sendMessage(msg.chat.id, await handlerText(msg));
  }

  if (/^\//g.test(msg.text) && !/\/\b[Ss]tart/g.test(msg.text)) {
    userId = msg.from.id;

    userMessageText[userId] = { text: msg.text };
    userRequest[userId] = {
      data: await getProductCalories(`desc=${dishFromMessage}`),
    };

    if (userRequest[userId]["data"]["text"][0] == "") {
      bot.sendMessage(msg.chat.id, "No any results pls format your request");
    } else {
      bot.sendMessage(
        // ne nraica
        msg.chat.id,
        userRequest[userId]["data"]["text"].reduce((el, acc, index) => {
          return `${index}. ${acc}\n${el}`;
        }, ""),
        createKeyboard(userRequest, userId)
      );
      return userRequest, userMessageText;
    }
  }
});

bot.on("callback_query", async (query) => {
  userId = query.message.chat.id;
  //
  // console.log(query.data);

  if (query.data) {
    //
    console.log(`QUERY.data bot.js:${query.data} `);
    if (query.data === "Next") {
      if (userRequest.length != 0 || userRequest != "undundefined") {
        try {
          // console.log(userRequest.length);
          // console.log(userRequest);
          let nextDatapage;
          nextDatapage = await pagination(
            userRequest[userId]["data"]["url"],
            query.data
          );
          userRequest[query.from.id]["data"] = nextDatapage;
        } catch (error) {
          console.log(error);
          return;
        }
      }
    } else if (query.data === "Previous") {
      try {
        console.log("previous");
        let nextDatapage;
        nextDatapage = await pagination(
          userRequest[userId]["data"]["url"],
          query.data
        );
        userRequest[query.from.id]["data"] = nextDatapage;
      } catch (error) {
        console.log(error);
      }
    }
    if (userRequest?.[userId]?.["data"]?.text?.length) {
      if (userRequest[userId]["data"]["text"].length > 0) {
        if (query.data.match("action")) {
          result = allVariables(
            query.data,
            userMessageText[userId]["text"],
            userRequest[userId]["data"]["text"],
            userId
          );

          preparedDataForAccept = {
            ...preparedDataForAccept,
            [userId]: result,
          };
        }
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!HANDLER
        let messageText = handlerQueryKeyboard(
          preparedDataForAccept,
          query.data,
          userMessageText[userId]["text"],
          userRequest[userId]["data"]["text"],
          userId,
          userRequest[userId]["data"]["url"],
          userRequest
        );
        // console.log(messageText["keyboardAndParseMode"]["reply_markup"]);
        bot.sendMessage(query.message.chat.id, messageText["text"], {
          parse_mode: messageText["keyboardAndParseMode"].parse_mode,
          reply_markup:
            messageText["keyboardAndParseMode"]["keyboard"]["reply_markup"],
        });
        // console.log(messageText);
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
