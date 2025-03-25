const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const RestaurantLogin = require('../models/RestaurantSignupModel'); 

// POST /api/restaurants/login
router.post(
  '/login',
  [
    body('supportEmail').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { supportEmail, password } = req.body;
      const restaurant = await RestaurantLogin.findOne({ supportEmail });

      if (!restaurant) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // For production, use bcrypt.compare() to compare hashed passwords
      if (restaurant.password !== password) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Optionally, update lastLogin timestamp
      restaurant.lastLogin = new Date();
      await restaurant.save();

      return res.status(200).json({ message: 'Login successful', restaurant });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
