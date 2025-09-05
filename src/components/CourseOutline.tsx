import React, { useState } from 'react';
import { BookOpen, Building, Wrench, PenTool, CheckCircle, ChevronDown, ChevronRight, X, BookOpenCheck, Target, Headphones, CreditCard } from 'lucide-react';

interface CourseOutlineProps {
  examType: string;
  onNavigateToResources?: (topic: string, section: string) => void;
  onNavigateToQuiz?: (topic: string, section: string) => void;
}

export const CourseOutline: React.FC<CourseOutlineProps> = ({ 
  examType, 
  onNavigateToResources, 
  onNavigateToQuiz 
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [showModeModal, setShowModeModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<{ topic: string; section: string } | null>(null);

  const handleTopicClick = (topic: string, section: string) => {
    setSelectedTopic({ topic, section });
    setShowModeModal(true);
  };

  const handleModeSelection = (mode: 'study' | 'quiz') => {
    if (selectedTopic) {
      if (mode === 'study') {
        setShowModeModal(false);
        setShowResourceModal(true);
      } else {
        if (onNavigateToQuiz) {
          onNavigateToQuiz(selectedTopic.topic, selectedTopic.section);
        }
        setShowModeModal(false);
        setSelectedTopic(null);
      }
    }
  };

  const handleResourceCategorySelection = (category: string) => {
    if (selectedTopic && onNavigateToResources) {
      // Pass the category information to the parent component
      onNavigateToResources(selectedTopic.topic, category);
    }
    setShowResourceModal(false);
    setSelectedTopic(null);
  };

  const closeModeModal = () => {
    setShowModeModal(false);
    setSelectedTopic(null);
  };

  const closeResourceModal = () => {
    setShowResourceModal(false);
    setSelectedTopic(null);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // For now, we'll focus on Architectural Licensure Exam
  // This can be expanded to handle other exam types later
  
  const architecturalCoverage = [
    {
      id: 'history-theory',
      title: 'History and Theory of Architecture; Principles of Planning; Architectural Practice',
      percentage: 30,
      icon: BookOpen,
      color: 'orange',
      sections: [
        {
          title: 'A.1 History of Architecture',
          topics: [
            'Introduction',
            'Pre-Historic Architecture',
            'Historic Styles of Architecture',
            '3.1 Ancient architecture and the Western succession',
            '3.2 Architecture in Asia and the Pacific Region',
            '3.3 Architecture in the Philippines'
          ]
        },
        {
          title: 'A.2 Theory of Architecture',
          topics: [
            'Introduction',
            'Elements of Architecture and Basic Principles of Design',
            'Design Perception',
            'Tropical Architecture',
            'Masters of Architecture'
          ]
        },
        {
          title: 'A.3 Architectural Practice',
          topics: [
            'Introduction',
            'Certification of Architects and Standards of Professional Practice',
            'Building Standards, Laws, and Regulations',
            'Aspects of Architectural Practice'
          ]
        },
        {
          title: 'A.4 Theory and Principles of Design',
          topics: [
            'General Principles of Planning',
            'Urban and Regional Planning and Urban Design',
            'Housing and Human Settlements Planning',
            'The Art and Science of Site Planning and Landscape Architecture'
          ]
        },
        {
          title: 'A.5 Utilities',
          topics: [
            'Sanitary and Plumbing Systems and Equipment',
            'Mechanical Systems',
            'Electrical and Other Power Systems',
            'Acoustics and Illumination',
            'Disaster Prevention and Protection Systems; Security Systems',
            'Communication Systems',
            'High-tech Systems'
          ]
        }
      ],
      completed: 0,
      total: 28
    },
    {
      id: 'structural-materials',
      title: 'Structural Design; Building Materials and Construction; Utilities',
      percentage: 30,
      icon: Wrench,
      color: 'blue',
      sections: [
        {
          title: 'General Topics',
          topics: [
            'Structural Systems',
            'Building Materials',
            'Construction Methods',
            'MEP Systems',
            'HVAC Design',
            'Plumbing and Electrical'
          ]
        }
      ],
      completed: 0,
      total: 6
    },
    {
      id: 'design-planning',
      title: 'Architectural Design and Site Planning',
      percentage: 40,
      icon: PenTool,
      color: 'red',
      sections: [
        {
          title: 'C.1 Residential',
          topics: [
            'Single-family Housing',
            'Multi-family Housing',
            'Residential Complexes',
            'Housing Design Principles'
          ]
        },
        {
          title: 'C.2 Commercial and Business',
          topics: [
            'Office Buildings',
            'Retail Spaces',
            'Mixed-use Developments',
            'Commercial Design Standards'
          ]
        },
        {
          title: 'C.3 Industrial and Agricultural',
          topics: [
            'Industrial Facilities',
            'Manufacturing Plants',
            'Agricultural Buildings',
            'Warehouse Design'
          ]
        },
        {
          title: 'C.4 Public and Government',
          topics: [
            'Government Buildings',
            'Civic Centers',
            'Public Facilities',
            'Institutional Design'
          ]
        },
        {
          title: 'C.5 Facilities',
          topics: [
            'Educational Facilities',
            'Healthcare Facilities',
            'Recreational Facilities',
            'Transportation Facilities'
          ]
        },
        {
          title: 'C.6 Complex Projects',
          topics: [
            'Master Planning',
            'Urban Design Projects',
            'Large-scale Developments',
            'Integrated Design Solutions'
          ]
        }
      ],
      completed: 0,
      total: 24
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      orange: { 
        bg: 'bg-orange-100', 
        icon: 'text-orange-600', 
        progress: 'bg-orange-500',
        border: 'border-orange-200'
      },
      blue: { 
        bg: 'bg-blue-100', 
        icon: 'text-blue-600', 
        progress: 'bg-blue-500',
        border: 'border-blue-200'
      },
      red: { 
        bg: 'bg-red-100', 
        icon: 'text-red-600', 
        progress: 'bg-red-500',
        border: 'border-red-200'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.orange;
  };

  if (examType !== 'Architectural Licensure Exam') {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Outline</h2>
        <p className="text-gray-600">Course outline for {examType} coming soon...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-orange-500 to-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mr-4">
          <Building className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Course Outline</h2>
          <p className="text-gray-600">Architectural Licensure Exam Coverage</p>
        </div>
      </div>

      {/* Mode Selection Modal */}
      {showModeModal && selectedTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Choose Learning Mode</h3>
              <button
                onClick={closeModeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Selected Topic Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-1">{selectedTopic.topic}</h4>
              <p className="text-sm text-gray-600">{selectedTopic.section}</p>
            </div>

            {/* Mode Options */}
            <div className="space-y-4">
              <button
                onClick={() => handleModeSelection('study')}
                className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
              >
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                  <BookOpenCheck className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-gray-900 mb-1">Study Mode</h4>
                  <p className="text-sm text-gray-600">Access study materials, notes, and resources for this topic</p>
                </div>
              </button>

              <button
                onClick={() => handleModeSelection('quiz')}
                className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group"
              >
                <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-200">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-gray-900 mb-1">Quiz Mode</h4>
                  <p className="text-sm text-gray-600">Take a quiz to test your knowledge on this specific topic</p>
                </div>
              </button>
            </div>

            {/* Cancel Button */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={closeModeModal}
                className="w-full px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-6">
      {/* Resource Category Selection Modal */}
      {showResourceModal && selectedTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 transform transition-all duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Choose Resource Type</h3>
              <button
                onClick={closeResourceModal}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Selected Topic Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-1">{selectedTopic.topic}</h4>
              <p className="text-sm text-gray-600">{selectedTopic.section}</p>
            </div>

            {/* Resource Category Options */}
            <div className="space-y-3">
              <button
                onClick={() => handleResourceCategorySelection('Reading Resources')}
                className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group"
              >
                <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-200">
                  <BookOpen className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-gray-900 mb-1">Reading Resources</h4>
                  <p className="text-sm text-gray-600">E-Books, PDF study notes, and condensed review handouts</p>
                </div>
              </button>

              <button
                onClick={() => handleResourceCategorySelection('Audio & Visual')}
                className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
              >
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                  <Headphones className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-gray-900 mb-1">Audio & Visual</h4>
                  <p className="text-sm text-gray-600">Audiobooks and lecture recordings for on-the-go learning</p>
                </div>
              </button>


              <button
                onClick={() => handleResourceCategorySelection('Flashcards')}
                className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
              >
                <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-gray-900 mb-1">Flashcards</h4>
                  <p className="text-sm text-gray-600">Interactive flashcards for active recall and spaced repetition</p>
                </div>
              </button>
            </div>

            {/* Cancel Button */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={closeResourceModal}
                className="w-full px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

        {architecturalCoverage.map((section) => {
          const Icon = section.icon;
          const colors = getColorClasses(section.color);
          const progressPercentage = (section.completed / section.total) * 100;

          return (
            <div
              key={section.id}
              className={`border ${colors.border} rounded-xl p-6 hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-start space-x-4">
                <div className={`${colors.bg} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-6 w-6 ${colors.icon}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">
                      {section.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.icon}`}>
                      {section.percentage}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {section.completed}/{section.total} topics
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${colors.progress} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Topics List */}
                  <div className="space-y-3">
                    {section.sections.map((subsection, subsectionIndex) => (
                      <div key={subsectionIndex} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => toggleSection(`${section.id}-${subsectionIndex}`)}
                          className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors duration-200"
                        >
                          <h4 className="font-semibold text-gray-800 text-sm">
                            {subsection.title}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
                                  style={{ width: '0%' }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500 font-medium">0%</span>
                            </div>
                            {expandedSections[`${section.id}-${subsectionIndex}`] ? (
                              <ChevronDown className="h-4 w-4 text-gray-400" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                        </button>
                        
                        {expandedSections[`${section.id}-${subsectionIndex}`] && (
                          <div className="px-3 pb-3 border-t border-gray-100">
                            <div className="grid grid-cols-1 gap-2 mt-3">
                              {subsection.topics.map((topic, topicIndex) => (
                                <button
                                  key={topicIndex}
                                  onClick={() => handleTopicClick(topic, subsection.title)}
                                  className="flex items-center space-x-2 py-2 px-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-left w-full group"
                                >
                                  <CheckCircle className="h-3 w-3 text-gray-300 group-hover:text-orange-500 flex-shrink-0 transition-colors duration-200" />
                                  <span className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors duration-200">{topic}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Progress Summary */}
      <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-1">Overall Progress</h4>
            <p className="text-gray-600">Complete all topics to be exam-ready</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">0%</div>
            <div className="text-sm text-gray-600">0/58 topics completed</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-orange-500 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: '0%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};