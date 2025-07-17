// This file should be placed in: /api/login.js
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { username } = req.body;
  const cleanUsername = username.startsWith('@') ? username.substring(1) : username;

  if (!cleanUsername) {
    return res.status(400).json({ error: 'Telegram username is required.' });
  }

  const userKey = `user:${cleanUsername}`;

  try {
    const user = await kv.get(userKey);

    if (!user) {
      return res.status(404).json({ error: 'User not found. Please start a chat with our Telegram bot first.' });
    }

    // User is verified. In a real app, you would generate a JWT here.
    res.status(200).json({ success: true, message: 'Login successful!', username: cleanUsername });

  } catch (error) {
    console.error('Error during login verification:', error);
    res.status(500).json({ error: 'Failed to verify user.' });
  }
}
