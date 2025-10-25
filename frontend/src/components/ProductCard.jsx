import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import {
  addToWishlist,
  removeFromWishlist,
} from '../store/slices/wishlistSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  const isInWishlist = wishlistItems?.some((item) => item._id === product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      dispatch(addToCart({ productId: product._id, quantity: 1 }));
    } else {
      window.location.href = '/login';
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      if (isInWishlist) {
        dispatch(removeFromWishlist(product._id));
      } else {
        dispatch(addToWishlist(product._id));
      }
    } else {
      window.location.href = '/login';
    }
  };

  const displayPrice = product.discountPrice || product.price;
  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;

  return (
    <Link to={`/product/${product.slug || product._id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white overflow-hidden group cursor-pointer"
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-square bg-gray-50">
          <img
            src={product.images?.[0]?.url || '/placeholder.jpg'}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {hasDiscount && (
            <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-medium">
              {Math.round(
                ((product.price - product.discountPrice) / product.price) * 100
              )}
              % OFF
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-black text-white px-4 py-2 text-sm font-medium">
                Out of Stock
              </span>
            </div>
          )}
          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlistToggle}
              className={`p-2 ${
                isInWishlist ? 'bg-black text-white' : 'bg-white text-black'
              } border border-gray-200`}
            >
              <FiHeart
                size={16}
                fill={isInWishlist ? 'currentColor' : 'none'}
              />
            </motion.button>
            {product.stock > 0 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                className="p-2 bg-white text-black border border-gray-200"
              >
                <FiShoppingCart size={16} />
              </motion.button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-gray-600 transition-colors text-black uppercase">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <FiStar className="text-yellow-400 fill-yellow-400" size={14} />
            <span className="ml-1 text-xs text-gray-600">
              ({product.rating?.toFixed(1) || '0.0'})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-black">
              ${displayPrice?.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                ${product.price?.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default ProductCard;
