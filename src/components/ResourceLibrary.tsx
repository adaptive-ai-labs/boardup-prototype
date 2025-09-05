import React from 'react';
import { BookOpen, Headphones, Target, CreditCard, Download, Play, FileText, Brain } from 'lucide-react';

interface ResourceLibraryProps {
  onResourceClick?: (resourceType: string, categoryTitle: string) => void;
}

export const ResourceLibrary: React.FC<ResourceLibraryProps> = ({ onResourceClick }) => {

  const resourceCategories = [
    {
      id: 'reading',
      title: 'Reading Resources',
      icon: BookOpen,
      color: 'orange',
      description: 'Comprehensive study materials and guides',
      resources: [
        {
          title: 'E-Books',
          description: 'Official review materials, summaries, annotated guides',
          icon: BookOpen,
          count: 0
        },
        {
          title: 'PDF Study Notes',
          description: 'Topic outlines, formula sheets, law digests',
          icon: FileText,
          count: 0
        },
        {
          title: 'Condensed Review Handouts',
          description: 'One-pagers per topic for quick revision',
          icon: Download,
          count: 0
        }
      ]
    },
    {
      id: 'audio-visual',
      title: 'Audio & Visual',
      icon: Headphones,
      color: 'blue',
      description: 'Listen and watch to learn on the go',
      resources: [
        {
          title: 'Audiobooks',
          description: 'Full textbooks or condensed summaries',
          icon: Headphones,
          count: 0
        },
        {
          title: 'Lecture Recordings',
          description: 'From review centers or subject-matter experts',
          icon: Play,
          count: 0
        }
      ]
    },
    {
      id: 'practice',
      title: 'Practice Tools',
      icon: Target,
      color: 'red',
      description: 'Test your knowledge and skills',
      resources: [
        {
          title: 'Past Exam Archives',
          description: 'Complete with answer keys & detailed explanations',
          icon: Target,
          count: 0
        },
        {
          title: 'Case Study Exercises',
          description: 'Real-world applications for architecture, engineering, nursing',
          icon: Brain,
          count: 0
        }
      ]
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      icon: CreditCard,
      color: 'purple',
      description: 'Interactive flashcards for active recall learning',
      resources: [
        {
          title: 'Digital Flashcard Decks',
          description: 'Interactive flashcards with spaced repetition algorithms',
          icon: CreditCard,
          count: 0
        }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      orange: { 
        bg: 'bg-orange-100', 
        icon: 'text-orange-600', 
        border: 'border-orange-200',
        hover: 'hover:bg-orange-50'
      },
      blue: { 
        bg: 'bg-blue-100', 
        icon: 'text-blue-600', 
        border: 'border-blue-200',
        hover: 'hover:bg-blue-50'
      },
      red: { 
        bg: 'bg-red-100', 
        icon: 'text-red-600', 
        border: 'border-red-200',
        hover: 'hover:bg-red-50'
      },
      yellow: { 
        bg: 'bg-yellow-100', 
        icon: 'text-yellow-600', 
        border: 'border-yellow-200',
        hover: 'hover:bg-yellow-50'
      },
      purple: { 
        bg: 'bg-purple-100', 
        icon: 'text-purple-600', 
        border: 'border-purple-200',
        hover: 'hover:bg-purple-50'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.orange;
  };

  const handleCategoryClick = (categoryTitle: string) => {
    if (onResourceClick) {
      onResourceClick('Digital Flashcard Decks', categoryTitle);
    } else {
      console.log(`Clicked category: ${categoryTitle}`);
      alert(`Opening library for ${categoryTitle}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-orange-500 to-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mr-4">
          <BookOpen className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">BoardUp Resource Library</h2>
          <p className="text-gray-600">Comprehensive study materials for your exam preparation</p>
        </div>
      </div>

      <div className="space-y-4">
        {resourceCategories.map((category) => {
          const Icon = category.icon;
          const colors = getColorClasses(category.color);

          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.title)}
              className={`w-full flex items-center space-x-4 p-4 border ${colors.border} rounded-xl transition-all duration-200 hover:shadow-md ${colors.hover} text-left`}
            >
              <div className={`${colors.bg} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon className={`h-5 w-5 ${colors.icon}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {category.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {category.resources.length} resource types • {category.resources.reduce((total, resource) => total + resource.count, 0)} items
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick Access Summary */}
      <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl border border-gray-100">
        <div className="text-center">
          <h4 className="text-lg font-bold text-gray-900 mb-2">
            Complete Resource Collection
          </h4>
          <p className="text-gray-600 mb-4">
            Access study materials across all resource types
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">0</div>
              <div className="text-xs text-gray-600">Reading Materials</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-xs text-gray-600">Audio & Visual</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">0</div>
              <div className="text-xs text-gray-600">Practice Tools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">0</div>
              <div className="text-xs text-gray-600">Flashcards</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};