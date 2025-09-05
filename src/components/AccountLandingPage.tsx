'use client'
import React, { useState } from 'react';
import { Camera, Calendar, Clock, User } from 'lucide-react';
import { Logo } from './Logo';
import { CourseOutline } from './CourseOutline';
import { ResourceLibrary } from './ResourceLibrary';
import { ResourceLibraryPage } from './ResourceLibraryPage';
import { AudioVisualLibraryPage } from './AudioVisualLibraryPage';
import { PracticeToolsLibraryPage } from './PracticeToolsLibraryPage';
import { FlashcardsLibraryPage } from './FlashcardsLibraryPage';
import { QuizLandingPage } from './QuizLandingPage';

interface AccountLandingPageProps {
  onLogout: () => void;
}

export const AccountLandingPage: React.FC<AccountLandingPageProps> = ({ onLogout }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'resource-library' | 'audio-visual' | 'practice-tools' | 'flashcards' | 'quiz'>('dashboard');
  const [selectedResourceType, setSelectedResourceType] = useState<string>('E-Books');

  // Sample user data - this would come from your user state/database
  const userData = {
    name: "Alfred Duncan Almendral",
    course: "Architectural Licensure Exam",
    examDate: new Date('2025-06-15'), // Sample exam date - June 15, 2025
  };

  const calculateDaysLeft = (examDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate calculation
    examDate.setHours(0, 0, 0, 0); // Reset time to start of day for accurate calculation
    const timeDiff = examDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft;
  };

  const daysLeft = calculateDaysLeft(userData.examDate);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResourceClick = (resourceType: string, categoryTitle: string) => {
    // Route to specific library page based on category
    switch (categoryTitle) {
      case 'Reading Resources':
        setSelectedResourceType(resourceType);
        setCurrentView('resource-library');
        break;
      case 'Audio & Visual':
        setCurrentView('audio-visual');
        break;
      case 'Practice Tools':
        setCurrentView('practice-tools');
        break;
      case 'Flashcards':
        setCurrentView('flashcards');
        break;
      default:
        setSelectedResourceType(resourceType);
        setCurrentView('resource-library');
    }
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleStartQuiz = () => {
    setCurrentView('quiz');
  };

  const handleNavigateToResources = (topic: string, section: string) => {
    console.log(`Navigating to resources for: ${topic} in section: ${section}`);
    // Default to Reading Resources when coming from course outline
    setSelectedResourceType('E-Books');
    setCurrentView('resource-library');
  };

  const handleNavigateToQuiz = (topic: string, section: string) => {
    console.log(`Navigating to quiz for: ${topic} in section: ${section}`);
    setCurrentView('quiz');
  };

  if (currentView === 'resource-library') {
    return (
      <ResourceLibraryPage 
        onBackToDashboard={handleBackToDashboard}
        resourceType={selectedResourceType}
      />
    );
  }

  if (currentView === 'audio-visual') {
    return (
      <AudioVisualLibraryPage 
        onBackToDashboard={handleBackToDashboard}
      />
    );
  }

  if (currentView === 'practice-tools') {
    return (
      <PracticeToolsLibraryPage 
        onBackToDashboard={handleBackToDashboard}
      />
    );
  }

  if (currentView === 'flashcards') {
    return (
      <FlashcardsLibraryPage 
        onBackToDashboard={handleBackToDashboard}
      />
    );
  }

  if (currentView === 'quiz') {
    return (
      <QuizLandingPage 
        onBackToDashboard={handleBackToDashboard}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Logo />
            <button
              onClick={onLogout}
              className="text-gray-600 hover:text-orange-600 font-medium transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header Section */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-100 to-blue-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-gray-400" />
                )}
              </div>
              
              {/* Upload Button */}
              <label className="absolute bottom-2 right-2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full cursor-pointer shadow-lg transition-all duration-200 transform hover:scale-110">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* User Information */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {userData.name}!
              </h1>
              
              <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-8">
                {/* Course Info */}
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Preparing for</p>
                    <p className="font-semibold text-gray-900">{userData.course}</p>
                  </div>
                </div>

                {/* Countdown */}
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Exam Countdown</p>
                    <p className="font-bold text-xl text-orange-600">
                      {daysLeft > 0 ? `${daysLeft} days left` : 'Exam day is here!'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Preparation Progress</span>
                  <span className="text-sm font-semibold text-gray-900">0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: '0%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600">Study Sessions</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600">Hours Studied</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-3 rounded-xl">
                <User className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0%</p>
                <p className="text-sm text-gray-600">Average Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Outline Section */}
        <div className="mb-8">
          <CourseOutline 
            examType={userData.course}
            onNavigateToResources={handleNavigateToResources}
            onNavigateToQuiz={handleNavigateToQuiz}
          />
        </div>

        {/* Resource Library Section */}
        <div className="mb-8">
          <ResourceLibrary onResourceClick={handleResourceClick} />
        </div>

        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-orange-500 to-blue-600 rounded-3xl p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to continue your preparation?
          </h2>
          <p className="text-lg opacity-90 mb-6">
            You're making great progress! Let's keep the momentum going with today's study session.
          </p>
          <button 
            onClick={handleStartQuiz}
            className="bg-white text-orange-600 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Start Today's Session
          </button>
        </div>
      </div>
    </div>
  );
};