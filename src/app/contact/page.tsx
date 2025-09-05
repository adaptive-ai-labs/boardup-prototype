'use client'

import { ContactInfoPage } from '@/components/ContactInfoPage';

/**
 * Contact Page Route
 * 
 * This page handles the contact form for user inquiries.
 */
export default function Contact() {
  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const handleSubmissionSuccess = () => {
    window.location.href = '/';
  };

  return (
    <ContactInfoPage 
      onBackToHome={handleBackToHome} 
      onSubmissionSuccess={handleSubmissionSuccess} 
    />
  );
}