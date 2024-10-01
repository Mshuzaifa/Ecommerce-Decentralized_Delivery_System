const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const volunteerRoutes = require('./routes/volunteer');
const deliveryRoutes = require('./routes/delivery');

// Route middlewares
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/deliveries', deliveryRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
