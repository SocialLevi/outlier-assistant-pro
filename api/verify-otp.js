// This file should be placed in: /api/verify-otp.js

// This function handles verifying the OTP provided by the user.

// In-memory store for OTPs (should be the same instance as in send-otp,
// but Vercel creates separate instances for each function. A database is needed for a real app).
const otpStore = new Map(); // This will be empty on each invocation in a serverless environment.

// For this demo to work without a database, we'll have to rely on a "master OTP" for verification.
// In a real app, you would fetch the stored OTP from your database (Redis, Vercel KV, etc.).
const MASTER_OTP = "123456"; // A predictable OTP for demonstration purposes.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const { username, otp } = req.body;

  if (!username || !otp) {
    return res.status(400).json({ error: 'Username and OTP are required.' });
  }

  // --- REAL IMPLEMENTATION (with a database) ---
  // const storedOtpData = otpStore.get(username);
  // if (!storedOtpData) {
  //   return res.status(400).json({ error: 'No OTP found for this user. Please request one first.' });
  // }
  // if (Date.now() > storedOtpData.expiration) {
  //   otpStore.delete(username);
  //   return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
  // }
  // if (otp !== storedOtpData.otp) {
  //   return res.status(400).json({ error: 'Invalid OTP.' });
  // }

  // --- DEMO IMPLEMENTATION (without a database) ---
  if (otp !== MASTER_OTP) {
       return res.status(400).json({ error: 'Invalid OTP. For this demo, use 123456.' });
  }

  // If OTP is valid, clear it and send a success response.
  // In a real app, you would generate a JWT (JSON Web Token) here and send it to the client.
  // otpStore.delete(username); 
  
  res.status(200).json({ success: true, message: 'Login successful!' });
}
