import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { googleLogin } from '../store/slices/authSlice';
import { FcGoogle } from 'react-icons/fc';

function GoogleAuthButton({ text = 'Continue with Google', className = '' }) {
  const dispatch = useDispatch();

  const handleGoogleAuth = () => {
    dispatch(googleLogin());
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleGoogleAuth}
      className={`w-full flex items-center justify-center space-x-3 px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 ${className}`}
    >
      <FcGoogle className="w-5 h-5" />
      <span>{text}</span>
    </motion.button>
  );
}

export default GoogleAuthButton;
