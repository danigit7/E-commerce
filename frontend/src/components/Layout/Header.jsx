import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiMenu,
  FiX,
  FiSearch,
  FiLogOut,
  FiUserPlus,
  FiLogIn,
  FiSettings,
  FiShoppingBag,
} from 'react-icons/fi';
import { logout } from '../../store/slices/authSlice';
import { fetchCart } from '../../store/slices/cartSlice';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userMenuRef = useRef(null);
  const cartMenuRef = useRef(null);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [isAuthenticated, dispatch]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (cartMenuRef.current && !cartMenuRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const cartItemCount =
    cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Top Bar */}
      <div className="bg-black text-white py-2">
        <div className="container-custom flex items-center justify-between text-xs">
          <span>FREE SHIPPING ON ORDERS PKR 1200+</span>
          <div className="flex items-center space-x-4">
            <span>RUSSET</span>
            <button
              onClick={() => navigate('/shop')}
              className="hover:text-gray-300 transition-colors"
            >
              <FiSearch size={14} />
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="hover:text-gray-300 transition-colors relative"
            >
              <FiShoppingCart size={14} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="hover:text-gray-300 transition-colors"
            >
              <FiUser size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl font-sans font-bold text-black text-tight"
            >
              RUSSET
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link
                to="/"
                className="text-black hover:text-gray-600 transition-colors text-xs font-sans font-medium uppercase text-looser"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-black hover:text-gray-600 transition-colors text-xs font-sans font-medium uppercase text-looser"
              >
                Best Sellers
              </Link>
              <Link
                to="/shop"
                className="text-black hover:text-gray-600 transition-colors text-xs font-sans font-medium uppercase text-looser"
              >
                Shop Clothing
              </Link>
              <Link
                to="/shop"
                className="text-black hover:text-gray-600 transition-colors text-xs font-sans font-medium uppercase text-looser"
              >
                Freshly Restocked
              </Link>
              <Link
                to="/shop"
                className="text-black hover:text-gray-600 transition-colors text-xs font-sans font-medium uppercase text-looser"
              >
                End of Season Sale
              </Link>
              <Link
                to="/shop"
                className="text-black hover:text-gray-600 transition-colors text-xs font-sans font-medium uppercase text-looser"
              >
                Shop By Category
              </Link>
              <Link
                to="/shop"
                className="text-black hover:text-gray-600 transition-colors text-xs font-sans font-medium uppercase text-looser"
              >
                Russet ⓧ
              </Link>
              <Link
                to="/shop"
                className="text-black hover:text-gray-600 transition-colors text-xs font-sans font-medium uppercase text-looser"
              >
                80's
              </Link>
              <Link
                to="/shop"
                className="text-black hover:text-gray-600 transition-colors text-xs font-sans font-medium uppercase text-looser"
              >
                Extras
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button
                onClick={() => navigate('/shop')}
                className="text-black hover:text-gray-600 transition-colors"
              >
                <FiSearch size={20} />
              </button>

              {/* Cart with Dropdown */}
              <div className="relative" ref={cartMenuRef}>
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="text-black hover:text-gray-600 transition-colors relative"
                >
                  <FiShoppingCart size={20} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>

                {/* Cart Dropdown */}
                <AnimatePresence>
                  {isCartOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-900">
                            Shopping Cart
                          </h3>
                          <button
                            onClick={() => setIsCartOpen(false)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <FiX size={16} />
                          </button>
                        </div>

                        {cartItems && cartItems.length > 0 ? (
                          <div className="space-y-3">
                            {cartItems.slice(0, 3).map((item) => (
                              <div
                                key={item._id}
                                className="flex items-center space-x-3"
                              >
                                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                                  <FiShoppingBag
                                    size={20}
                                    className="text-gray-400"
                                  />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {item.product?.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Qty: {item.quantity} × PKR{' '}
                                    {item.product?.price}
                                  </p>
                                </div>
                              </div>
                            ))}
                            {cartItems.length > 3 && (
                              <p className="text-xs text-gray-500 text-center">
                                +{cartItems.length - 3} more items
                              </p>
                            )}
                            <div className="border-t pt-3">
                              <button
                                onClick={() => {
                                  navigate('/cart');
                                  setIsCartOpen(false);
                                }}
                                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
                              >
                                View Cart ({cartItemCount} items)
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <FiShoppingCart
                              size={48}
                              className="text-gray-300 mx-auto mb-3"
                            />
                            <p className="text-gray-500 text-sm">
                              Your cart is empty
                            </p>
                            <button
                              onClick={() => {
                                navigate('/shop');
                                setIsCartOpen(false);
                              }}
                              className="mt-3 text-black hover:text-gray-600 text-sm font-medium"
                            >
                              Start Shopping
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Profile with Dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="text-black hover:text-gray-600 transition-colors"
                >
                  <FiUser size={20} />
                </button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                    >
                      <div className="py-2">
                        {isAuthenticated ? (
                          <>
                            <div className="px-4 py-2 border-b border-gray-100">
                              <p className="text-sm font-medium text-gray-900">
                                Welcome, {user?.name || 'User'}
                              </p>
                              <p className="text-xs text-gray-500">
                                {user?.email}
                              </p>
                            </div>
                            <Link
                              to="/profile"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <FiSettings size={16} className="mr-3" />
                              Profile Settings
                            </Link>
                            <Link
                              to="/wishlist"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <FiHeart size={16} className="mr-3" />
                              Wishlist
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <FiLogOut size={16} className="mr-3" />
                              Logout
                            </button>
                          </>
                        ) : (
                          <>
                            <Link
                              to="/login"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <FiLogIn size={16} className="mr-3" />
                              Login
                            </Link>
                            <Link
                              to="/register"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <FiUserPlus size={16} className="mr-3" />
                              Sign Up
                            </Link>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-black"
              >
                {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="container-custom py-6">
              {/* Mobile User Actions */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      navigate('/cart');
                      setIsMenuOpen(false);
                    }}
                    className="text-black hover:text-gray-600 transition-colors relative"
                  >
                    <FiShoppingCart size={20} />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      navigate('/wishlist');
                      setIsMenuOpen(false);
                    }}
                    className="text-black hover:text-gray-600 transition-colors"
                  >
                    <FiHeart size={20} />
                  </button>
                </div>

                {isAuthenticated ? (
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      Welcome, {user?.name || 'User'}
                    </p>
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setIsMenuOpen(false);
                      }}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      View Profile
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        navigate('/login');
                        setIsMenuOpen(false);
                      }}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        navigate('/register');
                        setIsMenuOpen(false);
                      }}
                      className="text-sm bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-3">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-black hover:text-gray-600 transition-colors text-xs font-sans font-medium uppercase text-looser"
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-black hover:text-gray-600 transition-colors text-xs font-sans font-medium uppercase text-looser"
                >
                  Best Sellers
                </Link>
                <Link
                  to="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-black hover:text-gray-600 transition-colors text-xs font-sans font-medium uppercase text-looser"
                >
                  Shop Clothing
                </Link>
                <Link
                  to="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-black hover:text-gray-600 transition-colors text-xs font-sans font-medium uppercase text-looser"
                >
                  Freshly Restocked
                </Link>
                <Link
                  to="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-black hover:text-gray-600 transition-colors text-xs font-sans font-medium uppercase text-looser"
                >
                  End of Season Sale
                </Link>
                <Link
                  to="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-black hover:text-gray-600 transition-colors text-xs font-sans font-medium uppercase text-looser"
                >
                  Shop By Category
                </Link>
                <Link
                  to="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-black hover:text-gray-600 transition-colors text-xs font-sans font-medium uppercase text-looser"
                >
                  Russet ⓧ
                </Link>
                <Link
                  to="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-black hover:text-gray-600 transition-colors text-xs font-sans font-medium uppercase text-looser"
                >
                  80's
                </Link>
                <Link
                  to="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-black hover:text-gray-600 transition-colors text-xs font-sans font-medium uppercase text-looser"
                >
                  Extras
                </Link>
              </nav>

              {/* Mobile User Menu */}
              {isAuthenticated && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full text-left text-sm text-gray-700 hover:text-gray-900 py-2"
                    >
                      <FiSettings size={16} className="mr-3" />
                      Profile Settings
                    </button>
                    <button
                      onClick={() => {
                        navigate('/wishlist');
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full text-left text-sm text-gray-700 hover:text-gray-900 py-2"
                    >
                      <FiHeart size={16} className="mr-3" />
                      Wishlist
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full text-left text-sm text-gray-700 hover:text-gray-900 py-2"
                    >
                      <FiLogOut size={16} className="mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
