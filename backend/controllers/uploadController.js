import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Private/Admin
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary with optimized settings
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'luxury-ecommerce/products',
      transformation: [
        { width: 1000, height: 1000, crop: 'limit' },
        { quality: 'auto:best' },
        { format: 'auto' },
      ],
      resource_type: 'auto',
    });

    // Clean up temporary file
    fs.unlinkSync(req.file.path);

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    });
  } catch (error) {
    // Clean up temporary file on error
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting temporary file:', unlinkError);
      }
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload multiple images
// @route   POST /api/upload/multiple
// @access  Private/Admin
export const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploadPromises = req.files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        folder: 'luxury-ecommerce/products',
        transformation: [
          { width: 1000, height: 1000, crop: 'limit' },
          { quality: 'auto:best' },
          { format: 'auto' },
        ],
        resource_type: 'auto',
      })
    );

    const results = await Promise.all(uploadPromises);

    // Clean up temporary files
    req.files.forEach(file => {
      try {
        fs.unlinkSync(file.path);
      } catch (unlinkError) {
        console.error('Error deleting temporary file:', unlinkError);
      }
    });

    const images = results.map((result, index) => ({
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
      alt: req.files[index].originalname,
      isPrimary: index === 0,
    }));

    res.json(images);
  } catch (error) {
    // Clean up temporary files on error
    if (req.files) {
      req.files.forEach(file => {
        try {
          fs.unlinkSync(file.path);
        } catch (unlinkError) {
          console.error('Error deleting temporary file:', unlinkError);
        }
      });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete image from Cloudinary
// @route   DELETE /api/upload/:publicId
// @access  Private/Admin
export const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params;

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'not found') {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.json({ 
      message: 'Image deleted successfully',
      result: result.result 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete multiple images from Cloudinary
// @route   DELETE /api/upload/multiple
// @access  Private/Admin
export const deleteMultipleImages = async (req, res) => {
  try {
    const { publicIds } = req.body;

    if (!publicIds || !Array.isArray(publicIds) || publicIds.length === 0) {
      return res.status(400).json({ message: 'Public IDs are required' });
    }

    const deletePromises = publicIds.map(publicId => 
      cloudinary.uploader.destroy(publicId)
    );

    const results = await Promise.all(deletePromises);

    const successCount = results.filter(result => result.result === 'ok').length;
    const notFoundCount = results.filter(result => result.result === 'not found').length;

    res.json({
      message: `${successCount} images deleted successfully`,
      successCount,
      notFoundCount,
      totalRequested: publicIds.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Transform image (resize, crop, etc.)
// @route   POST /api/upload/transform
// @access  Private/Admin
export const transformImage = async (req, res) => {
  try {
    const { publicId, transformations } = req.body;

    if (!publicId) {
      return res.status(400).json({ message: 'Public ID is required' });
    }

    const defaultTransformations = {
      width: 1000,
      height: 1000,
      crop: 'limit',
      quality: 'auto:best',
      format: 'auto',
    };

    const finalTransformations = { ...defaultTransformations, ...transformations };

    const result = await cloudinary.uploader.upload(
      `image/upload/${publicId}`,
      {
        transformation: [finalTransformations],
        resource_type: 'image',
      }
    );

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get image info
// @route   GET /api/upload/info/:publicId
// @access  Private/Admin
export const getImageInfo = async (req, res) => {
  try {
    const { publicId } = req.params;

    const result = await cloudinary.api.resource(publicId);

    res.json({
      public_id: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
      created_at: result.created_at,
      folder: result.folder,
    });
  } catch (error) {
    if (error.http_code === 404) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(500).json({ message: error.message });
  }
};

