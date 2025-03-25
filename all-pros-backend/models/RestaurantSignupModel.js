const mongoose = require('mongoose');

const RestaurantSignupSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  ownerName: { type: String, required: true },
  contactPersonName: { type: String, required: true },
  location: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  supportEmail: { type: String, required: true },
  password: { type: String, required: true },
  restaurantType: { type: String, required: true },
  hasBranches: { type: String, enum: ['yes', 'no'], default: 'no' },
  branchLocation: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('RestaurantSignup', RestaurantSignupSchema);
