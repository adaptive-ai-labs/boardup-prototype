import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Target, CheckCircle, X, RotateCcw, Trophy, BookOpen, Volume2, VolumeX, Zap, Star, Sparkles } from 'lucide-react';
import { Logo } from './Logo';

interface PracticeQuizPageProps {
  onBackToQuiz: () => void;
  subtopicTitle: string;
  sectionTitle: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  imageUrl?: string;
}

export const PracticeQuizPage: React.FC<PracticeQuizPageProps> = ({ 
  onBackToQuiz, 
  subtopicTitle, 
  sectionTitle 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questionCount, setQuestionCount] = useState(10);
  const [timeLimit, setTimeLimit] = useState(10); // in minutes
  const [initialTimeLimit, setInitialTimeLimit] = useState(600); // in seconds
  const [showExplanation, setShowExplanation] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [streak, setStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [questionAnimation, setQuestionAnimation] = useState('');
  const [scoreAnimation, setScoreAnimation] = useState('');

  // Sample questions for Pre-historic Architecture
  const questions: Question[] = [
    {
      id: 1,
      question: "What is the most famous example of Neolithic architecture?",
      options: [
        "Stonehenge",
        "Pyramids of Giza",
        "Parthenon",
        "Colosseum"
      ],
      correctAnswer: 0,
      explanation: "Stonehenge is the most famous example of Neolithic architecture, built around 3100-2000 BCE in England. It represents early human attempts at monumental stone construction.",
      difficulty: 'Easy',
      imageUrl: "https://images.pexels.com/photos/161798/stonehenge-england-prehistoric-monument-161798.jpeg"
    },
    {
      id: 2,
      question: "Which material was primarily used in prehistoric cave dwellings?",
      options: [
        "Wood and thatch",
        "Natural rock formations",
        "Mud bricks",
        "Stone blocks"
      ],
      correctAnswer: 1,
      explanation: "Prehistoric humans primarily used natural rock formations and caves for shelter, modifying them as needed. This was the earliest form of human architecture.",
      difficulty: 'Easy',
      imageUrl: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg"
    },
    {
      id: 3,
      question: "What architectural innovation is associated with the Neolithic period?",
      options: [
        "The arch",
        "Post and lintel construction",
        "The dome",
        "Flying buttresses"
      ],
      correctAnswer: 1,
      explanation: "Post and lintel construction was a major architectural innovation of the Neolithic period, seen in structures like Stonehenge and other megalithic monuments.",
      difficulty: 'Medium',
      imageUrl: "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg"
    },
    {
      id: 4,
      question: "Çatalhöyük is an important prehistoric site located in which modern country?",
      options: [
        "Greece",
        "Egypt",
        "Turkey",
        "Iraq"
      ],
      correctAnswer: 2,
      explanation: "Çatalhöyük is located in modern-day Turkey and is one of the world's first urban settlements, dating to around 7500 BCE. It shows early examples of planned community architecture.",
      difficulty: 'Medium',
      imageUrl: "https://images.pexels.com/photos/7919/pexels-photo.jpg"
    },
    {
      id: 5,
      question: "What was the primary purpose of megalithic structures like dolmens?",
      options: [
        "Residential housing",
        "Religious ceremonies",
        "Burial chambers",
        "Defensive fortifications"
      ],
      correctAnswer: 2,
      explanation: "Dolmens and other megalithic structures were primarily used as burial chambers or tombs. They represent early monumental architecture dedicated to honoring the dead.",
      difficulty: 'Hard',
      imageUrl: "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg"
    },
    {
      id: 6,
      question: "Which prehistoric period saw the first permanent settlements?",
      options: [
        "Paleolithic",
        "Mesolithic",
        "Neolithic",
        "Bronze Age"
      ],
      correctAnswer: 2,
      explanation: "The Neolithic period (New Stone Age) saw the development of agriculture and the first permanent settlements, marking a shift from nomadic to sedentary lifestyles.",
      difficulty: 'Medium',
      imageUrl: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg"
    },
    {
      id: 7,
      question: "What is a 'henge' in prehistoric architecture?",
      options: [
        "A type of burial mound",
        "A circular earthwork enclosure",
        "A stone dwelling",
        "A wooden palisade"
      ],
      correctAnswer: 1,
      explanation: "A henge is a circular or oval earthwork enclosure, often containing stone circles or other monuments. Stonehenge is the most famous example.",
      difficulty: 'Hard',
      imageUrl: "https://images.pexels.com/photos/161798/stonehenge-england-prehistoric-monument-161798.jpeg"
    },
    {
      id: 8,
      question: "Which construction technique was NOT used in prehistoric architecture?",
      options: [
        "Dry stone walling",
        "Timber framing",
        "Mortared masonry",
        "Earth and turf construction"
      ],
      correctAnswer: 2,
      explanation: "Mortared masonry was not used in prehistoric architecture. Prehistoric builders used dry stone walling, timber framing, and earth construction without mortar.",
      difficulty: 'Medium',
      imageUrl: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg"
    },
    {
      id: 9,
      question: "What does the term 'megalith' literally mean?",
      options: [
        "Ancient stone",
        "Large stone",
        "Sacred stone",
        "Carved stone"
      ],
      correctAnswer: 1,
      explanation: "Megalith literally means 'large stone' from the Greek words 'mega' (large) and 'lithos' (stone). It refers to prehistoric monuments made of large stone blocks.",
      difficulty: 'Easy',
      imageUrl: "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg"
    },
    {
      id: 10,
      question: "Which feature is characteristic of Skara Brae in Scotland?",
      options: [
        "Stone circle arrangement",
        "Underground passages",
        "Built-in stone furniture",
        "Defensive walls"
      ],
      correctAnswer: 2,
      explanation: "Skara Brae is famous for its well-preserved Neolithic houses with built-in stone furniture, including beds, dressers, and hearths, dating to around 3200 BCE.",
      difficulty: 'Hard',
      imageUrl: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg"
    }
  ];

  // Get subset of questions based on selected count
  const selectedQuestions = questions.slice(0, questionCount);
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const totalQuestions = selectedQuestions.length;

  // Timer effect
  const handleFinishQuiz = () => {
    setShowResults(true);
    playSound('complete');
    const score = calculateScoreDetails();
    if (score.correct >= 8) {
      triggerConfetti();
    }
  };

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleFinishQuiz();
    }
  }, [timeLeft, quizStarted, showResults, handleFinishQuiz]);

  // Sound effects
  const playSound = (type: 'correct' | 'incorrect' | 'complete' | 'tick') => {
    if (!soundEnabled) return;
    
    // Create audio context for sound effects
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
      case 'correct':
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
        break;
      case 'incorrect':
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
        oscillator.frequency.setValueAtTime(196, audioContext.currentTime + 0.2); // G3
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
        break;
      case 'complete':
        // Victory fanfare
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.4); // G5
        oscillator.frequency.setValueAtTime(1046.5, audioContext.currentTime + 0.6); // C6
        gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
        break;
      case 'tick':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
        break;
    }
  };

  // Confetti animation
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartQuiz = () => {
    const timeInSeconds = timeLimit * 60;
    setTimeLeft(timeInSeconds);
    setInitialTimeLimit(timeInSeconds);
    setQuizStarted(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerIndex
    }));
    
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    // Play sound effect
    playSound(isCorrect ? 'correct' : 'incorrect');
    
    // Update streak
    if (isCorrect) {
      setStreak(prev => prev + 1);
      if (streak + 1 >= 3) {
        triggerConfetti();
      }
    } else {
      setStreak(0);
    }
    
    // Trigger animation
    setQuestionAnimation(isCorrect ? 'animate-bounce' : 'animate-shake');
    setTimeout(() => setQuestionAnimation(''), 600);
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    playSound('tick');
    setQuestionAnimation('animate-slide-left');
    
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowExplanation(false);
      }
      setQuestionAnimation('animate-slide-right');
      setTimeout(() => setQuestionAnimation(''), 300);
    }, 150);
  };

  const handlePreviousQuestion = () => {
    playSound('tick');
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };


  
  const calculateScoreDetails = () => {
    let correct = 0;
    selectedQuestions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: totalQuestions, percentage: Math.round((correct / totalQuestions) * 100) };
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setTimeLeft(initialTimeLimit);
    setQuizStarted(false);
    setStreak(0);
    setShowConfetti(false);
    setQuestionAnimation('');
    setScoreAnimation('');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Quiz Start Screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="bg-gradient-to-r from-orange-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Target className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Practice Quiz</h1>
            <h2 className="text-xl text-orange-600 font-semibold mb-2">{subtopicTitle}</h2>
            <p className="text-gray-600 mb-8">{sectionTitle}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Question Count Selection */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center justify-center mb-3">
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Questions</h3>
                <select
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full text-2xl font-bold text-orange-600 bg-transparent border-none focus:outline-none text-center cursor-pointer"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
              
              {/* Time Limit Selection */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center justify-center mb-3">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Time Limit</h3>
                <select
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  className="w-full text-2xl font-bold text-blue-600 bg-transparent border-none focus:outline-none text-center cursor-pointer"
                >
                  <option value={5}>5 mins</option>
                  <option value={10}>10 mins</option>
                  <option value={15}>15 mins</option>
                  <option value={20}>20 mins</option>
                  <option value={30}>30 mins</option>
                  <option value={45}>45 mins</option>
                  <option value={60}>1 hour</option>
                  <option value={90}>1.5 hours</option>
                  <option value={120}>2 hours</option>
                  <option value={180}>3 hours</option>
                </select>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center justify-center mb-3">
                  <Trophy className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Passing Score</h3>
                <p className="text-2xl font-bold text-red-600">70%</p>
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              className="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (showResults) {
    const score = calculateScoreDetails();
    const passed = score.percentage >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className={`bg-white rounded-3xl shadow-lg border border-gray-100 p-12 text-center transition-all duration-500 ${scoreAnimation}`}>
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 ${
              passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <Trophy className={`h-10 w-10 ${passed ? 'text-green-600 animate-bounce' : 'text-red-600'}`} />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">
              {passed ? '🎉 Congratulations!' : 'Quiz Complete!'}
            </h1>
            <h2 className="text-xl text-orange-600 font-semibold mb-8">{subtopicTitle}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-xl transform hover:scale-105 transition-all duration-200">
                <h3 className="font-bold text-gray-900 mb-2">Your Score</h3>
                <p className={`text-3xl font-bold ${getScoreColor(score.percentage)} animate-pulse`}>
                  {score.percentage}%
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {score.correct} out of {score.total} correct
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl transform hover:scale-105 transition-all duration-200">
                <h3 className="font-bold text-gray-900 mb-2">Time Used</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {formatTime(600 - timeLeft)}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  out of {formatTime(initialTimeLimit)}
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl transform hover:scale-105 transition-all duration-200">
                <h3 className="font-bold text-gray-900 mb-2">Result</h3>
                <p className={`text-2xl font-bold ${passed ? 'text-green-600 animate-bounce' : 'text-red-600'}`}>
                  {passed ? 'PASSED' : 'FAILED'}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {passed ? 'Great job!' : 'Keep studying!'}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl mb-8 animate-fade-in">
              <h3 className="font-bold text-gray-900 mb-4">Question Review</h3>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {selectedQuestions.map((question, index) => {
                  const isCorrect = selectedAnswers[question.id] === question.correctAnswer;
                  const wasAnswered = selectedAnswers[question.id] !== undefined;
                  
                  return (
                    <div
                      key={question.id}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-200 hover:scale-110 ${
                        !wasAnswered 
                          ? 'bg-gray-300 text-gray-600' 
                          : isCorrect 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                      }`}
                    >
                      {index + 1}
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Correct</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Incorrect</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <span>Unanswered</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRestartQuiz}
                className="flex items-center justify-center space-x-2 px-8 py-3 border-2 border-orange-500 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-200 transform hover:scale-105"
              >
                <RotateCcw className="h-5 w-5" />
                <span>Retake Quiz</span>
              </button>
              <button
                onClick={onBackToQuiz}
                className="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Back to Quiz Library
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  ['bg-orange-400', 'bg-blue-400', 'bg-red-400', 'bg-yellow-400', 'bg-green-400', 'bg-purple-400'][
                    Math.floor(Math.random() * 6)
                  ]
                }`}
                style={{
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            </div>
          ))}
        </div>
      )}
      
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={onBackToQuiz}
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Exit Quiz</span>
            </button>
            <Logo />
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <span className={`font-mono text-lg ${timeLeft < 60 ? 'text-red-500 animate-pulse' : ''}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {soundEnabled ? (
                  <Volume2 className="h-5 w-5 text-gray-600" />
                ) : (
                  <VolumeX className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Streak Counter */}
        {streak > 0 && (
          <div className="fixed top-24 right-8 z-40 animate-bounce">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span className="font-bold">{streak} Streak!</span>
              {streak >= 5 && <Sparkles className="h-4 w-4 animate-spin" />}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6 transition-all duration-300 ${questionAnimation}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">{subtopicTitle}</h2>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
                {currentQuestion.difficulty}
              </span>
              {streak >= 3 && (
                <div className="flex items-center space-x-1 text-orange-500 animate-pulse">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-bold">On Fire!</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% Complete
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-orange-500 to-blue-600 h-3 rounded-full transition-all duration-500 relative"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            >
              <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-6 transition-all duration-300 ${questionAnimation}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-6 leading-relaxed">
            {currentQuestion.question}
          </h3>
          
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion.id] === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showAnswerState = showExplanation && selectedAnswers[currentQuestion.id] !== undefined;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-102 ${
                    showAnswerState
                      ? isCorrect
                        ? 'border-green-500 bg-green-50 text-green-700 animate-pulse'
                        : isSelected
                          ? 'border-red-500 bg-red-50 text-red-700 animate-shake'
                          : 'border-gray-200 bg-gray-100 text-gray-500'
                      : isSelected
                        ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-lg'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      showAnswerState
                        ? isCorrect
                          ? 'border-green-500 bg-green-500'
                          : isSelected
                            ? 'border-red-500 bg-red-500'
                            : 'border-gray-300 bg-gray-200'
                        : isSelected
                          ? 'border-orange-500 bg-orange-500'
                          : 'border-gray-300'
                    }`}>
                      {showAnswerState ? (
                        isCorrect ? (
                          <CheckCircle className="h-4 w-4 text-white" />
                        ) : isSelected ? (
                          <X className="h-4 w-4 text-white" />
                        ) : null
                      ) : (
                        isSelected && <CheckCircle className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                    {showAnswerState && isCorrect && (
                      <span className="ml-auto text-green-600 font-semibold text-sm flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-current" />
                        <span>Correct Answer</span>
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation Section */}
          {showExplanation && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl animate-fade-in">
              <div className="flex flex-col space-y-4">
                {/* Image */}
                {currentQuestion.imageUrl && (
                  <div className="w-full">
                    <img
                      src={currentQuestion.imageUrl}
                      alt={`Illustration for: ${currentQuestion.question}`}
                      className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                {/* Explanation Text */}
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Explanation</h4>
                    <p className="text-blue-800 text-sm leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition-all duration-300">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                currentQuestionIndex === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-4">
              {currentQuestionIndex === totalQuestions - 1 ? (
                <button
                  onClick={handleFinishQuiz}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl animate-pulse"
                >
                  Finish Quiz
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                   disabled={!showExplanation}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 transform hover:scale-105 ${
                    !showExplanation
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-orange-500 to-blue-600 text-white hover:from-orange-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  <span>Next</span>
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};