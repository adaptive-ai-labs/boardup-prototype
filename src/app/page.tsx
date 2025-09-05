'use client'

// Layout components
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Courses } from '@/components/Courses';
import { Testimonials } from '@/components/Testimonials';
import { Footer } from '@/components/Footer';

/**
 * Home Page - Landing page for BoardUp
 * 
 * This is the main marketing page that users see when they first visit the site.
 * It includes the hero section, course offerings, testimonials, and footer.
 */
export default function Home() {
  const handleContactInfoClick = () => {
    // Navigate to contact page
    window.location.href = '/contact';
  };

  const handleLoginClick = () => {
    // Navigate to dashboard
    window.location.href = '/dashboard';
  };

  const handleRegisterClick = () => {
    // Navigate to register page
    window.location.href = '/register';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main navigation bar */}
      <Header onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
      
      {/* Hero section */}
      <Hero onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
      
      {/* Course offerings section */}
      <Courses onRegisterClick={handleContactInfoClick} />
      
      {/* Social proof section */}
      <Testimonials onContactClick={handleContactInfoClick} />
      
      {/* Footer */}
      <Footer onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
    </div>
  );
}