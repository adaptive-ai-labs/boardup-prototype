import React from 'react';
import { TrendingUp, Clock, Users, Trophy } from 'lucide-react';

export const Benefits: React.FC = () => {
  const stats = [
    { icon: TrendingUp, value: '40%', label: 'Higher Success Rate', color: 'text-orange-600' },
    { icon: Clock, value: '60%', label: 'Time Saved', color: 'text-blue-600' },
    { icon: Users, value: '50+', label: 'Curators', color: 'text-red-600' },
    { icon: Trophy, value: '95%', label: 'Satisfaction Rate', color: 'text-yellow-600' }
  ];

  return (
    <section id="benefits" className="py-20 bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Proven Results That
            <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent"> Speak Volumes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of students who have transformed their board exam preparation 
            and achieved their dream scores with BoardUp.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-blue-600 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Preparation?
          </h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join the thousands of students who are already experiencing better results, 
            less stress, and more confidence in their board exam preparation.
          </p>
          <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};