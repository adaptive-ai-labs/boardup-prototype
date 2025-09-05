import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Eye, Star, Calendar, ChevronDown, RotateCcw, CheckCircle } from 'lucide-react';
import { Logo } from './Logo';
import { FlashcardStudyPage } from './FlashcardStudyPage';

interface FlashcardsLibraryPageProps {
  onBackToDashboard: () => void;
}

export const FlashcardsLibraryPage: React.FC<FlashcardsLibraryPageProps> = ({ 
  onBackToDashboard 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentView, setCurrentView] = useState<'library' | 'study'>('library');
  const [selectedDeck, setSelectedDeck] = useState<string>('');

  const flashcardDecks = [
    {
      id: 1,
      title: 'Architectural History Key Terms',
      author: 'Design Team Philippines',
      category: 'History & Theory',
      description: 'Essential architectural terms, movements, and historical periods with definitions and examples.',
      cardCount: 120,
      rating: 4.8,
      studyCount: 3247,
      uploadDate: '2024-01-05',
      tags: ['Architectural History', 'Terminology', 'Key Concepts'],
      coverColor: 'bg-blue-500',
      type: 'history',
      difficulty: 'Medium'
    },
    {
      id: 2,
      title: 'Building Codes Quick Reference',
      author: 'Philippine Building Officials',
      category: 'Professional Practice',
      description: 'Quick reference cards for PD 1096, Fire Code, and Accessibility Law key provisions.',
      cardCount: 85,
      rating: 4.7,
      studyCount: 2156,
      uploadDate: '2024-01-12',
      tags: ['Building Codes', 'Legal Requirements', 'Quick Reference'],
      coverColor: 'bg-red-500',
      type: 'practice',
      difficulty: 'Hard'
    },
    {
      id: 3,
      title: 'Structural Systems Flashcards',
      author: 'Structural Engineers Association',
      category: 'Structural Design',
      description: 'Structural systems, load types, and connection details with visual diagrams.',
      cardCount: 95,
      rating: 4.9,
      studyCount: 1876,
      uploadDate: '2024-01-18',
      tags: ['Structural Systems', 'Load Analysis', 'Connections'],
      coverColor: 'bg-green-500',
      type: 'structural',
      difficulty: 'Hard'
    },
    {
      id: 4,
      title: 'Design Principles & Elements',
      author: 'UAP Design Committee',
      category: 'Design Theory',
      description: 'Fundamental design principles, elements, and composition rules with visual examples.',
      cardCount: 75,
      rating: 4.6,
      studyCount: 2543,
      uploadDate: '2024-01-25',
      tags: ['Design Principles', 'Visual Elements', 'Composition'],
      coverColor: 'bg-purple-500',
      type: 'design',
      difficulty: 'Medium'
    },
    {
      id: 5,
      title: 'Philippine Architecture Styles',
      author: 'Heritage Conservation Society',
      category: 'History & Theory',
      description: 'Traditional and colonial architectural styles in the Philippines with identifying features.',
      cardCount: 60,
      rating: 4.5,
      studyCount: 1432,
      uploadDate: '2024-02-01',
      tags: ['Philippine Architecture', 'Heritage', 'Traditional Styles'],
      coverColor: 'bg-orange-500',
      type: 'history',
      difficulty: 'Easy'
    },
    {
      id: 6,
      title: 'Sustainable Design Concepts',
      author: 'Green Building Council Philippines',
      category: 'Environmental Design',
      description: 'Green building principles, energy efficiency strategies, and sustainability concepts.',
      cardCount: 110,
      rating: 4.8,
      studyCount: 1987,
      uploadDate: '2024-02-08',
      tags: ['Sustainable Design', 'Green Building', 'Energy Efficiency'],
      coverColor: 'bg-green-600',
      type: 'environmental',
      difficulty: 'Medium'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Flashcard Decks', count: flashcardDecks.length },
    { id: 'history', name: 'History & Theory', count: flashcardDecks.filter(r => r.type === 'history').length },
    { id: 'practice', name: 'Professional Practice', count: flashcardDecks.filter(r => r.type === 'practice').length },
    { id: 'structural', name: 'Structural Design', count: flashcardDecks.filter(r => r.type === 'structural').length },
    { id: 'design', name: 'Design Theory', count: flashcardDecks.filter(r => r.type === 'design').length },
    { id: 'environmental', name: 'Environmental Design', count: flashcardDecks.filter(r => r.type === 'environmental').length }
  ];

  const filteredDecks = selectedCategory === 'all' 
    ? flashcardDecks 
    : flashcardDecks.filter(deck => deck.type === selectedCategory);

  const handleStudy = (deckTitle: string) => {
    setSelectedDeck(deckTitle);
    setCurrentView('study');
  };

  const handleBackToLibrary = () => {
    setCurrentView('library');
    setSelectedDeck('');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (currentView === 'study') {
    return (
      <FlashcardStudyPage 
        onBackToLibrary={handleBackToLibrary}
        deckTitle={selectedDeck}
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
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CreditCard className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Flashcards Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master key concepts with interactive flashcards and spaced repetition
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
                  className="w-full md:w-64 bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none shadow-sm"
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
                {selectedCategory === 'all' ? 'All Flashcard Decks' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <span className="text-gray-600">
                {filteredDecks.length} {filteredDecks.length === 1 ? 'deck' : 'decks'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDecks.map((deck) => (
                <div
                  key={deck.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                >
                  {/* Deck Cover */}
                  <div className="relative">
                    <div className={`${deck.coverColor} h-32 flex items-center justify-center relative overflow-hidden`}>
                      <CreditCard className="h-16 w-16 text-white opacity-20 absolute" />
                      <div className="text-center z-10">
                        <CreditCard className="h-8 w-8 text-white mx-auto mb-2" />
                        <span className="text-white font-bold text-lg">{deck.cardCount}</span>
                        <div className="text-white text-xs opacity-90">cards</div>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(deck.difficulty)}`}>
                        {deck.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Title & Author */}
                    <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
                      {deck.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">by {deck.author}</p>
                    <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full mb-3">
                      {deck.category}
                    </span>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {deck.description}
                    </p>

                    {/* Deck Stats */}
                    <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <CreditCard className="h-3 w-3" />
                        <span>{deck.cardCount} cards</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span>{deck.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{deck.studyCount}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {deck.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStudy(deck.title)}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200"
                      >
                        <CreditCard className="h-4 w-4" />
                        <span className="text-sm font-medium">Study</span>
                      </button>
                      <button
                        onClick={() => alert(`Quick review for ${deck.title}`)}
                        className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Upload Date */}
                    <div className="flex items-center space-x-1 mt-3 pt-3 border-t border-gray-100">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        Added {new Date(deck.uploadDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredDecks.length === 0 && (
              <div className="text-center py-12">
                <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No flashcard decks found</h3>
                <p className="text-gray-600">Try selecting a different category.</p>
              </div>
            )}
          </div>
        </div>

        {/* Study Tips */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-gray-100">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Flashcard Study Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-center"><strong>Active Recall:</strong> Try to answer before flipping the card</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <RotateCcw className="h-6 w-6 text-pink-600" />
                </div>
                <p className="text-center"><strong>Spaced Repetition:</strong> Review difficult cards more frequently</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-center"><strong>Regular Practice:</strong> Study a little bit every day for best results</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};