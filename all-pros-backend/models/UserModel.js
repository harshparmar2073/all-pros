const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }, // In production, store a hashed password!
  isVerified: { type: Boolean, default: false },
  // Add any additional fields as needed
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
