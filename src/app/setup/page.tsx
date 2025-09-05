'use client'

import { AccountSetupPage } from '@/components/AccountSetupPage';

/**
 * Setup Page Route
 * 
 * This page handles account setup after successful registration.
 */
export default function Setup() {
  const handleComplete = () => {
    window.location.href = '/dashboard';
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <AccountSetupPage 
      onComplete={handleComplete} 
      onBackToHome={handleBackToHome} 
    />
  );
}