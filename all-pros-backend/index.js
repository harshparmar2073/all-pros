require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const verifyRoutes = require('./routes/VerificationRoute');
// Include other routes as needed
const restaurantSignupRoutes = require('./routes/RestaurantSignupRoute');
const restaurantLoginRoutes = require('./routes/RestaurantLoginRoute');

const app = express();

// Allow requests from your frontend origin (e.g., localhost:5173)
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());

// Connect to MongoDB (URI in .env)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Mount routes
app.use('/api/verify', verifyRoutes);
app.use('/api/restaurants', restaurantSignupRoutes);
app.use('/api/restaurants', restaurantLoginRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
