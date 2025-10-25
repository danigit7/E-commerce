import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../store/slices/cartSlice';
import CartSkeleton from '../components/CartSkeleton';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartItem({ productId, quantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const subtotal = items?.reduce((total, item) => {
    const price = item.product?.discountPrice || item.product?.price || 0;
    return total + price * item.quantity;
  }, 0) || 0;

  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (loading) {
    return <CartSkeleton />;
  }

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <FiShoppingBag size={80} className="text-charcoal-400 mx-auto mb-4" />
          <h2 className="text-3xl font-serif font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-charcoal-600 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Continue Shopping
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
          Shopping Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  Cart Items ({items.length})
                </h2>
                <button
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Clear Cart
                </button>
              </div>

              <AnimatePresence>
                {items.map((item) => {
                  const product = item.product;
                  if (!product) return null;

                  const price = product.discountPrice || product.price;

                  return (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex flex-col sm:flex-row gap-4 border-b border-charcoal-200 py-6 last:border-0"
                    >
                      {/* Image */}
                      <Link
                        to={`/product/${product.slug || product._id}`}
                        className="w-full sm:w-32 h-32 flex-shrink-0"
                      >
                        <img
                          src={product.images?.[0]?.url || '/placeholder.jpg'}
                          alt={product.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1">
                        <Link
                          to={`/product/${product.slug || product._id}`}
                          className="text-lg font-semibold hover:text-primary transition-colors"
                        >
                          {product.title}
                        </Link>
                        <p className="text-sm text-charcoal-600 mt-1">
                          {product.category}
                        </p>
                        <p className="text-xl font-bold text-primary mt-2">
                          ${price?.toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity & Remove */}
                      <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-4">
                        <div className="flex items-center border border-charcoal-300 rounded-lg">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(product._id, item.quantity - 1)
                            }
                            className="px-3 py-1 hover:bg-ivory transition-colors"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 border-x border-charcoal-300">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(product._id, item.quantity + 1)
                            }
                            className="px-3 py-1 hover:bg-ivory transition-colors"
                            disabled={item.quantity >= product.stock}
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(product._id)}
                          className="text-red-600 hover:text-red-700 p-2"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
            >
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-charcoal-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-sm text-gold">
                    Free shipping on orders over $500!
                  </p>
                )}
                <div className="flex justify-between">
                  <span className="text-charcoal-600">Tax (10%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-charcoal-200 pt-4 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/checkout')}
                className="w-full btn-primary mb-4"
              >
                Proceed to Checkout
              </motion.button>

              <Link to="/shop">
                <button className="w-full btn-outline">
                  Continue Shopping
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

