import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';
import {getEventStats, getTicketSalesData} from '../controllers/dashboardController.js'

const router = express.Router();

router.get('/ticket-sales', getTicketSalesData);
router.get('/event-stats', getEventStats);

export default router;
