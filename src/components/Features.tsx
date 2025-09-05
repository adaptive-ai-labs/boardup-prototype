'use client'
import React from 'react';
import { BookOpen, BarChart3, Users, Clock, Award, Shield } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Study Materials',
      description: 'Access thousands of practice questions, mock tests, and detailed solutions for all major board exams.',
      color: 'orange'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Get detailed insights into your performance with AI-powered analytics that identify your strengths and improvement areas.',
      color: 'blue'
    },
    {
      icon: Users,
      title: 'Expert Mentorship',
      description: 'Connect with experienced mentors and join study groups with peers preparing for the same exams.',
      color: 'red'
    },
    {
      icon: Clock,
      title: 'Time Management Tools',
      description: 'Master exam timing with our smart scheduling system and time-based practice sessions.',
      color: 'yellow'
    },
    {
      icon: Award,
      title: 'Achievement System',
      description: 'Stay motivated with gamified learning, badges, and milestone rewards that celebrate your progress.',
      color: 'orange'
    },
    {
      icon: Shield,
      title: 'Exam Confidence Builder',
      description: 'Reduce exam anxiety with our confidence-building exercises and stress management techniques.',
      color: 'blue'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      orange: { bg: 'bg-orange-100', icon: 'text-orange-600' },
      blue: { bg: 'bg-blue-100', icon: 'text-blue-600' },
      red: { bg: 'bg-red-100', icon: 'text-red-600' },
      yellow: { bg: 'bg-yellow-100', icon: 'text-yellow-600' }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.orange;
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to
            <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent"> Succeed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform combines cutting-edge technology with proven study methods 
            to give you the competitive edge you need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = getColorClasses(feature.color);
            
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
              >
                <div className={`${colors.bg} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`h-6 w-6 ${colors.icon}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};