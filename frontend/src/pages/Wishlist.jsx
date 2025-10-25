import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';

function Wishlist() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <FiHeart size={80} className="text-charcoal-400 mx-auto mb-4" />
          <h2 className="text-3xl font-serif font-bold mb-4">Your Wishlist is Empty</h2>
          <p className="text-charcoal-600 mb-8">
            Save your favorite items here for later.
          </p>
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Explore Products
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory py-12">
      <div className="container-custom">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-serif font-bold mb-8"
        >
          My Wishlist
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card overflow-hidden"
            >
              <Link to={`/product/${product.slug || product._id}`}>
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.images?.[0]?.url || '/placeholder.jpg'}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  {product.discountPrice && (
                    <div className="absolute top-4 left-4 bg-gold text-charcoal px-3 py-1 rounded-full text-sm font-semibold">
                      {Math.round(
                        ((product.price - product.discountPrice) / product.price) * 100
                      )}
                      % OFF
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-4">
                <Link
                  to={`/product/${product.slug || product._id}`}
                  className="text-lg font-semibold hover:text-primary transition-colors line-clamp-2"
                >
                  {product.title}
                </Link>
                <p className="text-sm text-charcoal-600 mt-1">{product.category}</p>

                <div className="mt-3 flex items-center space-x-2">
                  <span className="text-xl font-bold text-primary">
                    ${(product.discountPrice || product.price)?.toLocaleString()}
                  </span>
                  {product.discountPrice && (
                    <span className="text-sm text-charcoal-500 line-through">
                      ${product.price?.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(product._id)}
                    className="flex-1 btn-primary flex items-center justify-center space-x-2 py-2 text-sm"
                    disabled={product.stock === 0}
                  >
                    <FiShoppingCart size={16} />
                    <span>Add to Cart</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRemove(product._id)}
                    className="p-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;

