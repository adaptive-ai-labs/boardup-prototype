# Contributing to BoardUp

Thank you for your interest in contributing to BoardUp! This document provides guidelines and information for contributors to help maintain code quality and project consistency.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Component Guidelines](#component-guidelines)
6. [Testing Guidelines](#testing-guidelines)
7. [Documentation Standards](#documentation-standards)
8. [Pull Request Process](#pull-request-process)
9. [Issue Reporting](#issue-reporting)
10. [Release Process](#release-process)

## Code of Conduct

### Our Standards

- **Be Respectful**: Treat all contributors with respect and professionalism
- **Be Collaborative**: Work together to improve the project for everyone
- **Be Constructive**: Provide helpful feedback and suggestions
- **Be Patient**: Remember that everyone has different experience levels

### Unacceptable Behavior

- Harassment or discrimination of any kind
- Trolling, insulting, or derogatory comments
- Public or private harassment
- Publishing others' private information without permission

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git for version control
- Code editor (VS Code recommended)

### Development Setup

1. **Fork and Clone Repository**
   ```bash
   git clone https://github.com/yourusername/boardup.git
   cd boardup
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Verify Setup**
   - Open http://localhost:5173
   - Application should load without errors
   - Hot reload should work when editing files

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "dbaeumer.vscode-eslint"
  ]
}
```

## Development Workflow

### Branch Strategy

We use Git Flow branching model:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features and enhancements
- `bugfix/*` - Bug fixes
- `hotfix/*` - Critical production fixes

### Creating Feature Branches

```bash
# Start from develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/flashcard-voice-commands

# Work on your feature
# ... make changes ...

# Push feature branch
git push -u origin feature/flashcard-voice-commands
```

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

#### Types
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons)
- `refactor`: Code refactoring without feature changes
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks, dependency updates

#### Examples
```bash
feat(flashcards): add voice command navigation
fix(quiz): correct timer not stopping on completion
docs(api): update authentication endpoint documentation
style(components): format code with prettier
refactor(auth): extract validation logic to custom hook
test(flashcards): add unit tests for card flipping
chore(deps): update react to 18.3.1
```

### Code Quality Checks

Before committing, ensure your code passes:

```bash
# Type checking
npm run lint

# Build verification
npm run build

# Manual testing
npm run dev
```

## Coding Standards

### TypeScript Guidelines

#### Interface Definitions
```typescript
// ✅ Good: Clear, documented interface
/**
 * Props for the FlashcardComponent
 */
interface FlashcardProps {
  /** Unique identifier for the flashcard */
  id: number;
  /** Front side content */
  question: string;
  /** Back side content */
  answer: string;
  /** Callback fired when card is flipped */
  onFlip: (cardId: number) => void;
}

// ❌ Avoid: Undocumented, unclear interface
interface Props {
  id: number;
  q: string;
  a: string;
  onFlip: Function;
}
```

#### Function Components
```typescript
// ✅ Good: Documented component with clear types
/**
 * FlashcardComponent - Interactive study card with flip animation
 * 
 * @component
 * @param props - Component props
 */
export const FlashcardComponent: React.FC<FlashcardProps> = ({ 
  id, 
  question, 
  answer, 
  onFlip 
}) => {
  // Component logic here
};

// ❌ Avoid: Unclear component definition
export const Flashcard = (props: any) => {
  // Component logic
};
```

#### State Management
```typescript
// ✅ Good: Well-typed state with descriptive names
const [isFlipped, setIsFlipped] = useState<boolean>(false);
const [studiedCards, setStudiedCards] = useState<Set<number>>(new Set());

// ❌ Avoid: Poorly typed or unclear state
const [flipped, setFlipped] = useState<any>(false);
const [cards, setCards] = useState([]);
```

### Component Structure

#### File Organization
```
src/components/
├── shared/              # Reusable components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
├── features/           # Feature-specific components
│   ├── flashcards/
│   │   ├── FlashcardStudyPage.tsx
│   │   ├── FlashcardLibrary.tsx
│   │   └── index.ts
└── pages/             # Page-level components
    ├── HomePage.tsx
    └── DashboardPage.tsx
```

#### Component Template
```typescript
// React core imports
import React, { useState, useEffect } from 'react';

// Third-party imports
import { SomeIcon } from 'lucide-react';

// Internal component imports
import { SharedComponent } from '../shared/SharedComponent';

// Type definitions
interface ComponentProps {
  // Prop definitions here
}

/**
 * ComponentName - Brief description
 * 
 * Detailed description of component purpose and functionality.
 * 
 * Features:
 * - Feature 1
 * - Feature 2
 * 
 * TODO:
 * - [ ] Future enhancement 1
 * - [ ] Future enhancement 2
 * 
 * @component
 * @param props - Component props
 */
export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // State management
  const [localState, setLocalState] = useState<Type>(initialValue);

  // Event handlers
  const handleSomeEvent = (data: SomeType) => {
    // Handler logic
  };

  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // Render
  return (
    <div className="component-container">
      {/* Component JSX */}
    </div>
  );
};
```

### CSS and Styling

#### Tailwind CSS Guidelines
```typescript
// ✅ Good: Organized, readable classes
<div className="
  flex flex-col items-center justify-center
  min-h-screen bg-gradient-to-br from-purple-50 to-pink-50
  p-4 sm:p-6 lg:p-8
">

// ✅ Good: Responsive design
<div className="
  w-full max-w-sm
  sm:max-w-md
  lg:max-w-lg
  xl:max-w-xl
">

// ❌ Avoid: Long, unorganized class strings
<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8 shadow-lg rounded-xl border border-gray-200">
```

#### Color Consistency
Use the established color palette:
```typescript
// Primary colors
'bg-purple-500'     // Primary actions
'bg-pink-600'       // Accent/secondary
'bg-orange-500'     // Highlights/warnings

// Status colors
'bg-green-500'      // Success/correct
'bg-red-500'        // Error/incorrect
'bg-yellow-500'     // Warning/caution
'bg-gray-500'       // Neutral/disabled
```

## Component Guidelines

### Reusability Principles

#### Do Create Reusable Components For:
- UI elements used in multiple places (buttons, inputs, cards)
- Complex logic that can be abstracted
- Consistent styling patterns

#### Don't Create Reusable Components For:
- One-off implementations
- Highly specific business logic
- Simple wrapper divs

### Accessibility Standards

```typescript
// ✅ Good: Accessible button
<button
  type="button"
  aria-label="Flip flashcard to show answer"
  className="focus:ring-2 focus:ring-purple-500"
  onClick={handleFlip}
>
  Flip Card
</button>

// ✅ Good: Form accessibility
<label htmlFor="email" className="sr-only">
  Email Address
</label>
<input
  id="email"
  type="email"
  placeholder="Enter your email"
  aria-describedby="email-error"
  className="focus:ring-2 focus:ring-purple-500"
/>
{error && (
  <p id="email-error" className="text-red-600 text-sm" role="alert">
    {error}
  </p>
)}
```

### Performance Considerations

```typescript
// ✅ Good: Memoized expensive calculations
const expensiveValue = useMemo(() => {
  return calculateComplexValue(data);
}, [data]);

// ✅ Good: Optimized event handlers
const handleClick = useCallback((id: number) => {
  onItemClick(id);
}, [onItemClick]);

// ✅ Good: Conditional rendering
{isLoading ? (
  <LoadingSpinner />
) : (
  <ContentComponent data={data} />
)}
```

## Testing Guidelines

### Test Structure (When Implemented)

```typescript
// ComponentName.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  const defaultProps = {
    prop1: 'value1',
    prop2: 'value2',
  };

  it('renders correctly with default props', () => {
    render(<ComponentName {...defaultProps} />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('handles user interactions correctly', () => {
    const mockHandler = jest.fn();
    render(<ComponentName {...defaultProps} onAction={mockHandler} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
});
```

### Testing Priorities
1. Critical user flows (registration, quiz taking, flashcard study)
2. Form validation and error handling
3. Component rendering with various prop combinations
4. User interaction handling

## Documentation Standards

### Inline Comments

#### Component Documentation
```typescript
/**
 * ComponentName - Brief description
 * 
 * Longer description explaining the component's purpose,
 * key features, and usage context.
 * 
 * Features:
 * - List key features
 * - One per line
 * 
 * Usage:
 * ```tsx
 * <ComponentName prop1="value" onAction={handler} />
 * ```
 * 
 * TODO:
 * - [ ] Future enhancements
 * - [ ] Known issues to fix
 * 
 * @component
 * @param props - Component props interface
 */
```

#### Function Documentation
```typescript
/**
 * functionName - Brief description of what function does
 * 
 * Longer description if needed, including algorithm details
 * or business logic explanation.
 * 
 * @param param1 - Description of parameter
 * @param param2 - Description of parameter
 * @returns Description of return value
 * 
 * @example
 * ```typescript
 * const result = functionName('value1', 'value2');
 * ```
 * 
 * TODO:
 * - [ ] Performance optimization
 * - [ ] Add error handling
 */
```

#### State Documentation
```typescript
// COMPONENT STATE MANAGEMENT

/** Current flashcard being displayed (0-based index) */
const [currentIndex, setCurrentIndex] = useState<number>(0);

/** Whether the card is showing answer (true) or question (false) */
const [isFlipped, setIsFlipped] = useState<boolean>(false);

/** Set of card IDs that user has marked as known */
const [knownCards, setKnownCards] = useState<Set<number>>(new Set());
```

### README Updates

When adding new features, update relevant documentation:
- Component descriptions in README.md
- Architecture notes in docs/ARCHITECTURE.md
- API endpoints in docs/API.md (when backend is implemented)

## Pull Request Process

### Before Creating PR

1. **Sync with latest develop**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout feature/your-feature
   git rebase develop
   ```

2. **Run quality checks**
   ```bash
   npm run lint
   npm run build
   ```

3. **Test your changes**
   - Manual testing of new functionality
   - Regression testing of existing features
   - Cross-browser testing (Chrome, Firefox, Safari)
   - Mobile responsiveness testing

### PR Description Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Changes Made
- Detailed list of changes
- Use bullet points for clarity
- Include component/file names

## Screenshots/GIFs
Include visual evidence of changes, especially for UI changes.

## Testing
- [ ] I have tested my changes locally
- [ ] I have tested on multiple browsers
- [ ] I have tested on mobile devices
- [ ] All existing tests still pass

## Documentation
- [ ] I have updated inline comments
- [ ] I have updated README if needed
- [ ] I have updated API docs if needed

## Related Issues
Closes #123
Related to #456
```

### PR Review Process

1. **Automated Checks**: All PRs must pass linting and build checks
2. **Code Review**: At least one maintainer must review and approve
3. **Testing**: Changes must be manually tested by reviewers
4. **Documentation**: Ensure all changes are properly documented

## Issue Reporting

### Bug Reports

Use this template for bug reports:

```markdown
## Bug Description
A clear and concise description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
A clear description of what you expected to happen.

## Actual Behavior
What actually happened instead.

## Screenshots
If applicable, add screenshots to help explain your problem.

## Environment
- OS: [e.g. iOS, Windows, macOS]
- Browser: [e.g. Chrome, Safari, Firefox]
- Version: [e.g. 22]
- Device: [e.g. iPhone 12, Desktop]

## Additional Context
Add any other context about the problem here.
```

### Feature Requests

```markdown
## Feature Description
A clear and concise description of what you want to happen.

## Problem/Use Case
Explain the problem this feature would solve or the use case it addresses.

## Proposed Solution
Describe the solution you'd like to see implemented.

## Alternatives Considered
A clear description of any alternative solutions you've considered.

## Additional Context
Add any other context, mockups, or examples about the feature request.
```

## Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH` (e.g., 1.0.0)
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

- [ ] All tests pass
- [ ] Documentation is updated
- [ ] CHANGELOG.md is updated
- [ ] Version number is bumped
- [ ] Release notes are prepared
- [ ] Deployment is tested

## Getting Help

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and community discussions
- **Pull Request Comments**: Code review discussions

### Resources

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide)

### Mentorship

New contributors are welcome! If you're new to:
- React/TypeScript development
- Open source contribution
- The architectural exam domain

Feel free to reach out for guidance and mentorship.

---

Thank you for contributing to BoardUp! Your efforts help make architectural exam preparation more accessible and effective for students worldwide.