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
// const { testHandlerText } = require("./handlers/testHandlerText");
const { cacheFirstMessage } = require("./handlers/cacheFirstMessage");
const { controlPrefiousPage } = require("./handlers/controlPrefiousPage");
const { controlNextPage } = require("./handlers/controlNextPage");
const {
  keyboardAcceptDecline,
  createKeyboard,
  keyboardForSevenDaysStatistic,
} = require("./keyboard/bot_keyboards");
const { pagination } = require("./api/pagination");

let preparedDataForAccept = {};
const userRequest = {};
const userMessageText = {};

let userCache = {
  339084941: {
    "22-01-2020": {
      null: {
        data: {
          text: new Set([
            //13 el

            "Calories in Pecan Nuts Per Nut (2g) - 14 calories | 1.4 fat",
            "Calories in Cashew Nuts, Roasted & Salted Per Nut (2g) - 12 calories | 1 fat",
            "Calories in Fearne & Rosie Raspberry Jam 200g Per 10g serving - 16 calories | 0 fat",
            "Calories in Fearne & Rosie Raspberry Jam 227g Per 10g serving - 16 calories | 0 fat",
            // "Calories in Roast Potatoes, Cooked in Vegetable Oil Per Small potato (50g) - 81 calories | 2.8 fat",
            // "Calories in Sweet Potato, Baked Per 100g - 115 calories | 0.4 fat",
            // "Calories in Roast Potatoes, Cooked with Low Calorie Spray Oil Per Small potato (50g) - 61 calories | 0.3 fat",
            // "Calories in Low Fat Fruit Yogurt Per Heaped dessertspoon (28g) - 22 calories | 0.3 fat",
            // "Calories in Fat Free Natural Diet Yogurt Per Heaped dessertspoon (28g) - 15 calories | 0.1 fat",
            // "Calories in Whole Milk Fruit Yogurt Per Heaped dessertspoon (28g) - 31 calories | 0.8 fat",
            // "Calories in Roast Chicken Breast Meat, No Skin (Cooked with Skin) Per 1 Slice (40g) - 61 calories | 1.4 fat",
            // "Calories in Chicken Curry, Homemade Per Small serving (180g) - 210 calories | 13.6 fat",
            // "Calories in Whole Chicken, Roasted, Meat & Skin, Weighed with Bone Per 100g - 138 calories | 7.9 fat",
          ]),
          urlForUnusualDishes: new Set([
            "https://example.com/calories/chicken-soup",
            "https://example.com/calories/chicken-blood",
          ]),
          url: "https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=null",
        },
        page: 0,
      },
    },
  },
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

  if (msg.text === "Calories Consumed Per Day") {
    bot.sendMessage(msg.chat.id, await handlerText(msg));
  }

  if (/^\//g.test(msg.text) && !/\/\b[Ss]tart/g.test(msg.text)) {
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
    //
    //
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
    // console.log("!!!!!!!");
    // console.log(JSON.stringify(userRequest));
    // console.log("!!!!!!!");
    // console.log("BOT userRequest");
    // console.log(userRequest[userId]);
    // console.log(userRequest[userId]["data"]);
    // console.log("BOT userRequest");
    //
    // console.log("cacheFirstMessage");
    // console.log(JSON.stringify(userRequest));
    // console.log("cacheFirstMessage");
    //
    //
    userMessageText[userId] = { text: msg.text };
    //
    // убрал тут было  if (userRequest[userId]["data"]["text"][0][0] == "")
    if (userRequest[userId]["cacheData"] || userRequest[userId]["data"]) {
      // console.log("aaaaaa");
      // console.log("!!!!!!!");
      // console.log(JSON.stringify(userRequest));
      // console.log("!!!!!!!");
      if (
        //
        !userRequest[userId]["data"]["text"] &&
        userRequest[userId]["cacheData"]["page"] === "downloaded"
        //
      ) {
        //
        // console.log("bbbbb");
        bot.sendMessage(msg.chat.id, "No any results pls format your request");
      } else {
        // console.log("cccccc");
        // console.log("111111111111111111111");
        // console.log(JSON.stringify(userRequest));
        // console.log("111111111111111111111");
        // console.log();
        // let page;
        let textMessage;

        // page = userRequest[userId]["data"]["page"];
        // console.log("_________________________________________");
        // console.log(userRequest);
        // console.log("_________________________________________");
        textMessage = cacheFirstMessage(userRequest);
        // console.log("BOT 142");
        // console.log(textMessage);
        // console.log("BOT 142");
        // function cacheFirstMessage(userRequest) {
        //   let page;
        //   let firstAnswer;
        //   if (userRequest[userId]["cacheData"]) {
        //     if (userRequest[userId]["cacheData"]["page"] === "cachePage") {
        //       console.log("Выбирает первый массив с перечнем из кеша");
        //       console.log(userRequest[userId]["cacheData"]["text"]);
        //       console.log("Выбирает первый массив с перечнем из кеша");
        //       firstAnswer = userRequest[userId]["cacheData"]["text"];
        //       return firstAnswer;
        //     }
        //   } else {
        //     page = userRequest[userId]["data"]["page"];
        //     console.log("Выбирает первое сообщение в массиве если нет кеша");
        //     console.log(userRequest[userId]["data"]["text"][0]);
        //     console.log("Выбирает первое сообщение в массиве если нет кеша");
        //     firstAnswer = userRequest[userId]["data"]["text"][page];
        //     return firstAnswer;
        //   }
        //   console.log("cacheFirstMessage");
        //   console.log(userRequest);
        //   console.log("cacheFirstMessage");
        // }
        // cacheFirstMessage();
        bot.sendMessage(
          // ne nraica

          msg.chat.id,
          `You chose ${msg.text}
        ${textMessage.reduce((el, acc, index) => {
          return `${index}. ${acc}\n${el}`;
        }, "")}
        `,
          createKeyboard(userRequest, userId)
        );
        return userRequest, userMessageText;
      }
    }
  }
});
//

