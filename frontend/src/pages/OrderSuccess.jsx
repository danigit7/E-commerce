import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../store/slices/orderSlice';
import { clearCart } from '../store/slices/cartSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiCheckCircle, FiPackage } from 'react-icons/fi';

function OrderSuccess() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { currentOrder: order, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrderById(orderId));
    dispatch(clearCart());
  }, [dispatch, orderId]);

  if (loading || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory py-12">
      <div className="container-custom max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mb-6"
          >
            <FiCheckCircle size={80} className="text-green-600 mx-auto" />
          </motion.div>

          <h1 className="text-4xl font-serif font-bold mb-4">Order Confirmed!</h1>
          <p className="text-charcoal-600 mb-8">
            Thank you for your purchase. Your order has been successfully placed.
          </p>

          <div className="bg-ivory rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-charcoal-600">Order ID:</span>
                <span className="font-semibold">{order._id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-600">Order Date:</span>
                <span className="font-semibold">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-600">Total Amount:</span>
                <span className="font-semibold text-primary">
                  ${order.totalAmount?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-600">Payment Status:</span>
                <span
                  className={`font-semibold ${
                    order.paymentStatus === 'paid'
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-ivory rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiPackage className="mr-2" />
              Items Ordered
            </h2>
            <div className="space-y-4">
              {order.items?.map((item) => (
                <div key={item._id} className="flex gap-4">
                  <img
                    src={item.image || '/placeholder.jpg'}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-charcoal-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm font-semibold text-primary">
                      ${item.price?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-ivory rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <div className="text-charcoal-700">
              <p>{order.shippingAddress?.fullName}</p>
              <p>{order.shippingAddress?.address}</p>
              <p>
                {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
              </p>
              <p>{order.shippingAddress?.country}</p>
              <p>{order.shippingAddress?.phone}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/profile">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                View Order History
              </motion.button>
            </Link>
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline"
              >
                Continue Shopping
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default OrderSuccess;

