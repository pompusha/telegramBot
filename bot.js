const TelegramBot = require("node-telegram-bot-api");
const { errors } = require("node-telegram-bot-api/src/telegram");
require("dotenv").config();
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const { queryHandler } = require("./handlers/queryHandler");
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
  createKeyboard,
  keyboardForSevenDaysStatistic,
} = require("./keyboard/bot_keyboards");
const { insertTdee } = require("./database/inserTdee");
const { logger } = require("./logger_winston");
const { deletefromDB } = require("./database/delete");
preparedDataForAccept = {};
userRequest = {};
userId = null;
const userMessageText = {};
const regExpDel = /^\/[Dd]el/;
let fullDishlist = [];
let dishlistRemovePagination;
let userParamiters = { 888881: 1758 };
let userCache = {};
let result;
let safetedMessageForChancge;
let currDate;
let dishFromMessage;
comeback = [];
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
  let message;
  if (msg.text) {
    dishFromMessage = msg.text
      .toLowerCase()
      .match(/((?!(\s?\d))(?!g\s))[a-z]+/g);
    if (msg.text === "Calories Consumed Per Day") {
      //
      //
      bot.sendMessage(
        msg.chat.id,
        await handlerText(msg, fullDishlist, "sumGet")
      );
    } else if (msg.text === "All dishes for the current day.") {
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
      await checkUserCache(
        userId,
        currDate,
        userMessageText,
        dishFromMessage,
        userCache,
        userRequest,
        msg.text
      );
      userMessageText[userId] = { text: msg.text };
      if (userRequest[userId]?.["cacheData"] || userRequest[userId]?.["data"]) {
        if (
          !userRequest[userId]["data"]["text"] &&
          userRequest[userId]["cacheData"]["page"] === "downloaded"
        ) {
          bot.sendMessage(
            msg.chat.id,
            "No any results pls format your request"
          );
        } else {
          let textMessage;
          textMessage = cacheFirstMessage(userRequest);
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
    result = await queryHandler(
      userRequest,
      query,
      userMessageText,
      preparedDataForAccept,
      userCache,
      currDate,
      dishFromMessage,
      result
    );
    const messageText = result["messageText"];
    preparedDataForAccept = {
      ...preparedDataForAccept,
      ...result["preparedDataForAccept"],
    };
    if (dishlistRemovePagination) {
      bot.editMessageText(`${messageText["text"]}`, {
        chat_id: query.message.chat.id,
        message_id: dishlistRemovePagination[userId],
        parse_mode: messageText["keyboardAndParseMode"].parse_mode,
        reply_markup:
          messageText["keyboardAndParseMode"]["keyboard"]["reply_markup"],
      });
    } else {
      return;
    }
  }
});
