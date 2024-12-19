const TelegramBot = require("node-telegram-bot-api")
const axios = require ("axios")
const { errors } = require("node-telegram-bot-api/src/telegram")
const cheerio = require ("cheerio")
const { all } = require("axios")
const { Keyboard, Key } = require('telegram-keyboard')


const token = "7802524688:AAH2dJ6P81_5vqoW2eX9BUqXEeo_MCDLc2k"
const bot = new TelegramBot(token, { polling: true })



async function getProductCalories (product){
  const url = `https://www.nutracheck.co.uk/CaloriesIn/Product/Search?desc=${product}`
  try {
    const response= await axios.get(url)
    const $=cheerio.load(response.data)
    const calorieInfo= $("body > div.contentStretch > div.CenterContent > div > table > tbody").text().replace(/\s+/g," ")
    return calorieInfo.trim().split(/(?<=\bfat)\s(?=Calories)/g).map((el)=>{
    return el.trim()
  }
)
  }catch (error){
    console.error(error)
    return ("Request error")
  }
}

bot.on('polling_error', (error) => {
  console.log(`[polling_error] ${error.code}: ${error.message}`);
});



let userRequest=[]
let userMessageText
console.log("server started")


bot.on("message", async (msg, match)=>{
  let dishFromMessage =msg.text.toLowerCase().match( /((?!(\s?\d))(?!g\s))[a-z]+/g )
  

const myBoard = Keyboard.make([
  [Key.callback('0', 'action0'), Key.callback('1', 'action1'), Key.callback('2', 'action2'), Key.callback('3', 'action3'), Key.callback('4', 'action4')],
  [Key.callback('5', 'action5'), Key.callback('6', 'action6'), Key.callback('7', 'action7'), Key.callback('8', 'action8'), Key.callback('9', 'action9')]
]).inline();
// 

  if (/^\//g.test(msg.text)){
    userMessageText = msg.text
    userRequest= await getProductCalories(dishFromMessage) 

    bot.sendMessage(msg.chat.id, userRequest.reduce((el,acc,index)=>{
            return `${index}. ${acc}\n${el}`
           },"")
           ,  myBoard)
   
     return userRequest, userMessageText
  }
}
)


function allVariablesFinalText(queryData){

  let portionFromUser = parseInt( userMessageText.match(/\d+/g))
  let chosenDish = userRequest[parseInt(queryData.match(/\d/))]
  let nameFromChosenDish = chosenDish.match(/(?<=\bin\s)(\s?[aA-zZ]+'?\s?[aA-zZ]?)+/g).toString()
  let caloriesForChosenPortion = parseInt(chosenDish.match(/\d+(?=\s\bcalories\b)/g))
  let portionFromSource = chosenDish.match(/(?<=\bpot\s\()\d+(g|ml)|\d+(g|ml)((?=\)\s-))|(?<=\bPer\s)\d+(g|ml)|((?<=\bPer\s)\w+(?=\s-))/g)
  let sumCalories
  
  // console.log(`userMessageText: ${userMessageText}`)
  // console.log(`portionFromUser: ${portionFromUser}`)
  // console.log(`chosenDish: ${chosenDish}`)
  // console.log(`nameFromChosenDish: ${nameFromChosenDish}`)
  // console.log(`caloriesForChosenPortion: ${caloriesForChosenPortion}`)
  // console.log(`portionFromSource: ${portionFromSource}`)
  // console.log(`sumCalories: ${sumCalories}`)
  return createMessageReply(portionFromUser,chosenDish,nameFromChosenDish,caloriesForChosenPortion,portionFromSource,sumCalories)
}
 
function createMessageReply(portionFromUser,chosenDish,nameFromChosenDish,caloriesForChosenPortion,portionFromSource,sumCalories){


let strPortionFromSource=portionFromSource.toString()

  if (/[aA-zZ]{3,}/.test(strPortionFromSource)){
    messageReply = `The dish <i>${nameFromChosenDish}</i> contains <b>${caloriesForChosenPortion} calories</b> 
per portion of <b>${portionFromSource}$</b>. 
If you consume a <b>${portionFromUser}g</b>, it will amount to approximately <b>${caloriesForChosenPortion} calories</b>.`
  return messageReply
  }else if (/\d+(g|ml)/.test(strPortionFromSource)){

    
    portionFromSource= parseInt(portionFromSource)
    console.log(portionFromSource)
    sumCalories = ((caloriesForChosenPortion/portionFromSource)*portionFromUser).toFixed(2)
    messageReply = `The dish <i>${nameFromChosenDish}</i> contains <b>${caloriesForChosenPortion} calories</b> 
per portion of <b>${portionFromSource}g</b>. 
If you consume a portion of <b>${~~portionFromUser}g</b>, it will amount to approximately <b>${~~sumCalories} calories</b>.`
    
    return messageReply
  }


  // let messageReply = `The dish <i>${nameFromChosenDish}</i> contains <b>${caloriesForChosenPortion} calories</b> 
  // per portion of <b>${portionFromSource}$ {g}</b>. 
  // If you consume a portion of <b>${~~portionFromUser}g</b>, it will amount to approximately <b>${~~sumCalories} calories</b>.`
  // console.log(`messageReply:${messageReply}`)
  return messageReply
// }
}


bot.on("callback_query", async (query)=>{

  if (query.data){
      if(userRequest.length>0){
   
       bot.sendMessage(query.message.chat.id, allVariablesFinalText(query.data), { parse_mode: "HTML" });
       
      }
      else{
       return bot.sendMessage(query.message.chat.id, "Please write the name of the dish you'd like to calculate calories for.")
      }
      
    }
     
}
)

// Calories in Baked Potato, Plain with Skin Per 100g - 97 calories | 0.2 fat
// Calories in Pineapple, Fresh Per Slice (80g) - 36 calories | 0.1 fat
// 1. Calories in Beef Mince, 5% Fat (Extra Lean), Fried without Oil Per 100g - 168 calories | 4.7 fat
// 1. Calories in Baby Cucumbers Per Cucumber (35g) - 5 calories | 0.1 fat
// Calories in Asda Grower's Selection Mini Cucumbers 200g Per Mini cucumber (35g) - 5 calories | 0.1 fat
// 7. Calories in Tesco Finest Greek Yogurt 500g Per One fifth of a pot (100g) contains - 130 calories | 9.9 fat
// 1. Calories in Tesco Greek Style Yogurt 500g Per 1/5 of a pot (100g) - 99 calories | 7.5 fat


// (?(?<=\bPer\s)\d+(?=g)|else)|(?(?<=\bpot\s\()\d+|(?(?<!\bpot)(?<=\()\d+|(?(?<=\bPer\s)\d+|else)))