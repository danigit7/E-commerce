import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protect, (req, res) => {
  res.json({
    success: true,
    message: 'User profile update endpoint',
  });
});

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
router.get('/', protect, (req, res) => {
  res.json({
    success: true,
    message: 'Get all users endpoint (admin)',
  });
});

export default router;