bot.on("callback_query", async (query) => {
  userId = query.message.chat.id;

  if (query.data) {
    //
    let nextDatapage;
    if (query.data === "Next") {
      // console.log(`userRequest.length :${userRequest.length}`);

      // console.log("nety");
      if (userRequest[userId]) {
        // console.log("ВОТ ТУТ ПОРАБОТАЙ С ИФОМ");
        // console.log("BOT userRequest");
        // console.log(userRequest);
        // console.log("BOT userRequest");
        //
        //
        await controlNextPage(userRequest, query);
        // async function controlNextPage() {
        //   if (!userRequest[userId]["data"]["text"]) {
        //     //

        //     //
        //     let takeAllSighnAfterEquival = /(?<=\=)(.*)/g;
        //     url = userRequest[userId]["cacheData"]["url"]
        //       .match(takeAllSighnAfterEquival)
        //       .toString();
        //     // nextDatapage = await getProductCalories(url);
        //     userRequest[userId]["cacheData"]["page"] = "downloaded";
        //     //
        //     let data = await getProductCalories(`desc=${url}`);
        //     // userRequest[userId] = { ...userRequest[userId], ...data };
        //     userRequest[userId]["data"] = await getProductCalories(
        //       `desc=${url}`
        //     );
        //     // {
        //     //   data: await getProductCalories(`desc=${url}`),
        //     // };
        //   } else {
        //     if (
        //       userRequest[userId]["data"]["text"].length >
        //       userRequest[userId]["data"]["page"] + 1
        //     ) {
        //       userRequest[userId]["data"]["page"] =
        //         userRequest[userId]["data"]["page"] + 1;
        //     } else if (
        //       userRequest[userId]["data"]["text"].length ===
        //       userRequest[userId]["data"]["page"] + 1
        //     ) {
        //       //
        //       nextDatapage = await pagination(
        //         userRequest[userId],
        //         query.data,
        //         userRequest[userId]["data"]["page"]
        //       );
        //       //
        //       userRequest[query.from.id]["data"]["text"] = [
        //         ...userRequest[query.from.id]["data"]["text"],
        //         ...nextDatapage["text"],
        //       ];
        //       userRequest[query.from.id]["data"]["urlForUnusualDishes"] = [
        //         ...userRequest[query.from.id]["data"]["urlForUnusualDishes"],
        //         ...nextDatapage["urlForUnusualDishes"],
        //       ];
        //       userRequest[query.from.id]["data"]["url"] = JSON.parse(
        //         JSON.stringify(nextDatapage["url"])
        //       );
        //     }
        //   }
        //   // console.log("NEXTNEXTNEXTNEXTNEXT");
        //   // console.log(userRequest);
        //   // console.log("=====================");
        //   // console.log(JSON.stringify(userRequest));
        //   // console.log("NEXTNEXTNEXTNEXTNEXT");
        // }
        //
        //
        //
        //   if (userRequest[userId]["data"]) {
        //     try {
        //       if (
        //         userRequest[userId]["data"]["text"].length >
        //         userRequest[userId]["data"]["page"] + 1
        //       ) {
        //         userRequest[userId]["data"]["page"] =
        //           userRequest[userId]["data"]["page"] + 1;
        //       } else if (
        //         userRequest[userId]["data"]["text"].length ===
        //         userRequest[userId]["data"]["page"] + 1
        //       ) {
        //         nextDatapage = await pagination(
        //           userRequest[userId],
        //           query.data,
        //           userRequest[userId]["data"]["page"]
        //         );
        //         userRequest[query.from.id]["data"]["text"] = [
        //           ...userRequest[query.from.id]["data"]["text"],
        //           ...nextDatapage["text"],
        //         ];
        //         userRequest[query.from.id]["data"]["urlForUnusualDishes"] = [
        //           ...userRequest[query.from.id]["data"]["urlForUnusualDishes"],
        //           ...nextDatapage["urlForUnusualDishes"],
        //         ];
        //         userRequest[query.from.id]["data"]["url"] = JSON.parse(
        //           JSON.stringify(nextDatapage["url"])
        //         );
        //       }
        //     } catch (error) {
        //       console.log(error);
        //       return;
        //     }
        //   }
      }
    }
    //

    // async function controlPrefiousPage() {
    //   if (userRequest[userId]) {

    //     if (userRequest[userId]["data"]["page"] > 0) {
    //       userRequest[userId]["data"]["page"] =
    //         userRequest[userId]["data"]["page"] - 1;
    //     } else if (userRequest[userId]["data"]["page"] === 0) {
    //       //

    //       //
    //       if (userRequest[userId]["cacheData"]["text"]) {
    //         userRequest[userId]["cacheData"]["page"] = "cachePage";
    //         console.log("буду испольщовать кэшь обратно");
    //       }
    //     }

    //     console.log(`page ${userRequest[userId]["data"]["page"]}`);

    //     //
    //   }
    // }
    // //
    // //
    if (query.data === "Previous") {
      console.log("Настроить пагинацию в КЭШЬ массив (после нулевого)");
      await controlPrefiousPage(userRequest);
      // if (userRequest[userId]) {
      //   try {

      //     if (userRequest[userId]["data"]["page"] > 0) {
      //       userRequest[userId]["data"]["page"] =
      //         userRequest[userId]["data"]["page"] - 1;
      //     }
      //     console.log(`page ${userRequest[userId]["data"]["page"]}`);
      //     if (userRequest[query.from.id]["data"] === undefined) {
      //       console.log(`BOTgdeto 205 strochka `);
      //       return;
      //     } else {
      //       userRequest[query.from.id]["data"];
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
    }
    //
    //
    if (userRequest?.[userId]?.["data"]?.text?.length) {
      // console.log("bot 274");
      // console.log(userMessageText[userId]);
      // console.log("bot 274");

      if (userRequest[userId]["data"]["text"][0].length > 0) {
        if (query.data.match("action")) {
          result = await allVariables(
            query.data,
            // вот тут хуйня почему то иногда выпадает понять как воспроизвести
            userMessageText[userId]["text"],
            //
            userRequest[userId],
            //
            userId
            // userRequest[userId]["data"]["urlForUnusualDishes"]
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
          userRequest[userId]["data"]["text"][
            userRequest[userId]["data"]["page"]
          ],

          userId,
          userRequest[userId]["data"]["url"],
          userRequest,
          userCache,
          currDate,
          dishFromMessage,
          result
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

    return;
  }
});
