import React, { useState } from 'react';
import { ArrowLeft, Headphones, Play, Clock, Star, Calendar, ChevronDown, Volume2 } from 'lucide-react';
import { Logo } from './Logo';

interface AudioVisualLibraryPageProps {
  onBackToDashboard: () => void;
}

export const AudioVisualLibraryPage: React.FC<AudioVisualLibraryPageProps> = ({ 
  onBackToDashboard 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const audioVisualResources = [
    {
      id: 1,
      title: 'Architectural History Audiobook Series',
      author: 'Dr. Maria Santos',
      category: 'Audiobooks',
      description: 'Complete audio guide covering Philippine and world architectural history with detailed narration.',
      duration: '8 hours 45 mins',
      rating: 4.7,
      playCount: 1247,
      uploadDate: '2024-01-15',
      tags: ['Architectural History', 'Philippine Architecture', 'Audio Learning'],
      coverColor: 'bg-blue-500',
      type: 'audiobook'
    },
    {
      id: 2,
      title: 'Building Codes and Standards Lecture Series',
      author: 'Engr. Juan Dela Cruz',
      category: 'Lecture Recordings',
      description: 'Comprehensive lecture series on Philippine building codes, fire safety, and accessibility standards.',
      duration: '12 hours 30 mins',
      rating: 4.8,
      playCount: 892,
      uploadDate: '2024-02-03',
      tags: ['Building Codes', 'Fire Safety', 'Accessibility'],
      coverColor: 'bg-red-500',
      type: 'lecture'
    },
    {
      id: 3,
      title: 'Structural Design Fundamentals Audio Course',
      author: 'Prof. Anna Reyes',
      category: 'Audiobooks',
      description: 'Audio course covering structural analysis, foundation design, and seismic considerations.',
      duration: '6 hours 20 mins',
      rating: 4.6,
      playCount: 1156,
      uploadDate: '2024-01-28',
      tags: ['Structural Design', 'Foundation', 'Seismic Design'],
      coverColor: 'bg-green-500',
      type: 'audiobook'
    },
    {
      id: 4,
      title: 'Architectural Practice Management Webinar',
      author: 'UAP Professional Practice Committee',
      category: 'Lecture Recordings',
      description: 'Recorded webinar on business aspects of architectural practice, client relations, and project management.',
      duration: '3 hours 15 mins',
      rating: 4.5,
      playCount: 743,
      uploadDate: '2024-02-10',
      tags: ['Practice Management', 'Business', 'Client Relations'],
      coverColor: 'bg-purple-500',
      type: 'lecture'
    },
    {
      id: 5,
      title: 'Sustainable Architecture Audio Guide',
      author: 'Green Building Council Philippines',
      category: 'Audiobooks',
      description: 'Audio guide to green building principles, energy efficiency, and sustainable design practices.',
      duration: '5 hours 40 mins',
      rating: 4.9,
      playCount: 2341,
      uploadDate: '2024-01-10',
      tags: ['Green Building', 'Sustainability', 'Energy Efficiency'],
      coverColor: 'bg-green-600',
      type: 'audiobook'
    },
    {
      id: 6,
      title: 'Construction Methods and Materials Podcast',
      author: 'Philippine Institute of Civil Engineers',
      category: 'Lecture Recordings',
      description: 'Podcast series discussing modern construction methods, materials, and quality control practices.',
      duration: '4 hours 55 mins',
      rating: 4.4,
      playCount: 1876,
      uploadDate: '2024-01-18',
      tags: ['Construction Methods', 'Materials', 'Quality Control'],
      coverColor: 'bg-orange-500',
      type: 'lecture'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Audio & Visual', count: audioVisualResources.length },
    { id: 'audiobooks', name: 'Audiobooks', count: audioVisualResources.filter(r => r.type === 'audiobook').length },
    { id: 'lectures', name: 'Lecture Recordings', count: audioVisualResources.filter(r => r.type === 'lecture').length }
  ];

  const filteredResources = selectedCategory === 'all' 
    ? audioVisualResources 
    : audioVisualResources.filter(resource => 
        (selectedCategory === 'audiobooks' && resource.type === 'audiobook') ||
        (selectedCategory === 'lectures' && resource.type === 'lecture')
      );

  const handlePlay = (resourceTitle: string) => {
    alert(`Playing: ${resourceTitle}\n\nThis is a demo - actual audio playback functionality would be implemented here.`);
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
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Headphones className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Audio & Visual Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Listen and learn on the go with audiobooks and lecture recordings
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
                  className="w-full md:w-64 bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none shadow-sm"
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
                {selectedCategory === 'all' ? 'All Audio & Visual' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <span className="text-gray-600">
                {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                >
                  {/* Resource Cover & Title */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`${resource.coverColor} w-16 h-20 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}>
                      {resource.type === 'audiobook' ? (
                        <Volume2 className="h-8 w-8 text-white" />
                      ) : (
                        <Play className="h-8 w-8 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">by {resource.author}</p>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
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
                      <Clock className="h-3 w-3" />
                      <span>{resource.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>{resource.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Play className="h-3 w-3" />
                      <span>{resource.playCount}</span>
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
                      onClick={() => handlePlay(resource.title)}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                      <Play className="h-4 w-4" />
                      <span className="text-sm font-medium">Play</span>
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
              ))}
            </div>

            {/* Empty State */}
            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <Headphones className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No audio resources found</h3>
                <p className="text-gray-600">Try selecting a different category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};