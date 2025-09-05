'use client'
import React, { useState } from 'react';
import { ArrowLeft, Brain, Clock, Target, Trophy, Play, BookOpen, Wrench, PenTool, CheckCircle, X } from 'lucide-react';
import { Logo } from './Logo';
import { SubtopicsQuizPage } from './SubtopicsQuizPage';

interface QuizLandingPageProps {
  onBackToDashboard: () => void;
}

export const QuizLandingPage: React.FC<QuizLandingPageProps> = ({ onBackToDashboard }) => {
  const [selectedSection, setSelectedSection] = useState<{sectionTitle: string, subsectionTitle: string} | null>(null);
  const [currentView, setCurrentView] = useState<'main' | 'subtopics'>('main');
  const [showQuizTypeModal, setShowQuizTypeModal] = useState(false);
  const [selectedSubsection, setSelectedSubsection] = useState<{ id: string; title: string; topics: string[]; questionCount?: number; difficulty?: string } | null>(null);

  const quizSections = [
    {
      id: 'history-theory',
      title: 'History and Theory of Architecture; Principles of Planning; Architectural Practice',
      percentage: 30,
      icon: BookOpen,
      color: 'orange',
      description: 'Test your knowledge of architectural history, theory, and professional practice',
      subsections: [
        {
          id: 'history',
          title: 'History of Architecture',
          topics: [
            'Pre-Historic Architecture',
            'Ancient Architecture and Western Succession',
            'Architecture in Asia and Pacific Region',
            'Architecture in the Philippines'
          ],
          questionCount: 45,
          difficulty: 'Medium'
        },
        {
          id: 'theory',
          title: 'Theory of Architecture',
          topics: [
            'Elements of Architecture',
            'Basic Principles of Design',
            'Design Perception',
            'Tropical Architecture',
            'Masters of Architecture'
          ],
          questionCount: 38,
          difficulty: 'Hard'
        },
        {
          id: 'practice',
          title: 'Architectural Practice',
          topics: [
            'Certification of Architects',
            'Standards of Professional Practice',
            'Building Standards and Laws',
            'Aspects of Architectural Practice'
          ],
          questionCount: 42,
          difficulty: 'Medium'
        },
        {
          id: 'planning',
          title: 'Theory and Principles of Design',
          topics: [
            'General Principles of Planning',
            'Urban and Regional Planning',
            'Housing and Human Settlements',
            'Site Planning and Landscape Architecture'
          ],
          questionCount: 35,
          difficulty: 'Hard'
        },
        {
          id: 'utilities',
          title: 'Utilities',
          topics: [
            'Sanitary and Plumbing Systems',
            'Mechanical Systems',
            'Electrical and Power Systems',
            'Acoustics and Illumination',
            'Disaster Prevention Systems'
          ],
          questionCount: 40,
          difficulty: 'Hard'
        }
      ]
    },
    {
      id: 'structural-materials',
      title: 'Structural Design; Building Materials and Construction; Utilities',
      percentage: 30,
      icon: Wrench,
      color: 'blue',
      description: 'Challenge yourself with structural engineering and construction knowledge',
      subsections: [
        {
          id: 'structural',
          title: 'Structural Systems',
          topics: [
            'Structural Analysis',
            'Foundation Design',
            'Steel Structures',
            'Concrete Structures',
            'Seismic Design'
          ],
          questionCount: 50,
          difficulty: 'Hard'
        },
        {
          id: 'materials',
          title: 'Building Materials',
          topics: [
            'Material Properties',
            'Construction Materials',
            'Sustainable Materials',
            'Material Testing'
          ],
          questionCount: 35,
          difficulty: 'Medium'
        },
        {
          id: 'construction',
          title: 'Construction Methods',
          topics: [
            'Construction Techniques',
            'Project Management',
            'Quality Control',
            'Safety Standards'
          ],
          questionCount: 40,
          difficulty: 'Medium'
        }
      ]
    },
    {
      id: 'design-planning',
      title: 'Architectural Design and Site Planning',
      percentage: 40,
      icon: PenTool,
      color: 'red',
      description: 'Master architectural design principles and site planning concepts',
      subsections: [
        {
          id: 'residential',
          title: 'Residential Design',
          topics: [
            'Single-family Housing',
            'Multi-family Housing',
            'Residential Complexes',
            'Housing Design Principles'
          ],
          questionCount: 45,
          difficulty: 'Medium'
        },
        {
          id: 'commercial',
          title: 'Commercial and Business',
          topics: [
            'Office Buildings',
            'Retail Spaces',
            'Mixed-use Developments',
            'Commercial Design Standards'
          ],
          questionCount: 40,
          difficulty: 'Hard'
        },
        {
          id: 'industrial',
          title: 'Industrial and Agricultural',
          topics: [
            'Industrial Facilities',
            'Manufacturing Plants',
            'Agricultural Buildings',
            'Warehouse Design'
          ],
          questionCount: 30,
          difficulty: 'Medium'
        },
        {
          id: 'public',
          title: 'Public and Government',
          topics: [
            'Government Buildings',
            'Civic Centers',
            'Public Facilities',
            'Institutional Design'
          ],
          questionCount: 35,
          difficulty: 'Hard'
        },
        {
          id: 'facilities',
          title: 'Specialized Facilities',
          topics: [
            'Educational Facilities',
            'Healthcare Facilities',
            'Recreational Facilities',
            'Transportation Facilities'
          ],
          questionCount: 42,
          difficulty: 'Hard'
        }
      ]
    }
  ];

  const quizTypes = [
    {
      id: 'practice',
      title: 'Practice Quiz',
      description: 'Quick 10-question quiz to test your knowledge',
      icon: Target,
      color: 'bg-blue-500',
      duration: '10 mins',
      questions: 10
    },
    {
      id: 'mock-exam',
      title: 'Mock Exam',
      description: 'Full-length exam simulation',
      icon: Trophy,
      color: 'bg-red-500',
      duration: '60 mins',
      questions: 50
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      orange: { 
        bg: 'bg-orange-100', 
        icon: 'text-orange-600', 
        border: 'border-orange-200',
        button: 'bg-orange-500 hover:bg-orange-600'
      },
      blue: { 
        bg: 'bg-blue-100', 
        icon: 'text-blue-600', 
        border: 'border-blue-200',
        button: 'bg-blue-500 hover:bg-blue-600'
      },
      red: { 
        bg: 'bg-red-100', 
        icon: 'text-red-600', 
        border: 'border-red-200',
        button: 'bg-red-500 hover:bg-red-600'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.orange;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleStartQuiz = (sectionId: string, subsectionId: string) => {
    const section = quizSections.find(s => s.id === sectionId);
    const subsection = section?.subsections.find(sub => sub.id === subsectionId);
    
    if (section && subsection) {
      setSelectedSection({
        sectionTitle: section.title,
        subsectionTitle: subsection.title
      });
      setCurrentView('subtopics');
    }
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setSelectedSection(null);
  };

  const handleStartTopicQuiz = (sectionId: string, subsectionId: string) => {
    const section = quizSections.find(s => s.id === sectionId);
    const subsection = section?.subsections.find(sub => sub.id === subsectionId);
    
    if (section && subsection) {
      setSelectedSubsection(subsection);
      setShowQuizTypeModal(true);
    }
  };

  const handleQuizTypeSelect = (quizTypeId: string) => {
    if (selectedSubsection) {
      setShowQuizTypeModal(false);
      // Here you would start the actual quiz with the selected type and subsection
      alert(`Starting ${quizTypeId} quiz for ${selectedSubsection.title}`);
      // Reset selection
      setSelectedSubsection(null);
    }
  };

  if (currentView === 'subtopics' && selectedSection) {
    return (
      <SubtopicsQuizPage 
        onBackToQuiz={handleBackToMain}
        sectionTitle={selectedSection.sectionTitle}
        subsectionTitle={selectedSection.subsectionTitle}
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
          <div className="bg-gradient-to-r from-orange-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI-Powered BoardUp Quizzes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Test your knowledge with intelligent quizzes organized by the official Architectural Licensure Exam course outline
          </p>
        </div>

        {/* Course Sections */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">Select Your Topic</h2>
          
          {quizSections.map((section) => {
            const Icon = section.icon;
            const colors = getColorClasses(section.color);
            
            return (
              <div
                key={section.id}
                className={`bg-white rounded-2xl shadow-lg border ${colors.border} p-8`}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`${colors.bg} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-6 w-6 ${colors.icon}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        {section.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.icon}`}>
                        {section.percentage}% of Exam
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {section.description}
                    </p>
                  </div>
                </div>

                {/* Subsections */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.subsections.map((subsection) => (
                    <div
                      key={subsection.id}
                      className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-gray-900 text-lg">
                          {subsection.title}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(subsection.difficulty)}`}>
                          {subsection.difficulty}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center space-x-1">
                            <Target className="h-3 w-3" />
                            <span>{subsection.questionCount} questions</span>
                          </span>
                        </div>
                        
                        <div className="space-y-1">
                          {subsection.topics.slice(0, 3).map((topic, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-600">{topic}</span>
                            </div>
                          ))}
                          {subsection.topics.length > 3 && (
                            <div className="text-xs text-gray-500 ml-5">
                              +{subsection.topics.length - 3} more topics
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleStartTopicQuiz(section.id, subsection.id)}
                        className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-105 ${colors.button} shadow-lg hover:shadow-xl mb-2`}
                      >
                        <Play className="h-4 w-4" />
                        <span>Start Topic Quiz</span>
                      </button>
                      
                      <button
                        onClick={() => handleStartQuiz(section.id, subsection.id)}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 hover:border-gray-400 hover:bg-gray-50"
                      >
                        <Target className="h-4 w-4" />
                        <span>See Subtopics</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl p-8 border border-gray-100">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              How to Get Started
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <span className="text-orange-600 font-bold">1</span>
                </div>
                <p className="text-center">Choose your preferred quiz type from the options above</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <p className="text-center">Select a topic section based on the exam course outline</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <span className="text-red-600 font-bold">3</span>
                </div>
                <p className="text-center">Click "Start Quiz" to begin your AI-powered assessment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Type Selection Modal */}
      {showQuizTypeModal && selectedSubsection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 transform transition-all duration-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Choose Your Quiz Type</h3>
                <p className="text-gray-600 mt-1">
                  {selectedSubsection.title} • {selectedSubsection.questionCount} questions • {selectedSubsection.difficulty}
                </p>
              </div>
              <button
                onClick={() => setShowQuizTypeModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {quizTypes.map((quizType) => {
                const Icon = quizType.icon;
                return (
                  <button
                    key={quizType.id}
                    onClick={() => handleQuizTypeSelect(quizType.id)}
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 text-left group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${quizType.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{quizType.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{quizType.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{quizType.duration}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Target className="h-3 w-3" />
                            <span>{quizType.questions} questions</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowQuizTypeModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};