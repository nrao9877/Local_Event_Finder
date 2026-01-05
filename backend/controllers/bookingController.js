// controllers/bookingController.js
import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import mongoose from 'mongoose';
import Review from '../models/Review.js';
// Create a new booking
export const createBooking = async (req, res) => {
  const { event, user, totalAmount, numberOfTickets } = req.body; // Extract required fields from the request body

  try {
    // Validate if the event exists
    const eventExists = await Event.findById(event);
    if (!eventExists) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the user already has a booking for this event
    const existingBooking = await Booking.findOne({ event: eventExists._id, user: user });
    if (existingBooking) {
      return res.status(400).json({ message: 'User is already registered for this event.' });
    }

    // Create the booking with user ID, event ID, and other details
    const booking = new Booking({
      event: eventExists._id,
      user: user, // Use the user ID passed in the request
      totalAmount,
      numberOfTickets,
      paymentStatus: 'Pending', // Default to 'Pending'
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking); // Respond with the created booking
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// Get all bookings (Admin only)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('event') // Populate event details
      .populate('user'); // Populate user details

    res.json(bookings); // Return all bookings
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update booking status (Admin only)
export const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { paymentStatus } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.paymentStatus = paymentStatus || booking.paymentStatus; // Update the payment status
    await booking.save(); // Save the updated booking

    res.json({ message: 'Booking updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete booking by ID (Admin only)
export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    await booking.remove(); // Remove the booking
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Update booking status
export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { paymentStatus } = req.body; // Get the new payment status

  try {
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.paymentStatus = paymentStatus || booking.paymentStatus; // Update the payment status
    await booking.save(); // Save the updated booking

    res.json({ message: 'Booking updated successfully', booking }); // Return the updated booking
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const getUserBookings = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Cast the userId to a MongoDB ObjectId manually
    const userObjectId = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : null;

    if (!userObjectId) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    const bookings = await Booking.find({ user: userObjectId })
      .populate('event')
      .populate('user');

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user.' });
    }

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getUserBookingsWithReviews = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch bookings for the user
    const bookings = await Booking.find({ user: userId })
      .populate('event', 'title date category imageUrl location') // Populate event details
      .lean(); // Lean to get plain JS objects

    // Get event IDs from bookings to fetch reviews
    const eventIds = bookings.map(booking => booking.event._id);

    // Fetch reviews for the events related to the user's bookings
    const reviews = await Review.find({
      user: userId,
      event: { $in: eventIds }
    }).lean(); // Lean to get plain JS objects

    // Combine bookings and reviews
    const bookingsWithReviews = bookings.map(booking => {
      const review = reviews.find(r => r.event.toString() === booking.event._id.toString());
      return {
        ...booking,
        review: review || null // Attach the review if exists, or null
      };
    });

    res.status(200).json({
      bookings: bookingsWithReviews,
      reviews: reviews
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
// Get all bookings for a user where RSVP is false
export const getRsvpNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch bookings where RSVP is still "Pending"
    const bookings = await Booking.find({ user: userId, rsvp: 'Pending' }).populate('event');

    // If no pending RSVPs, return a message
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No RSVP notifications found.' });
    }

    // Return pending RSVPs
    res.json({ pendingRsvps: bookings });
  } catch (error) {
    console.error('Error fetching RSVP notifications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// controllers/bookingController.js
// Update RSVP status for a booking
export const submitRsvp = async (req, res) => {
  const { user, event, rsvp } = req.body;

  try {
    // Find the booking for the user and event
    const booking = await Booking.findOne({ user, event });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    // Update the RSVP status based on confirmation value
    booking.rsvp = rsvp ? 'Attending' : 'Not Attending';
    
    // Save the booking with updated RSVP status
    await booking.save();

    res.json({ message: 'RSVP status updated successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
