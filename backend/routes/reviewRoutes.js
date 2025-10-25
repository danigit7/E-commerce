import express from 'express';
import {
  addReview,
  getProductReviews,
  deleteReview,
} from '../controllers/reviewController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  reviewValidation,
  validate,
} from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/:productId', protect, reviewValidation, validate, addReview);
router.get('/:productId', getProductReviews);
router.delete('/:productId/:reviewId', protect, admin, deleteReview);

export default router;

