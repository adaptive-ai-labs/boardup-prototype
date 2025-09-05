'use client'
// React core imports
import React, { useState } from 'react';

// Icon imports from Lucide React
import { ArrowLeft, ChevronDown, GraduationCap } from 'lucide-react';

// Shared components
import { Logo } from './Logo';

/**
 * Props interface for AccountSetupPage component
 */
interface AccountSetupPageProps {
  /** Callback fired when user completes the setup process */
  onComplete: () => void;
  /** Callback to navigate back to the home page */
  onBackToHome: () => void;
}

/**
 * AccountSetupPage - User profile and preferences configuration
 * 
 * This component handles the second step of user onboarding after registration.
 * Collects user preferences for exam preparation including target exam,
 * study methods, timeline, and learning preferences.
 * 
 * Features:
 * - Multi-step form with dropdown selections
 * - Conditional fields based on user selections
 * - Form validation with error handling
 * - Responsive design with mobile optimization
 * - Progress indication (implicit through form completion)
 * 
 * Data Collected:
 * - Target board exam type
 * - Current preparation method
 * - Study timeline and duration
 * - Preferred study hours per day
 * - Learning mode preferences
 * 
 * TODO:
 * - [ ] Save preferences to backend API
 * - [ ] Add progress indicator/steps visualization
 * - [ ] Implement form persistence (localStorage)
 * - [ ] Add skip option for immediate access
 * - [ ] Integrate with recommendation engine
 * - [ ] Add study plan generation based on preferences
 * - [ ] Implement analytics tracking for user preferences
 * 
 * @component
 * @param props - Component props
 */
