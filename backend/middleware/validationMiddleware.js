import { body, validationResult } from 'express-validator';

// Validation middleware
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Register validation
export const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

// Login validation
export const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Product validation
export const productValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),
  body('shortDescription')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Short description cannot exceed 200 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('discountPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Discount price must be a positive number'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['Watches', 'Jewelry', 'Bags', 'Accessories', 'Clothing', 'Shoes', 'Fragrances', 'Sunglasses'])
    .withMessage('Invalid category'),
  body('subcategory')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Subcategory cannot exceed 50 characters'),
  body('brand')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Brand name cannot exceed 50 characters'),
  body('sku')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('SKU cannot exceed 50 characters'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  body('lowStockThreshold')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Low stock threshold must be a non-negative integer'),
  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured must be a boolean'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('weight')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Weight must be a positive number'),
  body('dimensions.length')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Length must be a positive number'),
  body('dimensions.width')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Width must be a positive number'),
  body('dimensions.height')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Height must be a positive number'),
  body('colors')
    .optional()
    .isArray()
    .withMessage('Colors must be an array'),
  body('colors.*.name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Color name is required'),
  body('colors.*.hex')
    .optional()
    .matches(/^#[0-9A-F]{6}$/i)
    .withMessage('Color hex must be a valid hex color'),
  body('sizes')
    .optional()
    .isArray()
    .withMessage('Sizes must be an array'),
  body('metaTitle')
    .optional()
    .trim()
    .isLength({ max: 60 })
    .withMessage('Meta title cannot exceed 60 characters'),
  body('metaDescription')
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage('Meta description cannot exceed 160 characters'),
];

// Review validation
export const reviewValidation = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment').trim().notEmpty().withMessage('Comment is required'),
];

