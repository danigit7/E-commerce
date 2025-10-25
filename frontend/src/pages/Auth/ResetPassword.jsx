import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../store/slices/authSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import PasswordInput from '../../components/PasswordInput';

function ResetPassword() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Enhanced password validation
    const passwordRequirements = {
      length: formData.password.length >= 8,
      uppercase: /[A-Z]/.test(formData.password),
      lowercase: /[a-z]/.test(formData.password),
      number: /\d/.test(formData.password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password),
    };

    const validRequirements =
      Object.values(passwordRequirements).filter(Boolean).length;

    if (validRequirements < 5) {
      setError(
        'Password must meet all security requirements (8+ chars, uppercase, lowercase, number, special character)'
      );
      return;
    }

    try {
      await dispatch(
        resetPassword({ token, password: formData.password })
      ).unwrap();
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-luxury flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">Reset Password</h1>
          <p className="text-charcoal-600">Enter your new password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-2">New Password</label>
            <PasswordInput
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your new password"
              showStrength={true}
              minLength={8}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Confirm New Password
            </label>
            <PasswordInput
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full btn-primary"
          >
            {loading ? <LoadingSpinner size="small" /> : 'Reset Password'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default ResetPassword;
