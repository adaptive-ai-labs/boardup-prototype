# BoardUp - Architectural Licensure Exam Preparation Platform

A comprehensive Next.js application designed to help architecture students prepare for their licensure examinations through interactive quizzes, flashcards, and study resources.

## 🏗️ Project Overview

BoardUp is a specialized educational platform focused on architectural exam preparation. The application provides:
- Interactive quiz system with timed assessments
- Flashcard-based learning with voice commands
- Comprehensive resource library (e-books, audio/visual content)
- Progress tracking and performance analytics
- Structured course outlines based on exam requirements

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React useState (local state)
- **Routing**: Next.js App Router with file-based routing

## 📦 Installation & Setup

```bash
# Clone the repository
git clone [repository-url]
cd boardup-prototype

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   ├── register/        # Registration page
│   ├── setup/           # Account setup page
│   ├── dashboard/       # User dashboard
│   └── contact/         # Contact page
├── components/          # Reusable React components
│   ├── auth/            # Authentication components
│   ├── dashboard/       # Dashboard components
│   ├── learning/        # Learning feature components
│   ├── resources/       # Resource library components
│   └── marketing/       # Landing page components
└── public/              # Static assets
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

### Page Components (Next.js App Router)
- `src/app/page.tsx` - Landing page
- `src/app/register/page.tsx` - User registration page
- `src/app/setup/page.tsx` - Account setup page
- `src/app/dashboard/page.tsx` - User dashboard
- `src/app/contact/page.tsx` - Contact form page

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
- Future: Consider Zustand or React Query for complex state

### Performance Considerations
- Next.js automatic code splitting
- Server-side rendering (SSR) ready
- Image optimization with Next.js Image component
- Bundle size monitoring with built-in analyzer

## 🚀 Deployment

The application can be deployed to:
- **Vercel** (recommended for Next.js apps) - Zero configuration deployment
- **Netlify** with Next.js build plugin
- **Railway** or **DigitalOcean** for self-hosted deployments
- Any Node.js hosting provider

Build command: `npm run build`
Start command: `npm run start`
Output directory: `.next/`

### Quick Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

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