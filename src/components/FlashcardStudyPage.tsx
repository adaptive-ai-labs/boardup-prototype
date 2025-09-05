// React core imports
import React, { useState, useEffect } from 'react';

// Icon imports from Lucide React
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, Star, Volume2, VolumeX, CheckCircle, X, Shuffle, BookOpen, Trophy } from 'lucide-react';

// Shared components
import { Logo } from './Logo';

/**
 * Props interface for FlashcardStudyPage component
 */
interface FlashcardStudyPageProps {
  /** Callback to navigate back to the flashcard library */
  onBackToLibrary: () => void;
  /** Title of the current flashcard deck being studied */
  deckTitle: string;
}

/**
 * Individual flashcard data structure
 */
interface Flashcard {
  /** Unique identifier for the flashcard */
  id: number;
  /** Subject category (e.g., "Ancient Greek Architecture") */
  category: string;
  /** Front side content - the question or prompt */
  question: string;
  /** Back side content - the answer or explanation */
  answer: string;
  /** Difficulty level for progress tracking and filtering */
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

/**
 * FlashcardStudyPage - Interactive flashcard study interface with voice commands
 * 
 * A comprehensive flashcard study system featuring:
 * - 3D flip animations for card interactions
 * - Voice recognition for hands-free navigation
 * - Text-to-speech for accessibility
 * - Progress tracking with known/unknown categorization
 * - Sound effects for user feedback
 * - Shuffling and restart functionality
 * - Results summary with performance analytics
 * 
 * Key Features:
 * - Interactive card flipping with click or voice commands
 * - Voice commands: "flip", "next", "I know", "don't know", etc.
 * - Audio feedback for correct/incorrect responses
 * - Progress visualization and statistics
 * - Responsive design for all screen sizes
 * - Accessibility features (screen reader support, voice control)
 * 
 * Technical Implementation:
 * - Uses Web Speech API for voice recognition
 * - CSS transforms for 3D flip animations
 * - Web Audio API for sound generation
 * - Local state management for progress tracking
 * 
 * TODO:
 * - [ ] Save study progress to backend
 * - [ ] Implement spaced repetition algorithm
 * - [ ] Add custom deck creation functionality
 * - [ ] Sync progress across devices
 * - [ ] Add collaborative study features
 * - [ ] Implement offline mode with service workers
 * - [ ] Add keyboard shortcuts for power users
 * - [ ] Performance analytics and study recommendations
 * 
 * @component
 * @param props - Component props
 */
export const FlashcardStudyPage: React.FC<FlashcardStudyPageProps> = ({ 
  onBackToLibrary, 
  deckTitle 
}) => {
  // Sample flashcards based on your architectural history data
  const flashcards: Flashcard[] = [
    // Prehistoric Architecture
    { id: 1, category: 'Prehistoric Architecture', question: 'Stonehenge is an example of megalithic architecture, specifically a stone circle.', answer: 'Stonehenge', difficulty: 'Easy' },
    { id: 2, category: 'Prehistoric Architecture', question: 'Primary building materials in prehistoric dwellings.', answer: 'Stone, mud, wood, animal hides', difficulty: 'Easy' },
    { id: 3, category: 'Prehistoric Architecture', question: 'Large upright stones used in prehistoric monuments.', answer: 'Menhirs', difficulty: 'Medium' },
    { id: 4, category: 'Prehistoric Architecture', question: 'Prehistoric tomb with upright stones supporting a flat capstone.', answer: 'Dolmen', difficulty: 'Medium' },
    { id: 5, category: 'Prehistoric Architecture', question: 'Purpose of prehistoric cave paintings in Lascaux.', answer: 'Ritualistic and symbolic, possibly hunting magic', difficulty: 'Hard' },
    
    // Ancient Egyptian Architecture
    { id: 6, category: 'Ancient Egyptian Architecture', question: 'Oldest known pyramid in Egypt.', answer: 'Step Pyramid of Djoser, by Imhotep', difficulty: 'Medium' },
    { id: 7, category: 'Ancient Egyptian Architecture', question: 'Primary material used for Egyptian monumental architecture.', answer: 'Limestone and sandstone', difficulty: 'Easy' },
    { id: 8, category: 'Ancient Egyptian Architecture', question: 'Rows of massive columns supporting a roof.', answer: 'Hypostyle hall', difficulty: 'Medium' },
    { id: 9, category: 'Ancient Egyptian Architecture', question: 'Symbol representing a petrified ray of the sun, honoring Ra.', answer: 'Obelisk', difficulty: 'Easy' },
    { id: 10, category: 'Ancient Egyptian Architecture', question: 'Monumental gateway in Egyptian temples.', answer: 'Pylon', difficulty: 'Medium' },
    
    // Ancient Greek Architecture
    { id: 11, category: 'Ancient Greek Architecture', question: 'Three classical Greek orders.', answer: 'Doric, Ionic, Corinthian', difficulty: 'Easy' },
    { id: 12, category: 'Ancient Greek Architecture', question: 'Parthenon dedication.', answer: 'Goddess Athena', difficulty: 'Easy' },
    { id: 13, category: 'Ancient Greek Architecture', question: 'Greek order with no base, fluted shaft, simple capital.', answer: 'Doric order', difficulty: 'Medium' },
    { id: 14, category: 'Ancient Greek Architecture', question: 'Covered walkway or portico for public use.', answer: 'Stoa', difficulty: 'Medium' },
    { id: 15, category: 'Ancient Greek Architecture', question: 'Triangular space under a roof gable, often decorated.', answer: 'Pediment', difficulty: 'Medium' },
    
    // Ancient Roman Architecture
    { id: 16, category: 'Ancient Roman Architecture', question: 'Innovation allowing larger interior spaces.', answer: 'Arch and concrete', difficulty: 'Medium' },
    { id: 17, category: 'Ancient Roman Architecture', question: 'Structure transporting water to cities.', answer: 'Aqueduct', difficulty: 'Easy' },
    { id: 18, category: 'Ancient Roman Architecture', question: 'Roman amphitheater for gladiatorial games.', answer: 'Colosseum', difficulty: 'Easy' },
    { id: 19, category: 'Ancient Roman Architecture', question: 'Public building for legal and civic proceedings.', answer: 'Basilica', difficulty: 'Medium' },
    { id: 20, category: 'Ancient Roman Architecture', question: 'Roman building with large dome and central oculus.', answer: 'Pantheon', difficulty: 'Medium' },
    
    // Medieval & Gothic Architecture
    { id: 21, category: 'Medieval & Gothic Architecture', question: 'Characteristic feature of Gothic cathedrals.', answer: 'Pointed arches and flying buttresses', difficulty: 'Medium' },
    { id: 22, category: 'Medieval & Gothic Architecture', question: 'Purpose of a medieval castle.', answer: 'Defense and noble residence', difficulty: 'Easy' },
    { id: 23, category: 'Medieval & Gothic Architecture', question: 'Large circular stained glass window in Gothic churches.', answer: 'Rose window', difficulty: 'Medium' },
    { id: 24, category: 'Medieval & Gothic Architecture', question: 'Vault with intersecting ribbed arches.', answer: 'Ribbed vault', difficulty: 'Hard' },
    { id: 25, category: 'Medieval & Gothic Architecture', question: 'Style preceding Gothic architecture in Europe.', answer: 'Romanesque', difficulty: 'Medium' },
    
    // Renaissance to Baroque
    { id: 26, category: 'Renaissance to Baroque', question: 'Defining characteristic of Renaissance architecture.', answer: 'Symmetry, proportion, classical orders', difficulty: 'Medium' },
    { id: 27, category: 'Renaissance to Baroque', question: 'Designer of Florence Cathedral\'s dome.', answer: 'Filippo Brunelleschi', difficulty: 'Hard' },
    { id: 28, category: 'Renaissance to Baroque', question: 'Baroque architecture style traits.', answer: 'Dramatic light, grandeur, rich ornamentation', difficulty: 'Medium' },
    { id: 29, category: 'Renaissance to Baroque', question: 'Prime example of French Baroque palace.', answer: 'Palace of Versailles', difficulty: 'Easy' },
    { id: 30, category: 'Renaissance to Baroque', question: 'Architectural style with temple fronts and strict symmetry.', answer: 'Palladian architecture', difficulty: 'Hard' }
  ];

  // FLASHCARD STUDY STATE MANAGEMENT
  
  /** Current card position in the deck (0-based index) */
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  /** Whether the current card is showing answer side (true) or question side (false) */
  const [isFlipped, setIsFlipped] = useState(false);
  
  /** Set of card IDs that user has already studied (for progress tracking) */
  const [studiedCards, setStudiedCards] = useState<Set<number>>(new Set());
  
  /** Set of card IDs that user marked as "known" - for positive reinforcement tracking */
  const [knownCards, setKnownCards] = useState<Set<number>>(new Set());
  
  /** Set of card IDs that user marked as "unknown" - cards needing more review */
  const [unknownCards, setUnknownCards] = useState<Set<number>>(new Set());
  
  /** Whether cards have been shuffled from their original order */
  const [isShuffled, setIsShuffled] = useState(false);
  
  /** Whether sound effects are enabled for user interactions */
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  /** Whether to show final results screen instead of study interface */
  const [showResults, setShowResults] = useState(false);
  
  /** Array of card indices in current study order (allows for shuffling) */
  const [cardOrder, setCardOrder] = useState<number[]>(flashcards.map((_, index) => index));
  
  /** Whether voice commands are enabled for hands-free navigation */
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  
  /** Whether the voice recognition system is actively listening */
  const [isListening, setIsListening] = useState(false);
  
  /** Web Speech API recognition instance for voice commands */
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  const currentCard = flashcards[cardOrder[currentCardIndex]];
  const totalCards = flashcards.length;
  const studiedCount = studiedCards.size;
  const knownCount = knownCards.size;
  const unknownCount = unknownCards.size;

  // Sound effects
  const playSound = (type: 'flip' | 'correct' | 'incorrect' | 'complete') => {
    if (!soundEnabled) return;
    
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
      case 'flip':
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
        break;
      case 'correct':
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
      case 'incorrect':
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
      case 'complete':
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2);
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.4);
        gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.8);
        break;
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    playSound('flip');
    
    // Auto-read the revealed side after flip animation
    if (voiceEnabled) {
      setTimeout(() => {
        speakText(!isFlipped ? currentCard.answer : currentCard.question);
      }, 700); // Wait for flip animation to complete
    }
  };

  const handleKnown = () => {
    const cardId = currentCard.id;
    setStudiedCards(prev => new Set([...prev, cardId]));
    setKnownCards(prev => new Set([...prev, cardId]));
    setUnknownCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(cardId);
      return newSet;
    });
    playSound('correct');
    nextCard();
  };

  const handleUnknown = () => {
    const cardId = currentCard.id;
    setStudiedCards(prev => new Set([...prev, cardId]));
    setUnknownCards(prev => new Set([...prev, cardId]));
    setKnownCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(cardId);
      return newSet;
    });
    playSound('incorrect');
    
    
    nextCard();
  };

  // Removed unused startListening function since voice is handled in useEffect

  const handleVoiceCommand = (command: string) => {
    if (command.includes('flip') || command.includes('show answer') || command.includes('reveal')) {
      if (!isFlipped) handleFlip();
    } else if (command.includes('reveal and next') || command.includes('answer and next') || command.includes('show and continue')) {
      if (!isFlipped) {
        handleFlip();
        // Wait for flip animation, then speak answer and move to next
        setTimeout(() => {
          speakText(currentCard.answer);
          setTimeout(() => {
            nextCard();
          }, 3000); // Wait 3 seconds for answer to be read
        }, 700); // Wait for flip animation
      }
    } else if (command.includes('read card') || command.includes('read question') || command.includes('read this')) {
      speakText(isFlipped ? currentCard.answer : currentCard.question);
    } else if (command.includes('i know') || command.includes('correct') || command.includes('yes')) {
      if (isFlipped) handleKnown();
    } else if (command.includes("don't know") || command.includes('incorrect') || command.includes('no')) {
      if (isFlipped) handleUnknown();
    } else if (command.includes('next')) {
      nextCard();
    } else if (command.includes('previous') || command.includes('back')) {
      prevCard();
    } else if (command.includes('repeat') || command.includes('read again')) {
      speakText(isFlipped ? currentCard.answer : currentCard.question);
    } else if (isFlipped) {
      // Check if the spoken answer matches the correct answer
      const spokenAnswer = command.toLowerCase().trim();
      const correctAnswer = currentCard.answer.toLowerCase().trim();
      
      // Simple matching - check if key words from correct answer are in spoken answer
      const correctWords = correctAnswer.split(/[\s,]+/).filter(word => word.length > 2);
      const matchedWords = correctWords.filter(word => spokenAnswer.includes(word.toLowerCase()));
      
      // If more than 50% of key words match, consider it correct
      if (matchedWords.length >= Math.ceil(correctWords.length * 0.5)) {
        // Acknowledge correct answer
        speakText("Correct! Well done!");
        playSound('correct');
        handleKnown();
        
        // Auto-advance after acknowledgment
        setTimeout(() => {
          nextCard();
        }, 2000);
      } else if (spokenAnswer.length > 3) {
        // Only give feedback if they said something substantial
        speakText("Not quite right. The correct answer is: " + currentCard.answer);
        setTimeout(() => {
          handleUnknown();
        }, 1000);
      }
    }
  };

  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || voice.name.includes('Microsoft')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.9;
      
      window.speechSynthesis.speak(utterance);
    }, 300);
  };

  const nextCard = () => {
    setIsFlipped(false);
    if (currentCardIndex < totalCards - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      // Auto-read the new question
      if (voiceEnabled) {
        setTimeout(() => {
          speakText(flashcards[cardOrder[currentCardIndex + 1]].question);
        }, 300);
      }
    } else {
      // End of deck
      playSound('complete');
      setShowResults(true);
    }
  };

  const prevCard = () => {
    setIsFlipped(false);
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
      // Auto-read the previous question
      if (voiceEnabled) {
        setTimeout(() => {
          speakText(flashcards[cardOrder[currentCardIndex - 1]].question);
        }, 300);
      }
  };

  const shuffleCards = () => {
    const shuffled = [...cardOrder].sort(() => Math.random() - 0.5);
    setCardOrder(shuffled);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setIsShuffled(true);
  };

  const resetStudy = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setStudiedCards(new Set());
    setKnownCards(new Set());
    setUnknownCards(new Set());
    setShowResults(false);
    setCardOrder(flashcards.map((_, index) => index));
    setIsShuffled(false);
  };

  // Initialize speech recognition when voice is enabled
  useEffect(() => {
    if (voiceEnabled && !recognition) {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.warn('Speech recognition not supported');
        return;
      }

      const SpeechRecognition = (window as unknown as { SpeechRecognition?: typeof window.SpeechRecognition }).SpeechRecognition || (window as unknown as { webkitSpeechRecognition?: typeof window.SpeechRecognition }).webkitSpeechRecognition;
      const newRecognition = new SpeechRecognition();
      
      newRecognition.continuous = true;
      newRecognition.interimResults = false;
      newRecognition.lang = 'en-US';

      newRecognition.onstart = () => {
        setIsListening(true);
      };

      newRecognition.onresult = (event: SpeechRecognitionEvent) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        handleVoiceCommand(command);
      };

      newRecognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.log('Speech recognition error:', event.error);
        // Restart recognition after a brief delay if it stops due to error
        setTimeout(() => {
          if (voiceEnabled && newRecognition) {
            try {
              newRecognition.start();
            } catch (e) {
              console.log('Failed to restart recognition:', e);
            }
          }
        }, 1000);
      };

      newRecognition.onend = () => {
        setIsListening(false);
        // Automatically restart recognition if voice is still enabled
        if (voiceEnabled) {
          setTimeout(() => {
            try {
              newRecognition.start();
            } catch (e) {
              console.log('Failed to restart recognition:', e);
            }
          }, 500);
        }
      };

      setRecognition(newRecognition);
      
      // Start listening immediately
      try {
        newRecognition.start();
      } catch (e) {
        console.log('Failed to start recognition:', e);
      }
    } else if (!voiceEnabled && recognition) {
      // Stop and cleanup recognition when voice is disabled
      try {
        recognition.stop();
      } catch (e) {
        console.log('Failed to stop recognition:', e);
      }
      setRecognition(null);
      setIsListening(false);
    }
  }, [voiceEnabled, recognition, handleVoiceCommand]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = [
      'bg-blue-500', 'bg-purple-500', 'bg-green-500', 
      'bg-orange-500', 'bg-red-500', 'bg-indigo-500'
    ];
    const index = category.length % colors.length;
    return colors[index];
  };

  // Results Screen
  if (showResults) {
    const accuracy = totalCards > 0 ? Math.round((knownCount / totalCards) * 100) : 0;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <button
                onClick={onBackToLibrary}
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back to Library</span>
              </button>
              <Logo />
              <div className="w-32"></div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Trophy className="h-10 w-10 text-white animate-bounce" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Study Session Complete!</h1>
            <h2 className="text-xl text-purple-600 font-semibold mb-8">{deckTitle}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-2">Cards Studied</h3>
                <p className="text-3xl font-bold text-purple-600">{studiedCount}</p>
                <p className="text-gray-600 text-sm">out of {totalCards}</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-2">Known Cards</h3>
                <p className="text-3xl font-bold text-green-600">{knownCount}</p>
                <p className="text-gray-600 text-sm">{accuracy}% accuracy</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-2">Need Review</h3>
                <p className="text-3xl font-bold text-red-600">{unknownCount}</p>
                <p className="text-gray-600 text-sm">cards to review</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetStudy}
                className="flex items-center justify-center space-x-2 px-8 py-3 border-2 border-purple-500 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-200 transform hover:scale-105"
              >
                <RotateCcw className="h-5 w-5" />
                <span>Study Again</span>
              </button>
              <button
                onClick={onBackToLibrary}
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Back to Library
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={onBackToLibrary}
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Library</span>
            </button>
            <Logo />
            <div className="flex items-center space-x-4">
              <button
                onClick={shuffleCards}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isShuffled ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <Shuffle className="h-5 w-5" />
              </button>
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
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  voiceEnabled ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
            
            {/* Voice Commands for Navigation */}
            {voiceEnabled && (
              <div className="text-center">
                <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    🎤 Voice Commands {isListening ? '(Listening...)' : '(Ready)'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800">
                    <div>• "Flip" - Show answer</div>
                    <div>• "Reveal and next" - Show answer + auto-next</div>
                    <div>• "Read card" - Read current text</div>
                    <div>• Say the answer - Get feedback</div>
                    <div>• "I know" / "Don't know" - Mark card</div>
                    <div>• "Next" / "Previous" - Navigate</div>
                    <div>• "Repeat" - Read current text again</div>
                  </div>
                </div>
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium ${
                  isListening ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span>{isListening ? 'Always Listening...' : 'Voice Ready'}</span>
                </div>
              </div>
            )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">{deckTitle}</h2>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentCard.difficulty)}`}>
                {currentCard.difficulty}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Card {currentCardIndex + 1} of {totalCards}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(((currentCardIndex + 1) / totalCards) * 100)}% Complete
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentCardIndex + 1) / totalCards) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="perspective-1000 mb-6">
          <div 
            className={`relative w-full h-96 transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={handleFlip}
          >
            {/* Front of card */}
            <div className="absolute inset-0 w-full h-full backface-hidden">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getCategoryColor(currentCard.category)}`}>
                      {currentCard.category}
                    </span>
                    <BookOpen className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-xl font-medium text-gray-900 text-center leading-relaxed">
                      {currentCard.question}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">Click to reveal answer</p>
                  <div className="w-12 h-1 bg-purple-200 rounded-full mx-auto"></div>
                </div>
              </div>
            </div>

            {/* Back of card */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl p-8 h-full flex flex-col justify-between text-white">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full bg-white bg-opacity-20 text-white text-sm font-medium">
                      Answer
                    </span>
                    <Star className="h-6 w-6 text-white opacity-80" />
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-2xl font-bold text-center leading-relaxed">
                      {currentCard.answer}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-white opacity-80 mb-2">Did you know this?</p>
                  <div className="w-12 h-1 bg-white bg-opacity-30 rounded-full mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          {isFlipped ? (
            // Answer buttons
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleUnknown}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all duration-200 transform hover:scale-105"
              >
                <X className="h-5 w-5" />
                <span>Don't Know</span>
              </button>
              <button
                onClick={handleKnown}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all duration-200 transform hover:scale-105"
              >
                <CheckCircle className="h-5 w-5" />
                <span>I Know This</span>
              </button>
            </div>
          ) : (
            // Navigation buttons
            <div className="flex items-center justify-between">
              <button
                onClick={prevCard}
                disabled={currentCardIndex === 0}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  currentCardIndex === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 transform hover:scale-105'
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Progress</p>
                <div className="flex items-center space-x-4 text-xs">
                  <span className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Known: {knownCount}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Review: {unknownCount}</span>
                  </span>
                </div>
              </div>

              <button
                onClick={nextCard}
                disabled={currentCardIndex === totalCards - 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  currentCardIndex === totalCards - 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-purple-500 text-white hover:bg-purple-600 transform hover:scale-105'
                }`}
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};