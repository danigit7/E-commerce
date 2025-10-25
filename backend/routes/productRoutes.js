import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getProductStats,
  getRelatedProducts,
  bulkUpdateProducts,
  bulkDeleteProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  productValidation,
  validate,
} from '../middleware/validationMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/categories/all', getCategories);
router.get('/stats', protect, admin, getProductStats);
router.get('/:idOrSlug', getProductById);
router.get('/:id/related', getRelatedProducts);

// Admin routes
router.post('/', protect, admin, productValidation, validate, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

// Bulk operations (Admin only)
router.put('/bulk', protect, admin, bulkUpdateProducts);
router.delete('/bulk', protect, admin, bulkDeleteProducts);

export default router;

