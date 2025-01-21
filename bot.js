const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const { errors } = require("node-telegram-bot-api/src/telegram");
const cheerio = require("cheerio");
const { getProductCalories } = require("./api/getProductCalories");
const { Keyboard, Key } = require("telegram-keyboard");
require("dotenv").config();
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const { allVariables } = require("./handlers/allVariables");
const { handlerQueryKeyboard } = require("./handlers/handlerQueryKeyboard");
const { handlerText } = require("./handlers/handlerText");
const { checkUserCache } = require("./cache/checkUserCache");
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
//  id: { date: { dishFromMessage: [results, result], meet: [results, result] } },
let userCache = {
  // "0123304": { "20-01-2020": {} },
  // 30000: { "01-01-2000": {} },
  // 339084941: {
  //   "01-01-2000": {},
  //   "21-01-2025": {
  //     potato: [
  //       "Calories in Baby Potatoes, In Skins, Boiled or Steamed Per Average potatons, Boiled or Steamed Per Average potato (35g) - 24 calories | 0 fat",
  //     ],
  //   },
  // },
};
let result;
let dishFromRequest;
let caloriesFromRequestChosenPortion;
let postAcceptedData;
let portionFromSource;
let caloriesPerUserPortion;
let dishPortionFromUserMessage;
let nameDishFromRequest;
let currDate;
let dishFromMessage;
const regExpSlashStart = /\/start/;
bot.on("polling_error", (error) => {
  console.log(`[polling_error] ${error.code}: ${error.message}`);
});
console.log("Wake up SERVER");

bot.onText(regExpSlashStart, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Welcome! If you want to find the calories of your dishes, write the name of your dish followed by the grams after /",
    keyboardForSevenDaysStatistic
  );
});

bot.on("message", async (msg, match) => {
  dishFromMessage = msg.text.toLowerCase().match(/((?!(\s?\d))(?!g\s))[a-z]+/g);
  // console.log("_____");
  // console.log(dishFromMessage);
  // console.log("_____");

  if (msg.text === "Calories Consumed Per Day") {
    bot.sendMessage(msg.chat.id, await handlerText(msg));
  }

  if (/^\//g.test(msg.text) && !/\/\b[Ss]tart/g.test(msg.text)) {
    userId = msg.from.id;
    // console.log(userMessageText);
    let date = new Date();
    let yy = date.getFullYear();
    let mm =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    let dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

    currDate = `${dd}-${mm}-${yy}`;

    await checkUserCache(
      userId,
      currDate,
      userMessageText,
      dishFromMessage,
      userCache,
      userRequest,
      msg.text
    );
    // console.log(userCache);
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //
    userMessageText[userId] = { text: msg.text };
    // userRequest[userId] = {
    //   data: await getProductCalories(`desc=${dishFromMessage}`),
    // };
    // console.log(userMessageText);
    console.log(userRequest);
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
  //
  if (query.data) {
    //
    // console.log(`QUERY.data bot.js:${query.data} `);
    if (query.data === "Next") {
      if (userRequest.length != 0 || userRequest != "undundefined") {
        try {
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
        // console.log("previous");
        let nextDatapage;
        nextDatapage = await pagination(
          userRequest[userId]["data"]["url"],
          query.data
        );

        if (nextDatapage === undefined) {
          console.log(`prev 0 :${nextDatapage}`);

          return;
        } else {
          userRequest[query.from.id]["data"] = nextDatapage;
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (userRequest?.[userId]?.["data"]?.text?.length) {
      if (userRequest[userId]["data"]["text"].length > 0) {
        if (query.data.match("action")) {
          result = await allVariables(
            query.data,
            userMessageText[userId]["text"],
            userRequest[userId]["data"]["text"],
            userId,
            userRequest[userId]["data"]["response"]
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
          userRequest[userId]["data"]["text"],
          userId,
          userRequest[userId]["data"]["url"],
          userRequest,
          userCache,
          currDate,
          dishFromMessage
        );
        bot.sendMessage(query.message.chat.id, messageText["text"], {
          parse_mode: messageText["keyboardAndParseMode"].parse_mode,
          reply_markup:
            messageText["keyboardAndParseMode"]["keyboard"]["reply_markup"],
        });
      } else {
        return bot.sendMessage(
          query.message.chat.id,
          "Please write the name of the dish you'd like to calculate calories for."
        );
      }
    }
    // console.log("endBOT");
    // console.log("__________");
    // console.log(userCache);
    // console.log("__________");
    // console.log(userCache[userId][currDate][dishFromMessage]);
    // console.log("__________");
    // console.log(JSON.stringify(userCache));
    // console.log("__________");
    // console.log("endBOT");

    return;
  }
});
