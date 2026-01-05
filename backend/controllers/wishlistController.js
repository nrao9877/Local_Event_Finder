// controllers/wishlistController.js
import Wishlist from '../models/Wishlist.js';
import Event from '../models/Event.js';
import mongoose from 'mongoose';

// Add an event to the user's wishlist
export const addToWishlist = async (req, res) => {
  const { event, user } = req.body; // Extract event and user IDs from the request body

  try {
    // Validate if the event exists
    const eventExists = await Event.findById(event);
    if (!eventExists) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the event is already in the user's wishlist
    const existingWishlistItem = await Wishlist.findOne({ event: eventExists._id, user: user });
    if (existingWishlistItem) {
      return res.status(400).json({ message: 'Event is already in the user\'s wishlist.' });
    }

    // Create a new wishlist item
    const wishlistItem = new Wishlist({
      event: eventExists._id,
      user: user, // Use the user ID passed in the request
    });

    const createdWishlistItem = await wishlistItem.save();
    res.status(201).json(createdWishlistItem); // Respond with the created wishlist item
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all wishlist items (Admin only)
export const getAllWishlists = async (req, res) => {
  try {
    const wishlists = await Wishlist.find({})
      .populate('event') // Populate event details
      .populate('user'); // Populate user details

    res.json(wishlists); // Return all wishlist items
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all wishlist items for a specific user
export const getUserWishlist = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Validate and cast userId to a MongoDB ObjectId
    const userObjectId = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : null;

    if (!userObjectId) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    const wishlist = await Wishlist.find({ user: userObjectId })
      .populate('event') // Populate event details
      .populate('user'); // Populate user details

    if (wishlist.length === 0) {
      return res.status(404).json({ message: 'No wishlist items found for this user.' });
    }

    res.json(wishlist);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Remove an event from the user's wishlist
export const removeFromWishlist = async (req, res) => {
  const { id } = req.params; // Get the wishlist item ID from the request parameters

  try {
    // Find the wishlist item by its ID
    const wishlistItem = await Wishlist.findById(id);
    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    // Use `deleteOne()` to remove the wishlist item
    await wishlistItem.deleteOne();
    
    res.json({ message: 'Wishlist item removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

