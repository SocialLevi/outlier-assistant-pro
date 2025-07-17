// This file should be placed in: /api/telegram-webhook.js
import { kv } from '@vercel/kv';
import { Telegraf } from 'telegraf';

export default async function handler(req, res) {
  try {
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      console.error('CRITICAL ERROR: Missing required environment variables.');
      return res.status(500).send('Internal Server Configuration Error');
    }

    const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

    bot.start(async (ctx) => {
      const chatId = ctx.chat.id;
      const username = ctx.from.username;

      if (!username) {
        return ctx.reply('Please set a username in your Telegram settings to use this service.');
      }

      const userKey = `user:${username}`;

      try {
        await kv.set(userKey, { chatId, username, registeredAt: new Date().toISOString() });
        await ctx.reply(`Welcome, @${username}! You are now registered. You can now log in on our website using your username.`);
        console.log(`User registered: @${username}`);
      } catch (error) {
        console.error('Error during user registration:', error);
        await ctx.reply('Sorry, there was an error registering your account. Please try again later.');
      }
    });

    await bot.handleUpdate(req.body, res);

  } catch (err) {
    console.error('Error in main handler:', err);
    if (!res.headersSent) {
      res.status(500).send('Internal Server Error');
    }
  }
}
