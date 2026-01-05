import express from 'express';
import { getUserWishlist, addToWishlist, removeFromWishlist, getAllWishlists } from '../controllers/wishlistController.js';
// import { deleteWishlistItem } from '../controllers/wishlistController.js';

const router = express.Router();

// Route to fetch wishlist by userId
router.get('/user/:userId', getUserWishlist); // Fetch wishlist based on userId

// Other routes for wishlist
router.post('/', addToWishlist); // Add an event to the wishlist
router.delete('/:id', removeFromWishlist); // Remove an event from the wishlist
router.get('/', getAllWishlists); // Get all wishlists (admin)

export default router;
