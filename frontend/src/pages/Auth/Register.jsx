import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/slices/authSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import PasswordInput from '../../components/PasswordInput';
import GoogleAuthButton from '../../components/GoogleAuthButton';
import { FiUser, FiMail } from 'react-icons/fi';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

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

    const { confirmPassword, ...registerData } = formData;
    dispatch(register(registerData));
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white border border-gray-200 p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-black">CREATE ACCOUNT</h1>
          <p className="text-gray-600">Join our exclusive community</p>
        </div>

        {/* Google OAuth Button */}
        <GoogleAuthButton text="Continue with Google" />

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium mb-2 text-black">
              Full Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2 text-black">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2 text-black">
              Password
            </label>
            <PasswordInput
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              showStrength={true}
              minLength={8}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-black">
              Confirm Password
            </label>
            <PasswordInput
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3">
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
            {loading ? <LoadingSpinner size="small" /> : 'CREATE ACCOUNT'}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-black hover:text-gray-600 font-medium"
            >
              SIGN IN
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
