import express from 'express';
import {
  getAdminStats,
  getAllUsers,
  toggleUserStatus,
  deleteUser,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected and admin-only
router.use(protect, admin);

router.get('/stats', getAdminStats);
router.get('/users', getAllUsers);
router.put('/users/:id/toggle-status', toggleUserStatus);
router.delete('/users/:id', deleteUser);

export default router;

