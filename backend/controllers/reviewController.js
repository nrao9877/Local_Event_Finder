// controllers/reviewController.js
import Review from '../models/Review.js';

// Add a review for an event
export const addReview = async (req, res) => {
  const { event, rating, comment } = req.body;

  try {
    const review = new Review({
      event,
      user: req.user._id, // User ID from JWT
      rating,
      comment,
    });

    const createdReview = await review.save();
    res.status(201).json(createdReview);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all reviews for an event
export const getReviews = async (req, res) => {
  const { eventId } = req.params;

  try {
    const reviews = await Review.find({ event: eventId }).populate('user', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a review (Admin or User who created it)
export const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    // Check if user is admin or the creator of the review
    if (req.user.isAdmin || review.user.toString() === req.user._id.toString()) {
      review.rating = rating || review.rating;
      review.comment = comment || review.comment;

      await review.save();
      res.json({ message: 'Review updated successfully' });
    } else {
      res.status(403).json({ message: 'Not authorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a review (Admin or User who created it)
export const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    // Check if user is admin or the creator of the review
    if (req.user.isAdmin || review.user.toString() === req.user._id.toString()) {
      await review.remove();
      res.json({ message: 'Review deleted successfully' });
    } else {
      res.status(403).json({ message: 'Not authorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};