import React from 'react';
import { Brain, Target, TrendingUp, Zap } from 'lucide-react';

interface HeroProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLoginClick, onRegisterClick }) => {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-white to-blue-50 py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Ace Your Boards with
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 bg-clip-text text-transparent"> AI Precision</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your board exam preparation with personalized AI-driven study plans, 
            smart analytics, and proven strategies for effective learning.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={onRegisterClick}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Free Trial
            </button>
            <button
              onClick={onLoginClick}
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-orange-500 hover:text-orange-600 transition-all duration-200 transform hover:scale-105"
            >
              Log In
            </button>
          </div>

        </div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-100">
            <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Study Plans</h3>
            <p className="text-gray-600 text-sm">Personalized learning paths adapted to your strengths and weaknesses.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-100">
            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Targeting</h3>
            <p className="text-gray-600 text-sm">Focus on high-impact topics that matter most for your success.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-100">
            <div className="bg-red-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Progress Tracking</h3>
            <p className="text-gray-600 text-sm">Real-time analytics to monitor your improvement and readiness.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-100">
            <div className="bg-yellow-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quick Results</h3>
            <p className="text-gray-600 text-sm">See improvement in your scores within the first two weeks.</p>
          </div>
        </div>
      </div>
    </section>
  );
};