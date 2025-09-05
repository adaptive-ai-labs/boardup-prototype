// React core imports
import { useState } from 'react';

// Layout components
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Courses } from './components/Courses';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

// Authentication flow components
import { RegisterPage } from './components/RegisterPage';
import { AccountSetupPage } from './components/AccountSetupPage';
import { AccountLandingPage } from './components/AccountLandingPage';
import { ContactInfoPage } from './components/ContactInfoPage';

/**
 * App - Main application component that handles routing and global state
 * 
 * This is the root component that manages the application's page navigation
 * using a custom routing system based on state rather than URL routing.
 * 
 * Features:
 * - Custom page-based routing system
 * - Authentication flow management
 * - Global navigation state
 * - Landing page display
 * 
 * TODO:
 * - [ ] Migrate to React Router for proper URL routing
 * - [ ] Add browser history support
 * - [ ] Implement deep linking
 * - [ ] Add loading states between page transitions
 * - [ ] Add authentication persistence
 * - [ ] Implement protected routes
 * 
 * @component
 */
function App() {
  // Page navigation state - controls which page/component is currently displayed
  // Uses a union type to ensure only valid page names can be set
  const [currentPage, setCurrentPage] = useState<'home' | 'register' | 'setup' | 'dashboard' | 'contact'>('home');

  /**
   * handleLoginClick - Navigates user to dashboard (demo mode)
   * 
   * Currently bypasses actual authentication for demo purposes.
   * In production, this should verify credentials before navigation.
   * 
   * TODO:
   * - [ ] Implement actual authentication logic
   * - [ ] Add loading state during login
   * - [ ] Handle login errors
   * - [ ] Store authentication token
   */
  const handleLoginClick = () => {
    // For demo purposes, go directly to dashboard
    // TODO: Replace with actual authentication flow
    setCurrentPage('dashboard');
  };

  /**
   * handleRegisterClick - Navigates user to registration page
   * 
   * Initiates the user registration flow by switching to the register page.
   * This is the entry point for new user onboarding.
   */
  const handleRegisterClick = () => {
    setCurrentPage('register');
  };

  /**
   * handleBackToHome - Returns user to the landing page
   * 
   * Universal navigation handler to return to the home page from any context.
   * Used throughout the app as a "cancel" or "go back" action.
   */
  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  /**
   * handleRegistrationSuccess - Proceeds to account setup after registration
   * 
   * Called when user successfully completes the registration form.
   * Moves user to the next step in the onboarding flow.
   * 
   * @param userData - User registration data (currently not used)
   * TODO:
   * - [ ] Pass user data to setup page
   * - [ ] Handle registration errors
   * - [ ] Send welcome email
   */
  const handleRegistrationSuccess = () => {
    setCurrentPage('setup');
  };

  /**
   * handleSetupComplete - Completes onboarding and navigates to dashboard
   * 
   * Called when user finishes their profile setup.
   * Marks the end of the onboarding process.
   * 
   * TODO:
   * - [ ] Save setup preferences to backend
   * - [ ] Show welcome tour
   * - [ ] Initialize user dashboard data
   */
  const handleSetupComplete = () => {
    setCurrentPage('dashboard');
  };

  /**
   * handleLogout - Logs out user and returns to home page
   * 
   * Handles user logout by clearing session and returning to landing page.
   * 
   * TODO:
   * - [ ] Clear authentication tokens
   * - [ ] Clear user data from state
   * - [ ] Invalidate server session
   * - [ ] Show logout confirmation
   */
  const handleLogout = () => {
    setCurrentPage('home');
  };

  /**
   * handleContactInfoClick - Navigates to contact information page
   * 
   * Opens the contact form for users who want to get in touch.
   * Used from various marketing components.
   */
  const handleContactInfoClick = () => {
    setCurrentPage('contact');
  };

  /**
   * handleContactSubmissionSuccess - Returns to home after contact form submission
   * 
   * Called when contact form is successfully submitted.
   * Returns user to home page with success indication.
   * 
   * TODO:
   * - [ ] Show success toast notification
   * - [ ] Send confirmation email
   * - [ ] Track contact form conversions
   */
  const handleContactSubmissionSuccess = () => {
    setCurrentPage('home');
  };

  // CONDITIONAL RENDERING - PAGE ROUTER
  // Each condition below renders a different page based on currentPage state
  // This acts as our custom routing system (no React Router dependency)
  
  // Registration flow - new user signup
  if (currentPage === 'register') {
    return <RegisterPage onBackToHome={handleBackToHome} onRegistrationSuccess={handleRegistrationSuccess} />;
  }

  // Account setup flow - profile configuration after registration
  if (currentPage === 'setup') {
    return <AccountSetupPage onComplete={handleSetupComplete} onBackToHome={handleBackToHome} />;
  }

  // User dashboard - main application interface after login
  if (currentPage === 'dashboard') {
    return <AccountLandingPage onLogout={handleLogout} />;
  }

  // Contact form - inquiry/support page
  if (currentPage === 'contact') {
    return <ContactInfoPage onBackToHome={handleBackToHome} onSubmissionSuccess={handleContactSubmissionSuccess} />;
  }

  // DEFAULT: HOME/LANDING PAGE
  // Marketing landing page with all promotional content
  // This is what anonymous users see when they first visit the site
  return (
    <div className="min-h-screen bg-white">
      {/* Main navigation bar - always visible on landing page */}
      <Header onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
      
      {/* Hero section - primary call-to-action and value proposition */}
      <Hero onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
      
      {/* Course offerings section - displays available exam prep courses */}
      {/* Note: Links to contact form instead of direct registration for lead capture */}
      <Courses onRegisterClick={handleContactInfoClick} />
      
      {/* Social proof section - student testimonials and success stories */}
      <Testimonials onContactClick={handleContactInfoClick} />
      
      {/* Footer - additional navigation and contact information */}
      <Footer onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
    </div>
  );
}

export default App;