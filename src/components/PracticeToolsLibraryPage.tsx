'use client'
import React, { useState } from 'react';
import { ArrowLeft, Target, Brain, FileText, Star, Calendar, ChevronDown, Trophy } from 'lucide-react';
import { Logo } from './Logo';

interface PracticeToolsLibraryPageProps {
  onBackToDashboard: () => void;
}

export const PracticeToolsLibraryPage: React.FC<PracticeToolsLibraryPageProps> = ({ 
  onBackToDashboard 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const practiceResources = [
    {
      id: 1,
      title: '2023 Architectural Licensure Exam - Complete Set',
      author: 'Professional Regulation Commission',
      category: 'Past Exam Archives',
      description: 'Complete exam questions with detailed answer keys and explanations from the 2023 ALE.',
      questionCount: 200,
      rating: 4.9,
      accessCount: 3247,
      uploadDate: '2024-01-05',
      tags: ['ALE 2023', 'Complete Exam', 'Answer Keys'],
      coverColor: 'bg-red-500',
      type: 'exam'
    },
    {
      id: 2,
      title: 'Residential Design Case Studies',
      author: 'UAP Design Committee',
      category: 'Case Study Exercises',
      description: 'Real-world residential projects with design process, challenges, and solutions explained.',
      questionCount: 15,
      rating: 4.7,
      accessCount: 1876,
      uploadDate: '2024-01-12',
      tags: ['Residential Design', 'Case Studies', 'Design Process'],
      coverColor: 'bg-blue-500',
      type: 'case-study'
    },
    {
      id: 3,
      title: 'Structural Formula Quick Reference Drills',
      author: 'Engr. Pedro Martinez',
      category: 'Formula & Definition Drills',
      description: 'Interactive drills for memorizing essential structural formulas and engineering calculations.',
      questionCount: 150,
      rating: 4.6,
      accessCount: 2156,
      uploadDate: '2024-01-18',
      tags: ['Structural Formulas', 'Quick Recall', 'Calculations'],
      coverColor: 'bg-green-500',
      type: 'drill'
    },
    {
      id: 4,
      title: '2022 ALE History and Theory Section',
      author: 'Professional Regulation Commission',
      category: 'Past Exam Archives',
      description: 'History and Theory section from 2022 exam with comprehensive explanations and references.',
      questionCount: 60,
      rating: 4.8,
      accessCount: 2543,
      uploadDate: '2024-01-25',
      tags: ['ALE 2022', 'History Theory', 'Explanations'],
      coverColor: 'bg-purple-500',
      type: 'exam'
    },
    {
      id: 5,
      title: 'Commercial Building Design Case Study',
      author: 'Arch. Maria Santos',
      category: 'Case Study Exercises',
      description: 'Step-by-step analysis of a commercial building project from concept to completion.',
      questionCount: 8,
      rating: 4.5,
      accessCount: 1432,
      uploadDate: '2024-02-01',
      tags: ['Commercial Design', 'Project Analysis', 'Building Process'],
      coverColor: 'bg-orange-500',
      type: 'case-study'
    },
    {
      id: 6,
      title: 'Building Codes Memory Drills',
      author: 'Philippine Building Officials Association',
      category: 'Formula & Definition Drills',
      description: 'Quick recall exercises for Philippine building codes, fire safety, and accessibility standards.',
      questionCount: 120,
      rating: 4.7,
      accessCount: 1987,
      uploadDate: '2024-02-08',
      tags: ['Building Codes', 'Fire Safety', 'Memory Drills'],
      coverColor: 'bg-red-600',
      type: 'drill'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Practice Tools', count: practiceResources.length },
    { id: 'exams', name: 'Past Exam Archives', count: practiceResources.filter(r => r.type === 'exam').length },
    { id: 'case-studies', name: 'Case Study Exercises', count: practiceResources.filter(r => r.type === 'case-study').length }
  ];

  const filteredResources = selectedCategory === 'all' 
    ? practiceResources 
    : practiceResources.filter(resource => 
        (selectedCategory === 'exams' && resource.type === 'exam') ||
        (selectedCategory === 'case-studies' && resource.type === 'case-study') ||
        (selectedCategory === 'drills' && resource.type === 'drill')
      );

  const handleStart = (resourceTitle: string) => {
    alert(`Starting: ${resourceTitle}\n\nThis is a demo - actual practice tool functionality would be implemented here.`);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'exam': return Trophy;
      case 'case-study': return Brain;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={onBackToDashboard}
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Dashboard</span>
            </button>
            <Logo />
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-red-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Target className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Practice Tools Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Test your knowledge with past exams, case studies, and practice drills
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-4">
            {/* Category Dropdown */}
            <div className="mb-6">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full md:w-64 bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none shadow-sm"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'All Practice Tools' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <span className="text-gray-600">
                {filteredResources.length} {filteredResources.length === 1 ? 'tool' : 'tools'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((resource) => {
                const IconComponent = getIcon(resource.type);
                return (
                  <div
                    key={resource.id}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                  >
                    {/* Resource Cover & Title */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className={`${resource.coverColor} w-16 h-20 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">by {resource.author}</p>
                        <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                          {resource.category}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {resource.description}
                    </p>

                    {/* Resource Stats */}
                    <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <FileText className="h-3 w-3" />
                        <span>{resource.questionCount} questions</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span>{resource.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="h-3 w-3" />
                        <span>{resource.accessCount}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStart(resource.title)}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                      >
                        <Target className="h-4 w-4" />
                        <span className="text-sm font-medium">Start Practice</span>
                      </button>
                    </div>

                    {/* Upload Date */}
                    <div className="flex items-center space-x-1 mt-3 pt-3 border-t border-gray-100">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        Added {new Date(resource.uploadDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No practice tools found</h3>
                <p className="text-gray-600">Try selecting a different category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};