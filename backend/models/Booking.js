// models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // Reference to the Event model
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid'],
    default: 'Pending',
  },
  numberOfTickets: {
    type: Number,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now, // Automatically set the booking date
  },
  rsvp: {
    type: String,
    enum: ['Pending', 'Attending', 'Not Attending'], // RSVP can be Pending, Attending, or Not Attending
    default: 'Pending', // Default RSVP status
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