export const AccountSetupPage: React.FC<AccountSetupPageProps> = ({ onComplete, onBackToHome }) => {
  // FORM STATE MANAGEMENT
  
  /** User preferences form data - stores all setup configuration */
  const [formData, setFormData] = useState({
    boardExam: '',          // Target licensure exam (e.g., "Architectural Licensure Exam")
    preparationMethod: '',   // Current study approach (e.g., "Self-Study")
    preparationDuration: '', // How long they've been preparing
    targetMonth: '',        // Target exam month
    targetYear: '',         // Target exam year
    studyHours: '',         // Daily study hours commitment
    studyMode: '',          // Preferred learning style
    otherPreparation: '',   // Custom preparation method if "Other" selected
    otherDuration: ''       // Custom duration if not in predefined options
  });

  /** Form validation errors - tracks field-specific error messages */
  const [errors, setErrors] = useState<Record<string, string>>({});

  // STATIC DATA ARRAYS - Configuration options for dropdowns
  
  /** Available board/licensure examinations supported by the platform */
  const boardExams = [
    'Architectural Licensure Exam',      // Primary focus of this application
    'Civil Engineering Licensure Exam',
    'Mechanical Engineering Licensure Exam',
    'Electrical Engineering Licensure Exam',
    'Certified Public Accountant Exam',
    'Nursing Licensure Exam',
    'Licensure Exam for Teachers',
    'Criminology Licensure Exam',
    'Chemical Engineering Licensure Exam'
    // TODO: Load from backend API for dynamic exam types
    // TODO: Add more specialized exams based on user demand
  ];

  /** Different preparation approaches users might be taking */
  const preparationMethods = [
    'Enrolled in a Review Center',  // Traditional classroom approach
    'Self-Study',                  // Independent learning
    'Study Group',                 // Collaborative learning
    'Practicing Past Exams',       // Exam-focused approach
    'Other (please specify)'       // Custom method requiring text input
    // TODO: Add online course/bootcamp options
    // TODO: Add hybrid learning approaches
  ];

  /** Time ranges for how long user has been preparing */
  const preparationDurations = [
    "I'm just starting",     // Complete beginner
    'Less than 1 month',     // Very early stage
    '1–3 months',           // Early preparation
    '3–6 months',           // Intermediate preparation
    '6–12 months',          // Advanced preparation
    'More than a year (please specify)'
  ];

  const studyHours = [
    'Less than 5 hours',
    '5–10 hours',
    '10–20 hours',
    '20+ hours'
  ];

  const studyModes = [
    'Timed Quizzes (exam simulation)',
    'Flashcards & Recall Practice',
    'Full-Length Mock Exams',
    'Mixed Learning'
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user makes a selection
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.boardExam) {
      newErrors.boardExam = 'Please select a board exam';
    }

    if (!formData.preparationMethod) {
      newErrors.preparationMethod = 'Please select your preparation method';
    } else if (formData.preparationMethod === 'Other (please specify)' && !formData.otherPreparation) {
      newErrors.otherPreparation = 'Please specify your preparation method';
    }

    if (!formData.preparationDuration) {
      newErrors.preparationDuration = 'Please select how long you have been preparing';
    } else if (formData.preparationDuration === 'More than a year (please specify)' && !formData.otherDuration) {
      newErrors.otherDuration = 'Please specify the duration';
    }

    if (!formData.targetMonth) {
      newErrors.targetMonth = 'Please select target month';
    }

    if (!formData.targetYear) {
      newErrors.targetYear = 'Please select target year';
    }

    if (!formData.studyHours) {
      newErrors.studyHours = 'Please select your weekly study hours';
    }

    if (!formData.studyMode) {
      newErrors.studyMode = 'Please select your preferred study mode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Account setup data:', formData);
      alert('Account setup completed! Welcome to BoardUp!');
      onComplete();
    }
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
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* Setup Form */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-orange-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Let's Personalize Your Study Plan
            </h1>
            <p className="text-xl text-gray-600">
              Help us create the perfect AI-powered study experience tailored just for you
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Question 1: Board Exam */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="text-orange-600 font-bold text-sm">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Which Board Exam are you preparing for?</h3>
              </div>
              <div className="relative">
                <select
                  value={formData.boardExam}
                  onChange={(e) => handleInputChange('boardExam', e.target.value)}
                  className={`w-full p-4 border ${
                    errors.boardExam ? 'border-red-300' : 'border-gray-300'
                  } rounded-xl appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200`}
                >
                  <option value="">Select your board exam</option>
                  {boardExams.map((exam) => (
                    <option key={exam} value={exam}>{exam}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
              {errors.boardExam && (
                <p className="mt-2 text-sm text-red-600">{errors.boardExam}</p>
              )}
            </div>

            {/* Question 2: Preparation Method */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">How are you preparing for your board exam?</h3>
              </div>
              <div className="relative mb-4">
                <select
                  value={formData.preparationMethod}
                  onChange={(e) => handleInputChange('preparationMethod', e.target.value)}
                  className={`w-full p-4 border ${
                    errors.preparationMethod ? 'border-red-300' : 'border-gray-300'
                  } rounded-xl appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                >
                  <option value="">Select your preparation method</option>
                  {preparationMethods.map((method) => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
              {formData.preparationMethod === 'Other (please specify)' && (
                <input
                  type="text"
                  value={formData.otherPreparation}
                  onChange={(e) => handleInputChange('otherPreparation', e.target.value)}
                  placeholder="Please specify your preparation method"
                  className={`w-full p-4 border ${
                    errors.otherPreparation ? 'border-red-300' : 'border-gray-300'
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                />
              )}
              {(errors.preparationMethod || errors.otherPreparation) && (
                <p className="mt-2 text-sm text-red-600">{errors.preparationMethod || errors.otherPreparation}</p>
              )}
            </div>

            {/* Question 3: Preparation Duration */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="text-red-600 font-bold text-sm">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">How long have you been preparing?</h3>
              </div>
              <div className="relative mb-4">
                <select
                  value={formData.preparationDuration}
                  onChange={(e) => handleInputChange('preparationDuration', e.target.value)}
                  className={`w-full p-4 border ${
                    errors.preparationDuration ? 'border-red-300' : 'border-gray-300'
                  } rounded-xl appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200`}
                >
                  <option value="">Select preparation duration</option>
                  {preparationDurations.map((duration) => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
              {formData.preparationDuration === 'More than a year (please specify)' && (
                <input
                  type="text"
                  value={formData.otherDuration}
                  onChange={(e) => handleInputChange('otherDuration', e.target.value)}
                  placeholder="Please specify the duration (e.g., 2 years)"
                  className={`w-full p-4 border ${
                    errors.otherDuration ? 'border-red-300' : 'border-gray-300'
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200`}
                />
              )}
              {(errors.preparationDuration || errors.otherDuration) && (
                <p className="mt-2 text-sm text-red-600">{errors.preparationDuration || errors.otherDuration}</p>
              )}
            </div>

            {/* Question 4: Target Exam Date */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="text-yellow-600 font-bold text-sm">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">What's your target exam date?</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <select
                    value={formData.targetMonth}
                    onChange={(e) => handleInputChange('targetMonth', e.target.value)}
                    className={`w-full p-4 border ${
                      errors.targetMonth ? 'border-red-300' : 'border-gray-300'
                    } rounded-xl appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                  >
                    <option value="">Select month</option>
                    {months.map((month) => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={formData.targetYear}
                    onChange={(e) => handleInputChange('targetYear', e.target.value)}
                    className={`w-full p-4 border ${
                      errors.targetYear ? 'border-red-300' : 'border-gray-300'
                    } rounded-xl appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                  >
                    <option value="">Select year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              {(errors.targetMonth || errors.targetYear) && (
                <p className="mt-2 text-sm text-red-600">{errors.targetMonth || errors.targetYear}</p>
              )}
            </div>

            {/* Question 5: Study Hours */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="text-orange-600 font-bold text-sm">5</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">How many hours per week can you study?</h3>
              </div>
              <div className="relative">
                <select
                  value={formData.studyHours}
                  onChange={(e) => handleInputChange('studyHours', e.target.value)}
                  className={`w-full p-4 border ${
                    errors.studyHours ? 'border-red-300' : 'border-gray-300'
                  } rounded-xl appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200`}
                >
                  <option value="">Select weekly study hours</option>
                  {studyHours.map((hours) => (
                    <option key={hours} value={hours}>{hours}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
              {errors.studyHours && (
                <p className="mt-2 text-sm text-red-600">{errors.studyHours}</p>
              )}
            </div>

            {/* Question 6: Study Mode */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold text-sm">6</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">What's your preferred study mode?</h3>
              </div>
              <div className="relative">
                <select
                  value={formData.studyMode}
                  onChange={(e) => handleInputChange('studyMode', e.target.value)}
                  className={`w-full p-4 border ${
                    errors.studyMode ? 'border-red-300' : 'border-gray-300'
                  } rounded-xl appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                >
                  <option value="">Select your preferred study mode</option>
                  {studyModes.map((mode) => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
              {errors.studyMode && (
                <p className="mt-2 text-sm text-red-600">{errors.studyMode}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center pt-8">
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Complete Setup & Start Learning
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};