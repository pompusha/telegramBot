const TelegramBot = require("node-telegram-bot-api")
const axios = require ("axios")
const { errors } = require("node-telegram-bot-api/src/telegram")
const cheerio = require ("cheerio")



const token = "7802524688:AAH2dJ6P81_5vqoW2eX9BUqXEeo_MCDLc2k"
const bot = new TelegramBot(token, { polling: true })

bot.on("message", (msg, match)=>{
  const chatId = msg.chat.id;
  const messageText = msg.text;
  // const resp=match[1]

  // let allSearchDishesSearchData=[]
  

async function getProductCalories (product,weigth){
  const url=`https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=${product}`
  try {
    const {data} = await axios.get(url);
    const $=cheerio.load(data)

    const calorieInfo= $("body > div.contentStretch > div.CenterContent > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > ul > li > p:nth-child(2) > a").text()
    // const whoalCaloreInfos=$("body > div.contentStretch > div.CenterContent > div > table > tbody").text().replace(/\s+/g," ").split(",")

    const calories=parseInt(calorieInfo.replace(/\s+/g," ").match(/(?<=- )\d+/))
    const portion=parseInt(calorieInfo.replace(/\s+/g," ").match(/\d+(?=g)/))

    if (calorieInfo){
      // console.log(whoalCaloreInfos)
      // allSearchDishesSearchData=whoalCaloreInfos
      return (`A <i>${portion}g</i> portion contain <i>${calories}</i> calories. If you consume a <b>${weigth}g</b> portion, you would have approximately <b>${(calories/parseInt(portion)*weigth).toFixed(2)}</b> calories`
      
    )
    }
    else {
      console.log("NE VISHLO")
      return (`Calories information for ${msg.text} not found`)
    }
  } catch {error}{
    console.error("Error prod SYka data", error);
    return null
  }
}


if (msg.text==="/start"){
  bot.sendMessage(msg.chat.id, "Ок я начинаю преальфа тест для ввода калорий ставишь. тег <b>/</b> через пробел пишешь блюдо и граммы все на англиском" , {parse_mode : "HTML"})
}

if (msg.text.toLowerCase().search("/") >-1){
  
   let serchVariable =msg.text.split(" ").reduce((acc,el)=>{
   return /\d+/.test(el)|| el==="/" ? acc : acc+`${el} `
  }
   ,"")
   let weigth = msg.text.split(" ").reduce((acc, el)=>{
    return /\d+/.test(el)? acc+parseInt(el): acc
   }, 0)
  getProductCalories(serchVariable, weigth).then(call=>{
    bot.sendMessage(msg.chat.id, `${call}`, {parse_mode:"HTML"})
  }) 
}
})


