// This file should be placed in: /api/telegram-webhook.js
import { Redis } from '@upstash/redis';
import { Telegraf } from 'telegraf';

export default async function handler(req, res) {
  try {
    // Initialize clients inside the handler for serverless environments
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

    // This command handler triggers when a user first starts a chat with your bot
    bot.start(async (ctx) => {
      const chatId = ctx.chat.id;
      const username = ctx.from.username;

      if (!username) {
        return ctx.reply('Please set a username in your Telegram settings to use this service.');
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpKey = `otp:${username}`;

      try {
        // Store the OTP in Upstash Redis with a 5-minute expiration (300 seconds)
        await redis.set(otpKey, otp, { ex: 300 });

        // Send the OTP to the user
        await ctx.reply(`Welcome to OutlierHelp! Your one-time login code is: ${otp}\n\nReturn to the website and enter your username and this code to log in.`);
        console.log(`OTP sent to ${username}`);
      } catch (error) {
        console.error('Error handling /start command:', error);
        await ctx.reply('Sorry, there was an error processing your request. Please try again later.');
      }
    });

    // This is the main handler for Vercel to process incoming updates from Telegram
    await bot.handleUpdate(req.body, res);

  } catch (err) {
    console.error('Error in main handler:', err);
    if (!res.headersSent) {
      res.status(500).send('Internal Server Error');
    }
  }
}
