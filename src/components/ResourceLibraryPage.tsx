import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Eye, Star, Calendar, ChevronDown, Download } from 'lucide-react';
import { Logo } from './Logo';

interface ResourceLibraryPageProps {
  onBackToDashboard: () => void;
  resourceType?: string;
}

export const ResourceLibraryPage: React.FC<ResourceLibraryPageProps> = ({ 
  onBackToDashboard, 
  resourceType = 'E-Books' 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const sampleBooks = [
    {
      id: 1,
      title: 'DK CHing Visual Dictionary of Architecture',
      author: 'Francis D.K. Ching',
      category: 'Theory & Design',
      description: 'Comprehensive visual guide to architectural terms, concepts, and principles with detailed illustrations.',
      pages: 319,
      rating: 4.8,
      downloadCount: 1247,
      uploadDate: '2024-01-15',
      tags: ['Architecture Theory', 'Visual Guide', 'Reference'],
      coverColor: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Architectural Practice (Philippine Edition)',
      author: 'UAP Professional Practice Commission',
      category: 'History Theory and Design',
      description: 'Essential guide to architectural practice in the Philippines, covering legal, ethical, and business aspects.',
      pages: 456,
      rating: 4.6,
      downloadCount: 892,
      uploadDate: '2024-02-03',
      tags: ['Philippine Practice', 'Professional Ethics', 'Business'],
      coverColor: 'bg-orange-500'
    },
    {
      id: 3,
      title: 'Simplified Construction Estimates',
      author: 'Max B. Fajardo Jr.',
      category: 'Construction & Estimation',
      description: 'Practical guide to construction cost estimation with Philippine construction standards and practices.',
      pages: 284,
      rating: 4.7,
      downloadCount: 1156,
      uploadDate: '2024-01-28',
      tags: ['Cost Estimation', 'Construction', 'Philippine Standards'],
      coverColor: 'bg-red-500'
    },
    {
      id: 4,
      title: 'History of Architecture',
      author: 'Sir Banister Fletcher',
      category: 'History Theory and Design',
      description: 'Classic comprehensive survey of world architecture from ancient times to the modern era.',
      pages: 1624,
      rating: 4.9,
      downloadCount: 2341,
      uploadDate: '2024-01-10',
      tags: ['Architectural History', 'World Architecture', 'Classic Text'],
      coverColor: 'bg-green-500'
    }
  ];

  const philippineCodes = [
    {
      id: 5,
      title: 'PD. 1096 National Building Code of the Philippines',
      author: 'Department of Public Works and Highways',
      category: 'Professional Practice',
      description: 'Comprehensive building code governing construction standards, safety requirements, and building regulations in the Philippines.',
      pages: 156,
      rating: 4.8,
      downloadCount: 3245,
      uploadDate: '2024-01-05',
      tags: ['Building Code', 'Philippine Standards', 'Construction Law'],
      coverColor: 'bg-purple-500'
    },
    {
      id: 6,
      title: 'RA 9514 Fire Code',
      author: 'Bureau of Fire Protection',
      category: 'Professional Practice',
      description: 'Fire safety code establishing fire prevention and protection standards for buildings and structures in the Philippines.',
      pages: 89,
      rating: 4.7,
      downloadCount: 2156,
      uploadDate: '2024-01-12',
      tags: ['Fire Safety', 'Building Code', 'Safety Standards'],
      coverColor: 'bg-red-600'
    },
    {
      id: 7,
      title: 'BP 544 Accessibility Law',
      author: 'National Council on Disability Affairs',
      category: 'Professional Practice',
      description: 'Accessibility law ensuring equal access for persons with disabilities in buildings and public spaces.',
      pages: 45,
      rating: 4.6,
      downloadCount: 1876,
      uploadDate: '2024-01-18',
      tags: ['Accessibility', 'Universal Design', 'Philippine Law'],
      coverColor: 'bg-blue-600'
    },
    {
      id: 8,
      title: 'BP 220 Economic and Socialized Housing',
      author: 'Housing and Urban Development Coordinating Council',
      category: 'Professional Practice',
      description: 'Law promoting economic and socialized housing development for low and middle-income families.',
      pages: 67,
      rating: 4.5,
      downloadCount: 1432,
      uploadDate: '2024-01-25',
      tags: ['Housing Law', 'Social Housing', 'Economic Housing'],
      coverColor: 'bg-yellow-600'
    },
    {
      id: 9,
      title: 'PD 957 Subdivision and Condominium Law',
      author: 'Housing and Land Use Regulatory Board',
      category: 'Professional Practice',
      description: 'Regulatory framework for subdivision and condominium development, sales, and management in the Philippines.',
      pages: 78,
      rating: 4.7,
      downloadCount: 1987,
      uploadDate: '2024-02-01',
      tags: ['Real Estate Law', 'Subdivision', 'Condominium'],
      coverColor: 'bg-indigo-500'
    },
    {
      id: 10,
      title: 'Philippines Green Building Code',
      author: 'Department of Energy',
      category: 'Construction & Estimation',
      description: 'Green building standards promoting energy efficiency, environmental sustainability, and resource conservation.',
      pages: 124,
      rating: 4.8,
      downloadCount: 2543,
      uploadDate: '2024-02-08',
      tags: ['Green Building', 'Sustainability', 'Energy Efficiency'],
      coverColor: 'bg-green-600'
    }
  ];

  const allBooks = [...sampleBooks, ...philippineCodes];

  const categories = [
    { id: 'all', name: 'All Books', count: sampleBooks.length },
    { id: 'theory', name: 'History Theory and Design', count: 3 },
    { id: 'practice', name: 'Professional Practice', count: 6 },
    { id: 'construction', name: 'Construction & Estimation', count: 2 }
  ];

  // Update category counts
  categories[0].count = allBooks.length; // All Books

  const filteredBooks = selectedCategory === 'all' 
    ? allBooks 
    : allBooks.filter(book => 
        book.category.toLowerCase().includes(selectedCategory) ||
        (selectedCategory === 'theory' && book.category.includes('History Theory and Design')) ||
        (selectedCategory === 'practice' && book.category.includes('Practice')) ||
        (selectedCategory === 'construction' && book.category.includes('Construction'))
      );


  const handlePreview = (bookTitle: string) => {
    alert(`Opening preview for: ${bookTitle}\n\nThis is a demo - actual preview functionality would be implemented here.`);
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
          <div className="bg-gradient-to-r from-orange-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {resourceType} Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access comprehensive study materials for your Architectural Licensure Exam preparation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Books Grid */}
          <div className="lg:col-span-4">
            {/* Category Dropdown */}
            <div className="mb-6">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full md:w-64 bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none shadow-sm"
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
                {selectedCategory === 'all' ? 'All Books' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <span className="text-gray-600">
                {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                >
                  {/* Book Cover & Title */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`${book.coverColor} w-16 h-20 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {book.category}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {book.description}
                  </p>

                  {/* Book Stats */}
                  <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-3 w-3" />
                      <span>{book.pages} pages</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>{book.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="h-3 w-3" />
                      <span>{book.downloadCount}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {book.tags.map((tag, index) => (
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
                      onClick={() => handlePreview(book.title)}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="text-sm font-medium">Preview</span>
                    </button>
                  </div>

                  {/* Upload Date */}
                  <div className="flex items-center space-x-1 mt-3 pt-3 border-t border-gray-100">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      Added {new Date(book.uploadDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredBooks.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
                <p className="text-gray-600">Try selecting a different category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};