import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, addReview } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import {
  addToWishlist,
  removeFromWishlist,
} from '../store/slices/wishlistSlice';
import ProductDetailSkeleton from '../components/ProductDetailSkeleton';
import {
  FiHeart,
  FiShoppingCart,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { toast } from 'react-toastify';

function ProductDetail() {
  const { idOrSlug } = useParams();
  const dispatch = useDispatch();
  const { currentProduct: product, loading } = useSelector(
    (state) => state.product
  );
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    dispatch(fetchProductById(idOrSlug));
  }, [dispatch, idOrSlug]);

  const isInWishlist = wishlistItems?.some((item) => item._id === product?._id);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    dispatch(addToCart({ productId: product._id, quantity }));
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to wishlist');
      return;
    }
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product._id));
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to add a review');
      return;
    }
    dispatch(addReview({ productId: product._id, reviewData }));
    setShowReviewForm(false);
    setReviewData({ rating: 5, comment: '' });
  };

  if (loading || !product) {
    return <ProductDetailSkeleton />;
  }

  const displayPrice = product.discountPrice || product.price;
  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;
  const images = product.images || [];

  return (
    <div className="min-h-screen bg-ivory py-12">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-charcoal-600 mb-8">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary">
            Shop
          </Link>
          <span>/</span>
          <span className="text-charcoal">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square overflow-hidden rounded-xl bg-white mb-4"
            >
              <img
                src={images[selectedImage]?.url || '/placeholder.jpg'}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {hasDiscount && (
                <div className="absolute top-4 left-4 bg-gold text-charcoal px-3 py-1 rounded-full font-semibold">
                  {Math.round(
                    ((product.price - product.discountPrice) / product.price) *
                      100
                  )}
                  % OFF
                </div>
              )}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
                  >
                    <FiChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
                  >
                    <FiChevronRight size={24} />
                  </button>
                </>
              )}
            </motion.div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-4">
              <span className="text-sm text-gold font-semibold">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl font-serif font-bold mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={
                      i < Math.round(product.rating)
                        ? 'text-gold fill-gold'
                        : 'text-charcoal-300'
                    }
                    size={20}
                  />
                ))}
              </div>
              <span className="text-charcoal-600">
                {product.rating?.toFixed(1)} ({product.numReviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3 mb-6">
              <span className="text-4xl font-bold text-primary">
                ${displayPrice?.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-2xl text-charcoal-500 line-through">
                  ${product.price?.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-charcoal-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <span className="text-green-600 font-semibold">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="flex items-center space-x-4 mb-6">
                <label className="font-semibold">Quantity:</label>
                <div className="flex items-center border border-charcoal-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-ivory transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x border-charcoal-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="px-4 py-2 hover:bg-ivory transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 btn-primary flex items-center justify-center space-x-2"
              >
                <FiShoppingCart />
                <span>Add to Cart</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWishlistToggle}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  isInWishlist
                    ? 'bg-gold border-gold text-charcoal'
                    : 'border-charcoal-300 hover:border-gold'
                }`}
              >
                <FiHeart
                  size={24}
                  fill={isInWishlist ? 'currentColor' : 'none'}
                />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold">Customer Reviews</h2>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="btn-outline"
            >
              Write a Review
            </button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              onSubmit={handleSubmitReview}
              className="mb-8 p-6 bg-ivory rounded-lg"
            >
              <div className="mb-4">
                <label className="block font-semibold mb-2">Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setReviewData({ ...reviewData, rating: star })
                      }
                    >
                      <FiStar
                        size={32}
                        className={
                          star <= reviewData.rating
                            ? 'text-gold fill-gold'
                            : 'text-charcoal-300'
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Your Review</label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) =>
                    setReviewData({ ...reviewData, comment: e.target.value })
                  }
                  rows="4"
                  className="input-field"
                  required
                />
              </div>
              <div className="flex space-x-2">
                <button type="submit" className="btn-primary">
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="border-b border-charcoal-200 pb-6"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={
                          i < review.rating
                            ? 'text-gold fill-gold'
                            : 'text-charcoal-300'
                        }
                        size={16}
                      />
                    ))}
                  </div>
                  <p className="font-semibold mb-2">{review.name}</p>
                  <p className="text-charcoal-700">{review.comment}</p>
                  <p className="text-sm text-charcoal-500 mt-2">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-charcoal-600 py-8">
                No reviews yet. Be the first to review this product!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
