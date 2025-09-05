'use client'
import React from 'react';
import { Users, Target, Trophy } from 'lucide-react';

interface TestimonialsProps {
  onContactClick: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onContactClick }) => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Be One of Our
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"> First Success Stories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our early adopters and help us build the future of board exam preparation. 
            Your feedback will shape the platform that helps thousands of students succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Early Access
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Get exclusive access to new features and help us refine the platform based on your needs.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Personalized Support
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Receive direct support from our team as we work together to optimize your study experience.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
            <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Trophy className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Shape the Future
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Your success story will inspire and guide future students on their board exam journey.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make History?
          </h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Be among the first students to experience AI-powered board exam preparation. 
            Your journey starts here, and your success story begins now.
          </p>
          <button 
            onClick={onContactClick}
            className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Join the Pioneer Program
          </button>
        </div>
      </div>
    </section>
  );
};