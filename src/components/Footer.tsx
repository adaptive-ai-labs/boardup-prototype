'use client'
import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onLoginClick, onRegisterClick }) => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="mb-6">
              <Logo className="h-12" />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Transform your board exam preparation with AI-powered study plans, 
              personalized learning, and proven strategies that boost success rates.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={onRegisterClick}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200"
              >
                Start Free Trial
              </button>
              <button
                onClick={onLoginClick}
                className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-medium hover:border-orange-500 hover:text-orange-400 transition-all duration-200"
              >
                Log In
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Platform</h3>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#features" className="hover:text-orange-400 transition-colors">Features</a></li>
              <li><a href="#courses" className="hover:text-blue-400 transition-colors">Courses</a></li>
              <li><a href="#benefits" className="hover:text-blue-400 transition-colors">Benefits</a></li>
              <li><a href="#testimonials" className="hover:text-red-400 transition-colors">Success Stories</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 BoardUp. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail className="h-4 w-4" />
                <span>support@boardup.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};