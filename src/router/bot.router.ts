import { Bot, InlineKeyboard } from 'grammy'
import { Hono } from 'hono'
import { BotService } from '../service/bot.service'
import dayjs from 'dayjs'
import { PointService } from '../service/point.service'
import * as dotenv from 'dotenv'
dotenv.config()
const bot_token = process.env.BOT_TOKEN
export const bot = new Bot(bot_token!)
const botRouter = new Hono()
const botService = new BotService()
const hour = dayjs().hour() + 7
const pointService = new PointService()
const inlineKeyboard = new InlineKeyboard()
  .text("Yes ✅", "yes")
  .row()
  .text("No ❌", "no")

let isRegistered = false



bot.command('start', async (ctx) => {
  console.log("Bot received /start command from:", ctx.from?.username)
  await ctx.reply("Hi, I am Lou Yi. I will track your wake up time.")
})

bot.on('message', async (ctx) => {
  const user = ctx.from
  const reply = await botService.getUserInfo(user.username!)
  if(!reply) {
    await ctx.reply("User doesn't register in our system")
    return
  }
  isRegistered = true
  if(isRegistered) {
    if((hour > 7 && hour < 9)) {
      ctx.reply("you got up late again, -25 points")
      return
    } else if (hour >= 9 || hour <= 4) {
      ctx.reply("Did you just get up?", {
        reply_markup: inlineKeyboard
      })
      return
    } else if ( hour === 2) {
      await pointService.insertPoint(user.username!)
      ctx.reply("Nice 30 points added to your account") 
    } 
  }
  await ctx.reply(`Hi welcome ${reply.username}`)
})

bot.callbackQuery('yes', async (ctx) => {
  await ctx.answerCallbackQuery()
  if(hour >= 9) {
    const user = ctx.from
    await pointService.insertPoint(user.username!)
    await ctx.reply('You got up really late. You definitely lack of discipline')
  }
  if(hour <= 5) {const user = ctx.from
    await pointService.insertPoint(user.username!)
    await ctx.reply('You got up too early. which is not good so i need to deduct your points')
  }
})

bot.callbackQuery('no', async (ctx) => {
  await ctx.answerCallbackQuery()
  await ctx.reply("Oh Okay I though You really got up at this time 😼")
})

export default botRouter