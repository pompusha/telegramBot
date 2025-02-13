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
const {
  idealConsumptionUserCalories,
} = require("./handlers/idealConsumptionUserCalories");
const { cacheFirstMessage } = require("./handlers/cacheFirstMessage");
const { controlPrefiousPage } = require("./handlers/controlPrefiousPage");
const { controlNextPage } = require("./handlers/controlNextPage");
const {
  keyboardAcceptDecline,
  createKeyboard,
  keyboardForSevenDaysStatistic,
} = require("./keyboard/bot_keyboards");
const { cacheCheck } = require("./cache/cacheCheck");
// const { pagination } = require("./api/pagination");
const { insertTdee } = require("./database/inserTdee");
let preparedDataForAccept = {};
const userRequest = {};
const userMessageText = {};
//
let userParamiters = { 888881: 1758 };

// let userParamiters = {
//   userId: { h: null, w: null, gender: null, activity: null },
// };
//
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
        page: "cacheCheck",
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

function iformUserParamiters(msg) {
  const message = `
Hi! If you provide your parameters as:

- **Weight**: \`.w\`  
- **Height**: \`.h\`  
- **Age**: \`.a\`  
- **Gender**: \`.g\`  
- **Physical activity coefficient"**: \`.p\` 
Sedentary (Little or No Exercise) → 1.2 : \`.p1\`
Lightly Active (Light Exercise/Sports 1-3 Days a Week) → 1.375: \`.p2\`
Moderately Active (Moderate Exercise/Sports 3-5 Days a Week) → 1.55: \`.p3\`
Very Active (Hard Exercise/Sports 6-7 Days a Week) → 1.725: \`.p4\`
Super Active (Very Hard Exercise, Physical Job, or Training Twice a Day) → 1.9: \`.p5\`


It will help us calculate your daily calorie needs and guide you to stay fit!  

For example, you can type:  
\.w 106 .h192 .a33 .g male .p4\  

Let’s get started! 🚀
  `;
  if (msg.text === ".param") {
    bot.sendMessage(msg.chat.id, message);
  }
}

bot.on("message", async (msg, match) => {
  if (msg.text) {
    dishFromMessage = msg.text
      .toLowerCase()
      .match(/((?!(\s?\d))(?!g\s))[a-z]+/g);
    if (msg.text === "Calories Consumed Per Day") {
      bot.sendMessage(msg.chat.id, await handlerText(msg));
    }

    iformUserParamiters(msg);
    if (/^\./g.test(msg.text) && msg.text != ".param") {
      userParamiters = {
        ...userParamiters,
        ...idealConsumptionUserCalories(userParamiters, msg),
      };
      if (userParamiters[msg.from.id]) {
        insertTdee(userParamiters[msg.from.id], msg.from.id);
        // console.log("AEEEEEEEE");
        message = `You day caries eqvival ${
          userParamiters[msg.from.id]
        } if you want to change your paramiters you can do this again`;
        bot.sendMessage(msg.chat.id, message);
      }
      delete userParamiters[msg.from.id];
      console.log("userParamiters[userId] after delete");
      console.log(userParamiters);
      console.log("userParamiters[userId] after delete");
    }
    // console.log(userParamiters);
    //
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
      //
      // убрал тут было  if (userRequest[userId]["data"]["text"][0][0] == "")
      if (userRequest[userId]["cacheData"] || userRequest[userId]["data"]) {
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
  }
  console.log("======");
  console.log(userParamiters);
  console.log("======");
});
//

bot.on("callback_query", async (query) => {
  userId = query.message.chat.id;
  if (query.data) {
    if (query.data != "Decline") {
      if (query.data && userMessageText) {
        if (query.data === "Next") {
          if (userRequest[userId]) {
            console.log("bot.js NEXT");
            await controlNextPage(userRequest, query);
          }
        }
        if (query.data === "Previous") {
          console.log("bot.js Previous");
          await controlPrefiousPage(userRequest);
        }
        //
        // if (userRequest?.[userId]?.["data"]?.text?.length) {
        if (Object.keys(userRequest) != 0) {
          if (query.data.match("action")) {
            result = await allVariables(
              query.data,
              // вот тут хуйня почему то иногда выпадает понять как воспроизвести
              userMessageText[userId]["text"],
              userRequest[userId]
              // userId
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
          bot.sendMessage(query.message.chat.id, messageText["text"], {
            parse_mode: messageText["keyboardAndParseMode"].parse_mode,
            reply_markup:
              messageText["keyboardAndParseMode"]["keyboard"]["reply_markup"],
          });
          //
        } else {
          return bot.sendMessage(
            query.message.chat.id,
            "Please write the name of the dish you'd like to calculate calories for."
          );

          // console.log(`bot.js url: ${userRequest[userId]["data"]["url"][query.data]}`)
        }
        // }

        return;
      }
    }
  }
});
