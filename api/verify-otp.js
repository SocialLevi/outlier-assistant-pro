import { Redis } from '@upstash/redis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { username, otp } = req.body;

  if (!username || !otp) {
    return res.status(400).json({ error: 'Username and OTP are required.' });
  }

  const key = `otp:${username}`;

  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    const storedOtp = await redis.get(key);

    if (!storedOtp) {
      return res.status(400).json({ error: 'OTP not found or has expired. Please request a new one by messaging /start to our bot.' });
    }

    if (otp !== storedOtp) {
      return res.status(400).json({ error: 'Invalid OTP.' });
    }

    // OTP is correct. Delete it so it can't be used again.
    await redis.del(key);
    
    // In a real app, you would generate a secure session token (JWT) here.
    res.status(200).json({ success: true, message: 'Login successful!' });

  } catch (error) {
    console.error('Error in verify-otp:', error);
    res.status(500).json({ error: 'Failed to verify OTP.' });
  }
}
