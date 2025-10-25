import express from 'express';
import {
  createCheckoutSession,
  stripeWebhook,
  getPaymentStatus,
} from '../controllers/stripeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-checkout-session', protect, createCheckoutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);
router.get('/payment-status/:orderId', protect, getPaymentStatus);

export default router;

