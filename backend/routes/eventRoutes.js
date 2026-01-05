import express from 'express';
import { createEvent, getEvents, updateEvent, deleteEvent, getEventById } from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(protect, admin, createEvent);

router.route('/:id')
  .get(getEventById)
  .put(protect, admin, updateEvent) // Admin can update an event
  .delete(protect, admin, deleteEvent); // Admin can delete an event

export default router;
