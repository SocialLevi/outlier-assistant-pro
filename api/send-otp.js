// This file should be placed in: /api/send-otp.js

// This function handles sending the OTP to the user's Telegram.
// NOTE: This is a simplified example. In a real-world scenario,
// you would need to securely look up the user's chat_id based on their username.
// For this demo, we'll assume the user provides their chat_id directly or it's retrieved from a database.

const { Telegraf } = require('telegraf');

// IMPORTANT: You must set your TELEGRAM_BOT_TOKEN in your Vercel Environment Variables.
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// In-memory store for OTPs. In a real app, use a database like Redis or Vercel KV.
const otpStore = new Map();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
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
  const CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID'; // <-- REPLACE THIS

  if (!CHAT_ID) {
    console.error('User chat_id not found for username:', username);
    return res.status(404).json({ error: 'User not found or has not linked their Telegram account.' });
  }

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Store the OTP with a 5-minute expiration
  const expiration = Date.now() + 5 * 60 * 1000;
  otpStore.set(username, { otp, expiration });

  try {
    // Send the OTP message via your Telegram bot
    await bot.telegram.sendMessage(CHAT_ID, `Your OutlierHelp login code is: ${otp}\nThis code will expire in 5 minutes.`);
    
    console.log(`OTP sent to ${username} (Chat ID: ${CHAT_ID})`);
    res.status(200).json({ message: 'OTP has been sent to your Telegram account.' });

  } catch (error) {
    console.error('Error sending Telegram message:', error);
    res.status(500).json({ error: 'Failed to send OTP. Please ensure your username is correct and you have started a chat with the bot.' });
  }
}
