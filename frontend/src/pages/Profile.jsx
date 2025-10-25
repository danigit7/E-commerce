import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../store/slices/orderSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiUser, FiMail, FiPackage, FiCalendar } from 'react-icons/fi';

function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders, loading } = useSelector((state) => state.order);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-ivory py-12">
      <div className="container-custom">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-serif font-bold mb-8"
        >
          My Account
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-ivory text-3xl font-bold mb-4">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-charcoal-600">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-primary text-ivory'
                      : 'hover:bg-ivory'
                  }`}
                >
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-primary text-ivory'
                      : 'hover:bg-ivory'
                  }`}
                >
                  Order History
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {activeTab === 'profile' ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="flex items-center space-x-2 text-charcoal-600 mb-2">
                        <FiUser />
                        <span className="font-semibold">Full Name</span>
                      </label>
                      <input
                        type="text"
                        value={user?.name}
                        disabled
                        className="input-field bg-ivory cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-charcoal-600 mb-2">
                        <FiMail />
                        <span className="font-semibold">Email Address</span>
                      </label>
                      <input
                        type="email"
                        value={user?.email}
                        disabled
                        className="input-field bg-ivory cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-charcoal-600 mb-2">
                        <span className="font-semibold">Account Type</span>
                      </label>
                      <div className="inline-block px-4 py-2 bg-gold text-charcoal rounded-lg font-semibold capitalize">
                        {user?.role}
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-charcoal-600 mb-2">
                        <FiCalendar />
                        <span className="font-semibold">Member Since</span>
                      </label>
                      <p className="text-charcoal-700">
                        {new Date(user?.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="text-2xl font-semibold mb-6">Order History</h2>

                  {loading ? (
                    <div className="py-12">
                      <LoadingSpinner size="large" />
                    </div>
                  ) : orders && orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order._id}
                          className="border border-charcoal-200 rounded-lg p-6"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                            <div>
                              <p className="font-semibold">
                                Order #{order._id.slice(-8)}
                              </p>
                              <p className="text-sm text-charcoal-600">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="mt-2 sm:mt-0 flex items-center space-x-2">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                                  order.orderStatus
                                )}`}
                              >
                                {order.orderStatus}
                              </span>
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                  order.paymentStatus === 'paid'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {order.paymentStatus}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            {order.items?.map((item) => (
                              <div
                                key={item._id}
                                className="flex items-center space-x-4"
                              >
                                <img
                                  src={item.image || '/placeholder.jpg'}
                                  alt={item.title}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <p className="font-semibold">{item.title}</p>
                                  <p className="text-sm text-charcoal-600">
                                    Qty: {item.quantity} × ${item.price}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 pt-4 border-t border-charcoal-200 flex justify-between items-center">
                            <span className="font-semibold">Total Amount:</span>
                            <span className="text-xl font-bold text-primary">
                              ${order.totalAmount?.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FiPackage size={60} className="text-charcoal-400 mx-auto mb-4" />
                      <p className="text-charcoal-600 mb-4">
                        You haven't placed any orders yet.
                      </p>
                      <a href="/shop" className="btn-primary">
                        Start Shopping
                      </a>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

