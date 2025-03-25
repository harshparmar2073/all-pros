const express = require('express');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const User = require('../models/UserModel')
const Verification = require('../models/VerificationModel');

const router = express.Router();

// Configure Nodemailer transporter (example uses Gmail)
const transporter = nodemailer.createTransport({
  service: 'Gmail', // or another provider
  auth: {
    user: process.env.EMAIL_USER,    // set in your .env
    pass: process.env.EMAIL_PASS,    // set in your .env
  },
});

// POST /api/auth/login
// Step 1: Validate login credentials, generate a code, store it, and send an email.
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    const { email, password } = req.body;
    try {
      // Find the user (in production, compare hashed passwords)
      const user = await User.findOne({ email });
      if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      // Generate a 6-digit code securely
      const code = crypto.randomInt(100000, 1000000).toString();
      // Set expiry to 10 minutes from now
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
      
      // Remove any previous verification for this user
      await Verification.findOneAndDelete({ userId: user._id });
      
      // Save the new verification record
      const verification = new Verification({
        userId: user._id,
        code,
        expiresAt,
      });
      await verification.save();
      
      // Send email with the verification code
      const mailOptions = {
        from: process.env.EMAIL_FROM || '"Your App" <no-reply@yourapp.com>',
        to: user.email,
        subject: 'Your Verification Code',
        text: `Your verification code is ${code}. It will expire in 10 minutes.`,
        html: `<p>Your verification code is <strong>${code}</strong>. It will expire in 10 minutes.</p>`,
      };
      await transporter.sendMail(mailOptions);
      
      // Respond that the code was sent
      res.status(200).json({ message: 'Verification code sent to your email' });
      
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// POST /api/auth/verify
// Step 2: Verify the submitted code.
router.post(
  '/verify',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('code')
      .isLength({ min: 6, max: 6 })
      .withMessage('Verification code must be 6 digits')
      .matches(/^\d{6}$/)
      .withMessage('Verification code must be numeric'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    const { email, code } = req.body;
    
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'User not found' });
      
      // Find the verification record
      const verification = await Verification.findOne({ userId: user._id });
      if (!verification) {
        return res.status(400).json({ message: 'No verification code found. Please login again.' });
      }
      
      // Check if code is expired
      if (verification.expiresAt < new Date()) {
        await Verification.findOneAndDelete({ userId: user._id });
        return res.status(400).json({ message: 'Verification code expired. Please request a new code.' });
      }
      
      // Compare the code
      if (verification.code !== code) {
        return res.status(400).json({ message: 'Invalid verification code' });
      }
      
      // Mark the user as verified
      user.isVerified = true;
      await user.save();
      
      // Remove the verification record after successful verification
      await Verification.findOneAndDelete({ userId: user._id });
      
      // You can now generate a JWT or session and return it to the client.
      // For this example, we just send a success message.
      res.status(200).json({ message: 'Verification successful', userId: user._id });
      
    } catch (err) {
      console.error('Verification error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
