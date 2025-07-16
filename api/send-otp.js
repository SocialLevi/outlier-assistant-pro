// This file should be placed in: /api/send-otp.js
import { Redis } from '@upstash/redis';
import { Telegraf } from 'telegraf';

// Initialize Redis client from Vercel Environment Variables
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Initialize Telegram Bot from Vercel Environment Variables
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Telegram username is required.' });
  }
  
  // --- IMPORTANT ---
  // This is a placeholder for looking up the user's chat_id.
  // A real application would need a database to map usernames to chat_ids.
  // For this example, we'll use a hardcoded chat_id. Replace with a real one for testing.
  // You can get your chat_id by messaging @userinfobot on Telegram.
  const CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID'; // <-- REPLACE THIS WITH YOUR ACTUAL CHAT ID FOR TESTING

  if (!CHAT_ID) {
    console.error('User chat_id not found for username:', username);
    return res.status(404).json({ error: 'User not found or has not linked their Telegram account.' });
  }

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const key = `otp:${username}`;
  
  try {
    // Store the OTP in Upstash Redis with a 5-minute expiration (300 seconds)
    await redis.set(key, otp, { ex: 300 });

    // Send the OTP message via your Telegram bot
    await bot.telegram.sendMessage(CHAT_ID, `Your OutlierHelp login code is: ${otp}\nThis code will expire in 5 minutes.`);
    
    console.log(`OTP sent to ${username} (Chat ID: ${CHAT_ID})`);
    res.status(200).json({ message: 'OTP has been sent to your Telegram account.' });

  } catch (error) {
    console.error('Error in send-otp:', error);
    res.status(500).json({ error: 'Failed to send OTP. Please ensure your username is correct and you have started a chat with the bot.' });
  }
}
