import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // Reference to the Event model
    required: true,
  },
  addedDate: {
    type: Date,
    default: Date.now, // Automatically set when the event is added to the wishlist
  },
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
