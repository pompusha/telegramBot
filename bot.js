const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const { errors } = require("node-telegram-bot-api/src/telegram");
const cheerio = require("cheerio");
const { getProductCalories } = require("./api/getProductCalories");
const { Keyboard, Key } = require("telegram-keyboard");
require("dotenv").config();
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const {
  allVariables,
} = require("./handlers/AllfunctionhandlerQueryKeyboard/allVariablesmodules/allVariables");
const {
  handlerQueryKeyboard,
} = require("./handlers/AllfunctionhandlerQueryKeyboard/handlerQueryKeyboard");
const { handlerText } = require("./handlers/createrMessages/handlerText");
const { checkUserCache } = require("./cache/checkUserCache");
const {
  iformUserParamiters,
} = require("./handlers/createrMessages/iformUserParamiters");
const {
  idealConsumptionUserCalories,
} = require("./handlers/AllfunctionhandlerQueryKeyboard/idealConsumptionUserCalories");
const { cacheFirstMessage } = require("./cache/cacheFirstMessage");
const {
  controlPrefiousPage,
} = require("./handlers/pagination/controlPrefiousPage");
const { controlNextPage } = require("./handlers/pagination/controlNextPage");
const {
  keyboardAcceptDecline,
  createKeyboard,
  keyboardForSevenDaysStatistic,
} = require("./keyboard/bot_keyboards");
const { cacheCheck } = require("./cache/cacheCheck");
// const { pagination } = require("./api/pagination");
const { insertTdee } = require("./database/inserTdee");
const { logger } = require("./logger_winston");
const { deletefromDB } = require("./database/delete");
let preparedDataForAccept = {};
userRequest = {};
userId = null;
const userMessageText = {};
const regExpDel = /^\/[Dd]el/;
let fullDishlist = [];
let dishlistRemovePagination;
//
let userParamiters = { 888881: 1758 };
let regExpDigit = /\d+/g;
let userCache = {
  339084941: {
    "22-01-2020": {
      null: {
        data: {
          text: new Set([
            "Calories in Pecan Nuts Per Nut (2g) - 14 calories | 1.4 fat",
            "Calories in Cashew Nuts, Roasted & Salted Per Nut (2g) - 12 calories | 1 fat",
            "Calories in Fearne & Rosie Raspberry Jam 200g Per 10g serving - 16 calories | 0 fat",
            "Calories in Fearne & Rosie Raspberry Jam 227g Per 10g serving - 16 calories | 0 fat",
          ]),
          urlForUnusualDishes: new Set([
            "https://example.com/calories/chicken-soup",
            "https://example.com/calories/chicken-blood",
          ]),
          url: "https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=null",
        },
        page: "cacheCheck",
      },
    },
  },
};

let result;
// let dishFromRequest;
// let caloriesFromRequestChosenPortion;
// let postAcceptedData;
// let portionFromSource;
// let caloriesPerUserPortion;
// let dishPortionFromUserMessage;
// let nameDishFromRequest;
let safetedMessageForChancge;
let currDate;
let dishFromMessage;
//
comeback = [];
//
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
  if (msg.text) {
    dishFromMessage = msg.text
      .toLowerCase()
      .match(/((?!(\s?\d))(?!g\s))[a-z]+/g);
    if (msg.text === "Calories Consumed Per Day") {
      bot.sendMessage(
        msg.chat.id,
        await handlerText(msg, fullDishlist, "sumGet")
      );
    }
    //

    if (msg.text === "All dishes for the current day.") {
      message = await handlerText(msg, fullDishlist, "listget");
      bot
        .sendMessage(msg.chat.id, `list\n${message["message"]}`)
        .then((response) => {
          safetedMessageForChancge = {
            ...safetedMessageForChancge,
            ...{ [msg.from.id]: response.message_id },
          };
        });
      fullDishlist = { ...fullDishlist, ...message["fullDishlist"] };

      return safetedMessageForChancge;
    }
    if (regExpDel.test(msg.text)) {
      if (fullDishlist[msg.from.id]) {
        await deletefromDB(msg, fullDishlist);
      }
      message = await handlerText(msg, fullDishlist, "listget");
      fullDishlist = { ...fullDishlist, ...message["fullDishlist"] };

      if (safetedMessageForChancge != undefined) {
        bot.editMessageText(`list\n${message["message"]}`, {
          chat_id: msg.chat.id,
          message_id: safetedMessageForChancge[msg.from.id],
        });
        await bot.deleteMessage(msg.chat.id, msg.message_id);
      }
    }
    //
    if (msg.text === ".param") {
      return bot.sendMessage(msg.chat.id, iformUserParamiters());
    }
    if (/^\./g.test(msg.text) && msg.text != ".param") {
      userParamiters = {
        ...userParamiters,
        ...idealConsumptionUserCalories(userParamiters, msg),
      };
      if (userParamiters[msg.from.id]) {
        insertTdee(userParamiters[msg.from.id], msg.from.id);

        message = `You day caries eqvival ${
          userParamiters[msg.from.id]
        } if you want to change your paramiters you can do this again`;
        bot.sendMessage(msg.chat.id, message);
      }
      delete userParamiters[msg.from.id];
    }

    if (
      /^\//g.test(msg.text) &&
      !/\/\b[Ss]tart/g.test(msg.text) &&
      !/\b[Dd]el/g.test(msg.text)
    ) {
      userId = msg.from.id;

      let date = new Date();
      let yy = date.getFullYear();
      let mm =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      let dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

      currDate = `${dd}-${mm}-${yy}`;
      //
      await checkUserCache(
        userId,
        currDate,
        userMessageText,
        dishFromMessage,
        userCache,
        userRequest,
        msg.text
      );
      //
      userMessageText[userId] = { text: msg.text };

      if (userRequest[userId]?.["cacheData"] || userRequest[userId]?.["data"]) {
        if (
          //
          !userRequest[userId]["data"]["text"] &&
          userRequest[userId]["cacheData"]["page"] === "downloaded"
          //
        ) {
          bot.sendMessage(
            msg.chat.id,
            "No any results pls format your request"
          );
        } else {
          let textMessage;
          textMessage = cacheFirstMessage(userRequest);
          //
          let varForId = await bot.sendMessage(
            msg.chat.id,
            `You chose ${msg.text}
        ${textMessage.reduce((el, acc, index) => {
          return `${el}\n ${index}. ${acc}\n`;
        }, "")}
        `,
            createKeyboard(userRequest, userId)
          );

          dishlistRemovePagination = {
            ...dishlistRemovePagination,
            ...{ [userId]: varForId.message_id },
          };

          return userRequest, userMessageText, dishlistRemovePagination;
        }
      }
    }
  }
});

bot.on("callback_query", async (query) => {
  userId = query.message.chat.id;
  if (query.data) {
    if (query.data && userMessageText) {
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
      if (Object.keys(userRequest) != 0) {
        if (query.data.match("action")) {
          result = await allVariables(
            query.data,
            userMessageText[userId]["text"],
            userRequest[userId]
          );
          preparedDataForAccept = {
            ...preparedDataForAccept,
            [userId]: result,
          };
        }

        let messageText = handlerQueryKeyboard(
          preparedDataForAccept,
          query.data,
          userRequest,
          userCache,
          currDate,
          dishFromMessage,
          result
        );
        // console.log(userRequest);
        bot.editMessageText(`${messageText["text"]}`, {
          chat_id: query.message.chat.id,
          message_id: dishlistRemovePagination[userId],
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

      logger.error(new Error("an syka error"));

      return;
    }
  }
});
