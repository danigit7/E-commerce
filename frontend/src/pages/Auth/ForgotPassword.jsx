import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../store/slices/authSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

function ForgotPassword() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(forgotPassword(email));
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-luxury flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">Forgot Password?</h1>
          <p className="text-charcoal-600">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full btn-primary"
            >
              {loading ? <LoadingSpinner size="small" /> : 'Send Reset Link'}
            </motion.button>
          </form>
        ) : (
          <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg text-center">
            <p className="font-semibold mb-2">Email Sent!</p>
            <p>Check your inbox for password reset instructions.</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary-700"
          >
            <FiArrowLeft />
            <span>Back to Login</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;

