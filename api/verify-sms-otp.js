// This file should be placed in: /api/verify-sms-otp.js
import { Redis } from '@upstash/redis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).json({ error: 'Phone number and OTP are required.' });
  }

  const otpKey = `otp:${phoneNumber}`;

  try {
    const redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });

    const storedOtp = await redis.get(otpKey);

    if (!storedOtp) {
      return res.status(400).json({ error: 'OTP not found or has expired. Please request a new one.' });
    }

    if (otp !== storedOtp) {
      return res.status(400).json({ error: 'Invalid OTP.' });
    }

    await redis.del(otpKey);
    
    res.status(200).json({ success: true, message: 'Login successful!', user: { phone: phoneNumber } });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Failed to verify OTP.' });
  }
}
