import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiEyeOff, FiCheck, FiX } from 'react-icons/fi';

const PasswordInput = ({
  value,
  onChange,
  placeholder = 'Enter your password',
  className = '',
  name = 'password',
  id = 'password',
  required = false,
  showStrength = false,
  minLength = 8,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [strengthText, setStrengthText] = useState('');
  const [strengthColor, setStrengthColor] = useState('');
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const inputRef = useRef(null);

  // Password strength validation
  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= minLength,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };

    const score = Object.values(requirements).filter(Boolean).length;
    let strengthText = '';
    let strengthColor = '';

    if (score === 0) {
      strengthText = '';
      strengthColor = 'bg-gray-200';
    } else if (score <= 2) {
      strengthText = 'Weak';
      strengthColor = 'bg-red-500';
    } else if (score <= 3) {
      strengthText = 'Fair';
      strengthColor = 'bg-yellow-500';
    } else if (score <= 4) {
      strengthText = 'Good';
      strengthColor = 'bg-blue-500';
    } else {
      strengthText = 'Strong';
      strengthColor = 'bg-green-500';
    }

    setStrength(score);
    setStrengthText(strengthText);
    setStrengthColor(strengthColor);
    setRequirements(requirements);

    return requirements;
  };

  useEffect(() => {
    if (showStrength && value) {
      validatePassword(value);
    }
  }, [value, showStrength, minLength]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    // Focus back to input after toggle
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleInputChange = (e) => {
    onChange(e);
    if (showStrength) {
      validatePassword(e.target.value);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type={showPassword ? 'text' : 'password'}
          id={id}
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          required={required}
          className={`input-field pr-12 ${className}`}
          autoComplete="new-password"
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-500 hover:text-charcoal-700 transition-colors focus:outline-none focus:text-charcoal-700"
          tabIndex={-1}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      </div>

      {/* Password Strength Indicator */}
      <AnimatePresence>
        {showStrength && value && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 space-y-2"
          >
            {/* Strength Bar */}
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${strengthColor}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(strength / 5) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  strength <= 2
                    ? 'text-red-600'
                    : strength <= 3
                      ? 'text-yellow-600'
                      : strength <= 4
                        ? 'text-blue-600'
                        : 'text-green-600'
                }`}
              >
                {strengthText}
              </span>
            </div>

            {/* Password Requirements */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    requirements.length ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  {requirements.length ? (
                    <FiCheck size={12} className="text-white" />
                  ) : (
                    <FiX size={12} className="text-white" />
                  )}
                </div>
                <span
                  className={`text-sm ${
                    requirements.length ? 'text-green-600' : 'text-gray-600'
                  }`}
                >
                  At least {minLength} characters
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    requirements.uppercase ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  {requirements.uppercase ? (
                    <FiCheck size={12} className="text-white" />
                  ) : (
                    <FiX size={12} className="text-white" />
                  )}
                </div>
                <span
                  className={`text-sm ${
                    requirements.uppercase ? 'text-green-600' : 'text-gray-600'
                  }`}
                >
                  One uppercase letter
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    requirements.lowercase ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  {requirements.lowercase ? (
                    <FiCheck size={12} className="text-white" />
                  ) : (
                    <FiX size={12} className="text-white" />
                  )}
                </div>
                <span
                  className={`text-sm ${
                    requirements.lowercase ? 'text-green-600' : 'text-gray-600'
                  }`}
                >
                  One lowercase letter
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    requirements.number ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  {requirements.number ? (
                    <FiCheck size={12} className="text-white" />
                  ) : (
                    <FiX size={12} className="text-white" />
                  )}
                </div>
                <span
                  className={`text-sm ${
                    requirements.number ? 'text-green-600' : 'text-gray-600'
                  }`}
                >
                  One number
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    requirements.special ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  {requirements.special ? (
                    <FiCheck size={12} className="text-white" />
                  ) : (
                    <FiX size={12} className="text-white" />
                  )}
                </div>
                <span
                  className={`text-sm ${
                    requirements.special ? 'text-green-600' : 'text-gray-600'
                  }`}
                >
                  One special character
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PasswordInput;
