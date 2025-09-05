// React core imports
import React, { useState } from 'react';

// Icon imports from Lucide React
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

// Shared components
import { Logo } from './Logo';

/**
 * Props interface for RegisterPage component
 */
interface RegisterPageProps {
  /** Callback to navigate back to the home/landing page */
  onBackToHome: () => void;
  /** Callback fired when registration is completed successfully */
  onRegistrationSuccess: () => void;
}

/**
 * RegisterPage - User registration form with validation
 * 
 * Handles new user signup with form validation, password visibility toggle,
 * and error handling. Part of the authentication flow.
 * 
 * Features:
 * - Form validation with real-time error display
 * - Password visibility toggle
 * - Email format validation
 * - Password confirmation matching
 * - Responsive design
 * - Loading states (TODO)
 * 
 * TODO:
 * - [ ] Integrate with backend API for user registration
 * - [ ] Add loading spinner during registration
 * - [ ] Implement proper error handling from server
 * - [ ] Add password strength indicator
 * - [ ] Email verification flow
 * - [ ] Social media login options (Google, Facebook)
 * - [ ] Terms of service and privacy policy checkboxes
 * - [ ] Captcha integration for bot protection
 * 
 * @component
 * @param props - Component props
 */
export const RegisterPage: React.FC<RegisterPageProps> = ({ onBackToHome, onRegistrationSuccess }) => {
  // FORM STATE MANAGEMENT
  
  /** Form data state containing all user input fields */
  const [formData, setFormData] = useState({
    fullName: '',      // User's full name
    email: '',         // Email address (used for login)
    password: '',      // Primary password
    confirmPassword: '' // Password confirmation for validation
  });
  
  /** Password visibility toggle states for better UX */
  const [showPassword, setShowPassword] = useState(false);         // Primary password field
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Confirm password field
  
  /** Form validation errors - maps field names to error messages */
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * handleInputChange - Updates form data and clears field errors
   * 
   * Handles all form input changes in a single function using the input's
   * name attribute to determine which field to update. Also provides
   * real-time error clearing for better user experience.
   * 
   * @param e - Input change event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Update the specific field in formData
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear any existing error for this field when user starts typing
    // This provides immediate feedback that they're fixing the issue
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * validateForm - Validates all form fields and returns validation status
   * 
   * Performs comprehensive client-side validation including:
   * - Required field checking
   * - Email format validation
   * - Password strength requirements
   * - Password confirmation matching
   * 
   * @returns boolean - true if all fields are valid, false otherwise
   * 
   * TODO:
   * - [ ] Add more sophisticated password validation (special chars, numbers)
   * - [ ] Check email availability in real-time
   * - [ ] Add name format validation
   */
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Full name validation - required field with whitespace trimming
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    // Email validation - required field with format checking
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      // Basic email regex - checks for @ symbol and domain structure
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation - required field with minimum length
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      // Minimum security requirement
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Password confirmation validation - required field with matching check
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      // Ensures user typed password correctly both times
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Update error state and return validation result
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * handleSubmit - Processes form submission with validation
   * 
   * Handles the registration form submission by validating input data
   * and calling the success callback. Currently simulates backend call
   * with setTimeout for demo purposes.
   * 
   * @param e - Form submission event
   * 
   * TODO:
   * - [ ] Replace setTimeout with actual API call
   * - [ ] Add loading state during registration
   * - [ ] Handle registration errors from backend
   * - [ ] Send welcome email after successful registration
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    
    if (validateForm()) {
      // TODO: Replace console.log with actual API call
      console.log('Registration data:', formData);
      
      // Simulate successful registration with delay
      // In production, this would be an API call to create user account
      setTimeout(() => {
        onRegistrationSuccess();
      }, 1000);
    }
    // If validation fails, errors are already displayed to user
  };

  /**
   * handleGoogleSignUp - Handles Google OAuth registration
   * 
   * Initiates Google OAuth flow for quick user registration.
   * Currently simulated for demo purposes.
   * 
   * TODO:
   * - [ ] Integrate Google OAuth SDK
   * - [ ] Handle OAuth callback and token exchange
   * - [ ] Create user account from Google profile data
   * - [ ] Handle OAuth errors and cancellation
   */
  const handleGoogleSignUp = () => {
    // TODO: Replace with actual Google OAuth integration
    console.log('Google sign up clicked');
    
    // Simulate successful Google registration
    setTimeout(() => {
      onRegistrationSuccess();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={onBackToHome}
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </button>
            <Logo />
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Registration Form */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create Your Account
            </h2>
            <p className="text-gray-600">
              Join thousands of students preparing for board exams
            </p>
          </div>

          {/* Google Sign Up Button */}
          <button
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-orange-50 via-white to-blue-50 text-gray-500">
                Or register with email
              </span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border ${
                    errors.fullName ? 'border-red-300' : 'border-gray-300'
                  } rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-10 py-3 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-10 py-3 border ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  } rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button className="text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200">
                Log in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};