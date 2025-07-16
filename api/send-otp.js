const { Telegraf } = require('telegraf');

// This function would use the Telegram Bot Token from Vercel's Environment Variables
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Telegram username is required.' });
  }

  // In a real application, you would look up the user's chat_id from a database
  // and use the Telegraf instance to send a message.
  // For this frontend-only demonstration, we just simulate success.
  
  console.log(`Simulating OTP sent to ${username}`);
  
  res.status(200).json({ message: `An OTP has been sent to your Telegram account (${username}).` });
}
