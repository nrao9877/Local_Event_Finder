import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import paymentRoutes from './routes/paymentRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON requests
// Test Email Route
app.get('/test-email', async (req, res) => {
  try {
    // Send a test email to the provided address
    await transporter.sendMail({
      to: 'jaswanthreddy.2019@gmail.com', // Change this to a valid email address
      subject: 'Test Email',
      text: 'This is a test email.',
    });
    res.send('Test email sent successfully');
  } catch (error) {
    console.error('Failed to send test email:', error);
    res.status(500).send('Failed to send test email');
  }
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/payments', paymentRoutes);


// Error Handler Middleware
app.use(errorHandler);

// Listen to requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
