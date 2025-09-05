'use client'

import React from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoginClick, onRegisterClick }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - aligned to left */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Auth Buttons - aligned to right */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            <button
              onClick={onLoginClick}
              className="hidden md:block text-gray-600 hover:text-orange-600 font-medium transition-colors duration-200"
            >
              Log In
            </button>
            <button
              onClick={onRegisterClick}
              className="hidden md:block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105"
            >
              Register Now
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-orange-600">
                Features
              </a>
              <a href="#courses" className="text-gray-600 hover:text-blue-600">
                Courses
              </a>
              <a href="#benefits" className="text-gray-600 hover:text-blue-600">
                Benefits
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <button
                  onClick={onLoginClick}
                  className="text-left text-gray-600 hover:text-orange-600 font-medium"
                >
                  Log In
                </button>
                <button
                  onClick={onRegisterClick}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-medium text-center"
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};