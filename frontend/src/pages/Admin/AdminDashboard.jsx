import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiAlertCircle,
  FiTrendingUp,
} from 'react-icons/fi';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await api.get('/admin/stats');
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Sales',
      value: `$${stats?.totalSales?.toLocaleString() || 0}`,
      icon: FiDollarSign,
      color: 'bg-green-100 text-green-600',
      change: '+12.5%',
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: FiShoppingBag,
      color: 'bg-blue-100 text-blue-600',
      change: '+8.2%',
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: FiUsers,
      color: 'bg-purple-100 text-purple-600',
      change: '+15.3%',
    },
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: FiPackage,
      color: 'bg-gold-100 text-gold-600',
      change: '+5.0%',
    },
  ];

  return (
    <div className="min-h-screen bg-ivory py-8">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold">Admin Dashboard</h1>
            <p className="text-charcoal-600 mt-2">Welcome back! Here's what's happening.</p>
          </div>
          <Link to="/" className="btn-outline">
            View Store
          </Link>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link to="/admin/products" className="btn-primary text-center">
            Manage Products
          </Link>
          <Link to="/admin/orders" className="btn-primary text-center">
            Manage Orders
          </Link>
          <Link to="/admin/users" className="btn-primary text-center">
            Manage Users
          </Link>
          <button className="btn-outline">
            Settings
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <FiTrendingUp size={16} />
                  <span className="ml-1">{stat.change}</span>
                </div>
              </div>
              <h3 className="text-charcoal-600 text-sm mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Orders */}
          <div className="card p-6">
            <h2 className="text-2xl font-semibold mb-6">Recent Orders</h2>
            <div className="space-y-4">
              {stats?.recentOrders?.slice(0, 5).map((order) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between p-4 bg-ivory rounded-lg"
                >
                  <div>
                    <p className="font-semibold">#{order._id.slice(-8)}</p>
                    <p className="text-sm text-charcoal-600">
                      {order.user?.name || 'N/A'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">
                      ${order.totalAmount?.toFixed(2)}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.orderStatus === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.orderStatus === 'shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Sellers */}
          <div className="card p-6">
            <h2 className="text-2xl font-semibold mb-6">Best Sellers</h2>
            <div className="space-y-4">
              {stats?.bestSellers?.slice(0, 5).map((item, index) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 bg-ivory rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold text-primary">#{index + 1}</div>
                    <div>
                      <p className="font-semibold line-clamp-1">
                        {item.product?.title}
                      </p>
                      <p className="text-sm text-charcoal-600">
                        {item.totalQuantity} sold
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">
                      ${item.totalRevenue?.toFixed(0)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        {stats?.lowStockProducts && stats.lowStockProducts.length > 0 && (
          <div className="card p-6 border-l-4 border-red-600">
            <div className="flex items-center mb-4">
              <FiAlertCircle className="text-red-600 mr-2" size={24} />
              <h2 className="text-2xl font-semibold">Low Stock Alert</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.lowStockProducts.map((product) => (
                <div key={product._id} className="p-4 bg-red-50 rounded-lg">
                  <p className="font-semibold">{product.title}</p>
                  <p className="text-sm text-red-600">
                    Only {product.stock} left in stock
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

