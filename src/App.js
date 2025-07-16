// This file should be placed in: /api/telegram-webhook.js
import { kv } from '@vercel/kv';
import { Telegraf } from 'telegraf';

export default async function handler(req, res) {
  try {
    // Check for essential environment variables at the start
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      console.error('CRITICAL ERROR: Missing required environment variables.');
      return res.status(500).send('Internal Server Configuration Error');
    }

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
        // Store the OTP in Vercel KV with a 5-minute expiration (300 seconds)
        await kv.set(otpKey, otp, { ex: 300 });

        // Send the OTP to the user
        await ctx.reply(`Welcome to OutlierHelp! Your one-time login code is: ${otp}\n\nReturn to the website and enter your username and this code to log in.`);
        console.log(`OTP sent to ${username}`);
      } catch (error) {
        console.error('Error handling /start command (e.g., KV or Telegram send failed):', error);
        await ctx.reply('Sorry, there was an error processing your request. Please try again later.').catch(err => console.error("Failed to send error reply:", err));
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
