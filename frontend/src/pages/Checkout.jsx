import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../store/slices/cartSlice';
import { createOrder, createCheckoutSession } from '../store/slices/orderSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { loading, checkoutLoading } = useSelector((state) => state.order);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!items || items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Prepare order items
    const orderItems = items.map((item) => ({
      product: item.product._id,
      title: item.product.title,
      quantity: item.quantity,
      price: item.product.discountPrice || item.product.price,
      image: item.product.images?.[0]?.url,
    }));

    const subtotal = items.reduce((total, item) => {
      const price = item.product?.discountPrice || item.product?.price || 0;
      return total + price * item.quantity;
    }, 0);

    const shipping = subtotal > 500 ? 0 : 50;
    const tax = subtotal * 0.1;
    const totalAmount = subtotal + shipping + tax;

    try {
      // Create order
      const orderResult = await dispatch(
        createOrder({
          items: orderItems,
          shippingAddress,
          paymentMethod: 'stripe',
          totalAmount,
        })
      ).unwrap();

      // Create Stripe checkout session
      const sessionResult = await dispatch(
        createCheckoutSession(orderResult._id)
      ).unwrap();

      // Redirect to Stripe checkout
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: sessionResult.sessionId });
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  const subtotal =
    items?.reduce((total, item) => {
      const price = item.product?.discountPrice || item.product?.price || 0;
      return total + price * item.quantity;
    }, 0) || 0;

  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-black">
            Your Cart is Empty
          </h2>
          <button onClick={() => navigate('/shop')} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container-custom">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 text-black"
        >
          CHECKOUT
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-gray-200 p-6"
            >
              <h2 className="text-2xl font-bold mb-6 text-black">
                SHIPPING INFORMATION
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium mb-2 text-black">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingAddress.fullName}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2 text-black">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-2 text-black">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2 text-black">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingAddress.postalCode}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-2 text-black">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2 text-black">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={checkoutLoading}
                  className="w-full btn-primary mt-6"
                >
                  {checkoutLoading ? (
                    <LoadingSpinner size="small" />
                  ) : (
                    'PROCEED TO PAYMENT'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-200 p-6 sticky top-24"
            >
              <h2 className="text-2xl font-bold mb-6 text-black">
                ORDER SUMMARY
              </h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => {
                  const product = item.product;
                  const price = product.discountPrice || product.price;
                  return (
                    <div key={item._id} className="flex gap-3">
                      <img
                        src={product.images?.[0]?.url || '/placeholder.jpg'}
                        alt={product.title}
                        className="w-16 h-16 object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-2 text-black">
                          {product.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-bold text-black">
                          ${(price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold text-black">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-bold text-black">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-bold text-black">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-xl font-bold">
                  <span className="text-black">Total</span>
                  <span className="text-black">${total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
