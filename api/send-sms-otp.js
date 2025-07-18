// This file should be placed in: /api/send-sms-otp.js
import { Redis } from '@upstash/redis';
import twilio from 'twilio';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ error: 'Phone number is required.' });
  }

  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER || !process.env.REDIS_URL || !process.env.REDIS_TOKEN) {
    console.error('CRITICAL ERROR: Missing environment variables.');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  const redis = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_TOKEN,
  });
  
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpKey = `otp:${phoneNumber}`;

  try {
    await redis.set(otpKey, otp, { ex: 300 }); // Store OTP for 5 minutes

    await twilioClient.messages.create({
      body: `Your Outlier login code is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    res.status(200).json({ success: true, message: `OTP sent to ${phoneNumber}` });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ error: 'Failed to send OTP. Please check the phone number.' });
  }
}
