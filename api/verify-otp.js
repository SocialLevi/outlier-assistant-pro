export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const { username, otp } = req.body;

  if (!username || !otp) {
    return res.status(400).json({ error: 'Username and OTP are required.' });
  }

  // In a real application, you would check the OTP against a value stored in a database.
  // For this demonstration, any 6-digit code is accepted to simulate a successful login.
  if (otp.length === 6 && /^\d+$/.test(otp)) {
    console.log(`OTP verified for user: ${username}`);
    res.status(200).json({ success: true, message: 'Login successful!' });
  } else {
    res.status(400).json({ error: 'Invalid OTP format.' });
  }
}
