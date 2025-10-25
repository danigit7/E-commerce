import Product from '../models/Product.js';
import Order from '../models/Order.js';

// @desc    Add product review
// @route   POST /api/reviews/:productId
// @access  Private
export const addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user has purchased this product
    const hasPurchased = await Order.findOne({
      user: req.user._id,
      'items.product': productId,
      paymentStatus: 'paid',
    });

    if (!hasPurchased) {
      return res
        .status(400)
        .json({ message: 'You can only review products you have purchased' });
    }

    // Check if user already reviewed
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: 'You have already reviewed this product' });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    // Calculate average rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product reviews
// @route   GET /api/reviews/:productId
// @access  Public
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId).populate(
      'reviews.user',
      'name'
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product.reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete review (Admin only)
// @route   DELETE /api/reviews/:productId/:reviewId
// @access  Private/Admin
export const deleteReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.reviews = product.reviews.filter(
      (review) => review._id.toString() !== reviewId
    );

    product.numReviews = product.reviews.length;

    // Recalculate rating
    if (product.reviews.length > 0) {
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
    } else {
      product.rating = 0;
    }

    await product.save();

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

