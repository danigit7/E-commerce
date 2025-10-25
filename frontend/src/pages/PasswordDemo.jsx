import { useState } from 'react';
import { motion } from 'framer-motion';
import PasswordInput from '../components/PasswordInput';

function PasswordDemo() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="min-h-screen bg-ivory py-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold mb-4">
              Password Features Demo
            </h1>
            <p className="text-charcoal-600 text-lg">
              Experience our enhanced password security features
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            {/* Password with Strength Indicator */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Password with Strength Validation
              </h2>
              <p className="text-charcoal-600 mb-4">
                This password field includes real-time strength validation with
                visual indicators. Try typing different combinations to see the
                strength meter change.
              </p>
              <PasswordInput
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Try typing a password..."
                showStrength={true}
                minLength={8}
              />
            </div>

            {/* Regular Password Input */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Standard Password Input
              </h2>
              <p className="text-charcoal-600 mb-4">
                A regular password field with show/hide functionality but
                without strength validation.
              </p>
              <PasswordInput
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
            </div>

            {/* Features List */}
            <div className="bg-ivory rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Features Included:</h3>
              <ul className="space-y-2 text-charcoal-600">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Show/Hide password toggle with eye icon</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Real-time password strength validation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Visual strength meter with color coding</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Password requirements checklist</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Animated progress indicators</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Accessible with proper ARIA labels</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Customizable minimum length requirements</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Luxury-themed styling matching your brand</span>
                </li>
              </ul>
            </div>

            {/* Password Requirements */}
            <div className="bg-gold/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                Password Requirements:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span>At least 8 characters long</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span>One uppercase letter (A-Z)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span>One lowercase letter (a-z)</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span>One number (0-9)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span>One special character (!@#$%^&*)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Try Different Passwords */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Try These Examples:
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'password123',
                  'Password123',
                  'Password123!',
                  'MySecure123!',
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPassword(example)}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default PasswordDemo;
