import React, { useState } from 'react';
import { ArrowLeft, Brain, Clock, Target, Trophy, Play } from 'lucide-react';
import { Logo } from './Logo';
import { PracticeQuizPage } from './PracticeQuizPage';

interface SubtopicsQuizPageProps {
  onBackToQuiz: () => void;
  sectionTitle: string;
  subsectionTitle: string;
}

export const SubtopicsQuizPage: React.FC<SubtopicsQuizPageProps> = ({ 
  onBackToQuiz, 
  sectionTitle, 
  subsectionTitle 
}) => {
  const [selectedQuizType, setSelectedQuizType] = useState<string>('practice');
  const [currentView, setCurrentView] = useState<'subtopics' | 'quiz'>('subtopics');
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('');

  // Sample subtopics based on the section - this would be dynamic in a real app
  const getSubtopics = (section: string, subsection: string) => {
    if (section.includes('History') && subsection.includes('History of Architecture')) {
      return [
        {
          id: 'prehistoric',
          title: 'Pre-Historic Architecture',
          description: 'Stone Age structures, cave dwellings, and early human settlements',
          questionCount: 15,
          difficulty: 'Easy',
          estimatedTime: '10 mins'
        },
        {
          id: 'ancient-western',
          title: 'Ancient Architecture and Western Succession',
          description: 'Egyptian, Greek, Roman, and Byzantine architectural styles',
          questionCount: 25,
          difficulty: 'Medium',
          estimatedTime: '18 mins'
        },
        {
          id: 'asia-pacific',
          title: 'Architecture in Asia and Pacific Region',
          description: 'Traditional Asian architectural styles and influences',
          questionCount: 20,
          difficulty: 'Medium',
          estimatedTime: '15 mins'
        },
        {
          id: 'philippines',
          title: 'Architecture in the Philippines',
          description: 'Indigenous, Spanish colonial, and modern Philippine architecture',
          questionCount: 18,
          difficulty: 'Hard',
          estimatedTime: '12 mins'
        }
      ];
    } else if (section.includes('History') && subsection.includes('Theory of Architecture')) {
      return [
        {
          id: 'elements-principles',
          title: 'Elements of Architecture and Basic Principles of Design',
          description: 'Fundamental design elements, principles, and composition',
          questionCount: 22,
          difficulty: 'Medium',
          estimatedTime: '16 mins'
        },
        {
          id: 'design-perception',
          title: 'Design Perception',
          description: 'Visual perception, spatial relationships, and design psychology',
          questionCount: 18,
          difficulty: 'Hard',
          estimatedTime: '13 mins'
        },
        {
          id: 'tropical-architecture',
          title: 'Tropical Architecture',
          description: 'Climate-responsive design for tropical environments',
          questionCount: 16,
          difficulty: 'Medium',
          estimatedTime: '12 mins'
        },
        {
          id: 'masters',
          title: 'Masters of Architecture',
          description: 'Famous architects and their contributions to the field',
          questionCount: 20,
          difficulty: 'Hard',
          estimatedTime: '15 mins'
        }
      ];
    } else {
      // Default subtopics for other sections
      return [
        {
          id: 'general-1',
          title: 'General Concepts',
          description: 'Fundamental concepts and principles',
          questionCount: 20,
          difficulty: 'Medium',
          estimatedTime: '15 mins'
        },
        {
          id: 'general-2',
          title: 'Advanced Topics',
          description: 'Complex topics and applications',
          questionCount: 25,
          difficulty: 'Hard',
          estimatedTime: '18 mins'
        }
      ];
    }
  };

  const subtopics = getSubtopics(sectionTitle, subsectionTitle);

  const quizTypes = [
    {
      id: 'practice',
      title: 'Practice Quiz',
      description: 'Quick practice questions',
      icon: Target,
      color: 'bg-blue-500'
    },
    {
      id: 'mock-exam',
      title: 'Mock Exam',
      description: 'Exam-style questions',
      icon: Trophy,
      color: 'bg-red-500'
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleStartQuiz = (subtopicId: string, subtopicTitle: string) => {
    const selectedQuiz = quizTypes.find(q => q.id === selectedQuizType);
    
    if (selectedQuizType === 'practice') {
      setSelectedSubtopic(subtopicTitle);
      setCurrentView('quiz');
    } else {
      alert(`Starting ${selectedQuiz?.title} for "${subtopicTitle}"\n\nThis quiz type is coming soon!`);
    }
  };

  const handleBackToSubtopics = () => {
    setCurrentView('subtopics');
    setSelectedSubtopic('');
  };

  if (currentView === 'quiz') {
    return (
      <PracticeQuizPage 
        onBackToQuiz={handleBackToSubtopics}
        subtopicTitle={selectedSubtopic}
        sectionTitle={`${sectionTitle} - ${subsectionTitle}`}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={onBackToQuiz}
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Quiz Library</span>
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
          <div className="bg-gradient-to-r from-orange-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Subtopic
          </h1>
          <div className="text-xl text-gray-600 max-w-3xl mx-auto">
            <p className="font-semibold text-orange-600">{sectionTitle}</p>
            <p className="text-lg">{subsectionTitle}</p>
          </div>
        </div>

        {/* Quiz Type Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Select Quiz Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {quizTypes.map((quiz) => {
              const Icon = quiz.icon;
              return (
                <button
                  key={quiz.id}
                  onClick={() => setSelectedQuizType(quiz.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedQuizType === quiz.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`${quiz.color} w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {quiz.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {quiz.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Subtopics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subtopics.map((subtopic) => (
            <div
              key={subtopic.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 leading-tight">
                  {subtopic.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(subtopic.difficulty)}`}>
                  {subtopic.difficulty}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {subtopic.description}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
                <div className="flex items-center space-x-1">
                  <Target className="h-3 w-3" />
                  <span>{subtopic.questionCount} questions</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{subtopic.estimatedTime}</span>
                </div>
              </div>

              <button
                onClick={() => handleStartQuiz(subtopic.id, subtopic.title)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-blue-600 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Play className="h-4 w-4" />
                <span>Start Quiz</span>
              </button>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl p-8 border border-gray-100">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <span className="text-orange-600 font-bold">1</span>
                </div>
                <p className="text-center">Select your preferred quiz type above</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <p className="text-center">Choose a specific subtopic to focus on</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <span className="text-red-600 font-bold">3</span>
                </div>
                <p className="text-center">Start your personalized quiz session</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};