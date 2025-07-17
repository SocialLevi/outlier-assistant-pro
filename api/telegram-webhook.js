// This file should be placed in: /api/telegram-webhook.js
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    // Check for essential environment variables at the start
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      console.error('CRITICAL ERROR: Missing required environment variables.');
      return res.status(500).send('Internal Server Configuration Error');
    }

    const body = req.body;
    const message = body.message || body.edited_message;

    if (message && message.text === '/start') {
      const chatId = message.chat.id;
      const username = message.from.username;

      if (!username) {
        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: 'Please set a username in your Telegram settings to use this service.',
          }),
        });
        return res.status(200).send('OK');
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpKey = `otp:${username}`;

      try {
        await kv.set(otpKey, otp, { ex: 300 });

        const replyText = `Welcome to OutlierHelp! Your one-time login code is: ${otp}\n\nReturn to the website and enter your username and this code to log in.`;
        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: replyText }),
        });

        console.log(`OTP sent to ${username}`);
      } catch (error) {
        console.error('Error handling /start command:', error);
        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: 'Sorry, there was an error processing your request. Please try again later.',
          }),
        }).catch(err => console.error("Failed to send error reply:", err));
      }
    }
    
    return res.status(200).send('OK');

  } catch (err) {
    console.error('Error in main handler:', err);
    if (!res.headersSent) {
      res.status(500).send('Internal Server Error');
    }
  }
}
