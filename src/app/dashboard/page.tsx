'use client'

import { AccountLandingPage } from '@/components/AccountLandingPage';

/**
 * Dashboard Page Route
 * 
 * This page shows the user dashboard after login or account setup.
 */
export default function Dashboard() {
  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <AccountLandingPage onLogout={handleLogout} />
  );
}