'use client'
import React from 'react';
import { Building, Wrench, Zap, Calculator, Heart, GraduationCap, Shield, FlaskConical, HardHat } from 'lucide-react';

interface CoursesProps {
  onRegisterClick: () => void;
}

export const Courses: React.FC<CoursesProps> = ({ onRegisterClick }) => {
  const courses = [
    {
      icon: Building,
      title: 'Architectural Licensure Exam',
      description: 'Master architectural principles, building codes, and design fundamentals.',
      color: 'orange'
    },
    {
      icon: HardHat,
      title: 'Civil Engineering Licensure Exam',
      description: 'Comprehensive preparation for structural, geotechnical, and transportation engineering.',
      color: 'blue'
    },
    {
      icon: Wrench,
      title: 'Mechanical Engineering Licensure Exam',
      description: 'Thermodynamics, fluid mechanics, and mechanical design concepts.',
      color: 'red'
    },
    {
      icon: Zap,
      title: 'Electrical Engineering Licensure Exam',
      description: 'Power systems, electronics, and electrical circuit analysis.',
      color: 'yellow'
    },
    {
      icon: Calculator,
      title: 'Certified Public Accountant Exam',
      description: 'Accounting principles, auditing, taxation, and business law.',
      color: 'orange'
    },
    {
      icon: Heart,
      title: 'Nursing Licensure Exam',
      description: 'Patient care, medical procedures, and healthcare fundamentals.',
      color: 'blue'
    },
    {
      icon: GraduationCap,
      title: 'Licensure Exam for Teachers',
      description: 'Educational psychology, teaching methods, and curriculum development.',
      color: 'red'
    },
    {
      icon: Shield,
      title: 'Criminology Licensure Exam',
      description: 'Criminal justice, law enforcement, and forensic science principles.',
      color: 'yellow'
    },
    {
      icon: FlaskConical,
      title: 'Chemical Engineering Licensure Exam',
      description: 'Process design, chemical reactions, and industrial chemistry.',
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      orange: { bg: 'bg-orange-100', icon: 'text-orange-600', border: 'border-orange-200' },
      blue: { bg: 'bg-blue-100', icon: 'text-blue-600', border: 'border-blue-200' },
      red: { bg: 'bg-red-100', icon: 'text-red-600', border: 'border-red-200' },
      yellow: { bg: 'bg-yellow-100', icon: 'text-yellow-600', border: 'border-yellow-200' }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.orange;
  };

  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Professional
            <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent"> Licensure Exams</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive preparation for all major professional licensure examinations 
            with AI-powered study plans tailored to each field.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-9 gap-4">
          {courses.map((course, index) => {
            const Icon = course.icon;
            const colors = getColorClasses(course.color);
            
            return (
              <button
                key={index}
                onClick={onRegisterClick}
                className={`bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border ${colors.border} group cursor-pointer text-left w-full`}
              >
                <div className={`${colors.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`h-6 w-6 ${colors.icon}`} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {course.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={onRegisterClick}
            className="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Explore All Courses
          </button>
        </div>
      </div>
    </section>
  );
};