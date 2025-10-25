import express from 'express';
import {
  register,
  login,
  logout,
  refreshToken,
  getMe,
  forgotPassword,
  resetPassword,
  verifyToken,
  googleAuth,
  googleCallback,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import {
  registerValidation,
  loginValidation,
  validate,
} from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.post('/logout', protect, logout);
router.post('/refresh', refreshToken);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/verify', protect, verifyToken);

// Google OAuth routes
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

export default router;
