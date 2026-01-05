import express from 'express';
import { addReview, getReviews, updateReview, deleteReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addReview); // Add a review
router.get('/:eventId', getReviews); // Get reviews for a specific event
router.put('/:id', protect, updateReview); // Update a review
router.delete('/:id', protect, deleteReview); // Delete a review

export default router;
