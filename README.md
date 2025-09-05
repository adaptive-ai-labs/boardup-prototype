# BoardUp - Architectural Licensure Exam Preparation Platform

A comprehensive React-based web application designed to help architecture students prepare for their licensure examinations through interactive quizzes, flashcards, and study resources.

## 🏗️ Project Overview

BoardUp is a specialized educational platform focused on architectural exam preparation. The application provides:
- Interactive quiz system with timed assessments
- Flashcard-based learning with voice commands
- Comprehensive resource library (e-books, audio/visual content)
- Progress tracking and performance analytics
- Structured course outlines based on exam requirements

## 🚀 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React useState (local state)
- **Routing**: Custom page-based routing system

## 📦 Installation & Setup

```bash
# Clone the repository
git clone [repository-url]
cd boardup

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── auth/            # Authentication components
│   ├── dashboard/       # Dashboard components
│   ├── learning/        # Learning feature components
│   ├── resources/       # Resource library components
│   ├── marketing/       # Landing page components
│   └── shared/          # Reusable components
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── hooks/               # Custom React hooks
└── assets/              # Static assets
```

## 🎯 Key Features

### ✅ Completed Features
- User registration and account setup flow
- Interactive dashboard with exam countdown
- Quiz system with multiple choice questions
- Flashcard study mode with flip animations
- Voice-controlled flashcard navigation
- Resource library with categorized content
- Responsive design for all screen sizes
- Sound effects and visual feedback
- Progress tracking for study sessions

### 🚧 In Development
- Backend API integration
- User authentication with JWT
- Data persistence and user progress
- Real-time quiz scoring
- Advanced analytics dashboard
- Payment integration for premium features

### 📋 TODO Features
- [ ] User authentication system
- [ ] Backend API integration
- [ ] Database integration (user progress, quiz results)
- [ ] Email notifications
- [ ] Premium subscription model
- [ ] Advanced analytics and reporting
- [ ] Offline mode support
- [ ] Mobile app version
- [ ] Instructor dashboard
- [ ] Content management system

## 🔧 Component Architecture

### Page Components
- `App.tsx` - Main application router and state manager
- `AccountLandingPage.tsx` - User dashboard after login
- `RegisterPage.tsx` - User registration with form validation
- `AccountSetupPage.tsx` - Profile setup after registration

### Learning Components
- `QuizLandingPage.tsx` - Quiz section main interface
- `PracticeQuizPage.tsx` - Interactive quiz with timer and scoring
- `FlashcardStudyPage.tsx` - Flashcard study mode with voice commands
- `SubtopicsQuizPage.tsx` - Quiz topic selection interface

### Resource Components
- `ResourceLibraryPage.tsx` - E-books and study materials
- `AudioVisualLibraryPage.tsx` - Video and audio content
- `PracticeToolsLibraryPage.tsx` - Practice tools hub

### Shared Components
- `Header.tsx` - Navigation bar
- `Footer.tsx` - Site footer
- `Logo.tsx` - Brand logo component

## 🎨 Design System

### Color Palette
- Primary: Purple/Pink gradients
- Secondary: Orange for highlights
- Success: Green for correct answers
- Error: Red for incorrect answers
- Neutral: Gray scale for UI elements

### Typography
- Font Family: System fonts for optimal performance
- Responsive typography with Tailwind classes
- Consistent spacing and hierarchy

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px  
- Desktop: > 1024px

## 🔊 Accessibility Features

- Voice commands for flashcard navigation
- Keyboard navigation support
- Screen reader compatible
- High contrast color schemes
- Consistent focus indicators

## 🧪 Development Guidelines

### Code Style
- TypeScript strict mode enabled
- ESLint configuration for code quality
- Consistent naming conventions
- Component-based architecture

### State Management
Currently using React's built-in state management:
- `useState` for local component state
- Props for data passing between components
- Future: Consider Redux Toolkit for complex state

### Performance Considerations
- Lazy loading for route components
- Image optimization
- Bundle size monitoring
- Efficient re-renders

## 🚀 Deployment

The application can be deployed to:
- Vercel (recommended for React apps)
- Netlify
- GitHub Pages
- Traditional hosting with static files

Build command: `npm run build`
Output directory: `dist/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper documentation
4. Add tests if applicable
5. Submit a pull request

### Commit Convention
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/updates

## 📈 Roadmap

### Phase 1 (Current)
- Complete frontend implementation
- Add comprehensive documentation
- Improve accessibility features

### Phase 2 (Next)
- Backend API development
- User authentication system
- Database integration
- Payment processing

### Phase 3 (Future)
- Mobile app development
- Advanced analytics
- AI-powered study recommendations
- Collaborative study features

## 📄 License

[Add your license information here]

## 📞 Contact

[Add contact information for support/questions]

---

Built with ❤️ for architecture students preparing for their licensure exams.