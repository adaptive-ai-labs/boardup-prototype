'use client'

import { RegisterPage } from '@/components/RegisterPage';

/**
 * Register Page Route
 * 
 * This page handles user registration flow.
 */
export default function Register() {
  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const handleRegistrationSuccess = () => {
    window.location.href = '/setup';
  };

  return (
    <RegisterPage 
      onBackToHome={handleBackToHome} 
      onRegistrationSuccess={handleRegistrationSuccess} 
    />
  );
}