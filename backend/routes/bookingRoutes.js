import express from 'express';
import { getUserBookings, createBooking, updateBookingStatus, deleteBooking, getAllBookings, getUserBookingsWithReviews } from '../controllers/bookingController.js';
import { getRsvpNotifications, submitRsvp } from '../controllers/bookingController.js';

const router = express.Router();

// Route to fetch bookings by userId
router.get('/user/:userId', getUserBookings); // Fetch bookings based on userId

// Other routes for bookings
router.post('/', createBooking); // Create a new booking
router.put('/:id', updateBookingStatus); // Update booking status
router.delete('/:id', deleteBooking); // Delete a booking
router.get('/', getAllBookings); // Get all bookings (admin)
router.get('/bookings-reviews/user/:userId', getUserBookingsWithReviews);
router.get('/rsvp-notifications/:userId', getRsvpNotifications);
router.post('/rsvp', submitRsvp);


export default router;
