import express from 'express';
import multer from 'multer';
import {
  uploadImage,
  uploadMultipleImages,
  deleteImage,
  deleteMultipleImages,
  transformImage,
  getImageInfo,
} from '../controllers/uploadController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Multer configuration for temporary file storage
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

// Upload routes
router.post('/', protect, admin, upload.single('image'), uploadImage);
router.post(
  '/multiple',
  protect,
  admin,
  upload.array('images', 10),
  uploadMultipleImages
);

// Delete routes
router.delete('/:publicId', protect, admin, deleteImage);
router.delete('/multiple', protect, admin, deleteMultipleImages);

// Transform and info routes
router.post('/transform', protect, admin, transformImage);
router.get('/info/:publicId', protect, admin, getImageInfo);

export default router;

