// File: server/routes/restaurant.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Restaurant = require('../models/RestaurantSignupModel')

// POST /api/restaurants/signup
router.post(
  '/signup',
  [
    body('restaurantName')
      .notEmpty()
      .withMessage('Name of Restaurant is required'),
    body('ownerName')
      .notEmpty()
      .withMessage('Name of Owner is required'),
    body('contactPersonName')
      .notEmpty()
      .withMessage('Name of Contact Person is required'),
    body('location')
      .notEmpty()
      .withMessage('Location is required'),
    body('phoneNumber')
      .notEmpty()
      .withMessage('Phone number is required'),
    body('supportEmail')
      .isEmail()
      .withMessage('Valid support email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('confirmPassword')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Passwords must match'),
    body('restaurantType')
      .notEmpty()
      .withMessage('Type of Restaurant is required'),
    // Only require branchLocation if hasBranches is 'yes'
    body('branchLocation').custom((value, { req }) => {
      if (req.body.hasBranches === 'yes' && !value) {
        throw new Error('Branch Location is required');
      }
      return true;
    }),
  ],
  async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create new restaurant record (remember to hash the password in production)
      const newRestaurant = new Restaurant({
        restaurantName: req.body.restaurantName,
        ownerName: req.body.ownerName,
        contactPersonName: req.body.contactPersonName,
        location: req.body.location,
        phoneNumber: req.body.phoneNumber,
        supportEmail: req.body.supportEmail,
        password: req.body.password, // IMPORTANT: Hash this password before saving in production!
        restaurantType: req.body.restaurantType,
        hasBranches: req.body.hasBranches,
        branchLocation: req.body.branchLocation || null,
      });

      const savedRestaurant = await newRestaurant.save();
      return res.status(201).json({ message: 'Signup successful!', restaurant: savedRestaurant });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
