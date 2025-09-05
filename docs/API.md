# API Integration Guide

## Overview

BoardUp is currently a frontend-only application with simulated backend functionality. This document outlines the planned API architecture and integration points for when the backend is implemented.

## Current State (Frontend Only)

The application currently uses:
- Local state management with React useState
- Simulated API calls with setTimeout
- Mock data for all content (flashcards, quizzes, users)
- No persistent storage (data resets on refresh)

## Planned Backend Architecture

### Technology Stack
- **Backend Framework**: Node.js with Express or Python with FastAPI
- **Database**: PostgreSQL for relational data, Redis for caching
- **Authentication**: JWT tokens with refresh token rotation
- **File Storage**: AWS S3 for user-uploaded content
- **Email Service**: SendGrid or AWS SES
- **Payment Processing**: Stripe integration

### API Base URL
```
Production: https://api.boardup.com
Development: http://localhost:3001
```

## Authentication Endpoints

### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "fullName": "John Doe",
      "email": "john@example.com",
      "isVerified": false,
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "refreshToken": "def50200e3b4a6e8f9c2d1a7b8c5d2e1f4g7h8i9j0k3l6m9n2o5p8q1r4s7t0u3v6w9x2y5z8..."
  }
}
```

**Current Implementation Status:**
- ✅ Frontend form validation
- ⏳ Backend user creation
- ⏳ Email verification flow
- ⏳ Password encryption

### POST /api/auth/login
Authenticate existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "fullName": "John Doe",
      "email": "john@example.com",
      "preferences": {
        "targetExam": "Architectural Licensure Exam",
        "studyMode": "Self-Study"
      }
    },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

**Current Implementation Status:**
- ✅ Frontend form handling
- ⏳ Backend authentication
- ⏳ JWT token generation
- ⏳ Session management

### POST /api/auth/refresh
Refresh expired access token.

**Request Body:**
```json
{
  "refreshToken": "def50200e3b4a6e8f9c2d1a7b8c5d2e1f4g7h8i9j0k3l6m9n2o5p8q1r4s7t0u3v6w9x2y5z8..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "refreshToken": "abc12345d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h6i7j8..."
  }
}
```

## User Profile Endpoints

### PUT /api/users/profile
Update user profile and preferences.

**Request Body:**
```json
{
  "preferences": {
    "boardExam": "Architectural Licensure Exam",
    "preparationMethod": "Self-Study",
    "preparationDuration": "3–6 months",
    "targetMonth": "June",
    "targetYear": "2024",
    "studyHours": "2-3 hours daily",
    "studyMode": "Mixed (Reading + Practice)"
  }
}
```

**Current Implementation Status:**
- ✅ Frontend setup form
- ⏳ Backend preference storage
- ⏳ Profile data persistence

### GET /api/users/profile
Retrieve user profile information.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "fullName": "John Doe",
    "email": "john@example.com",
    "preferences": {
      "boardExam": "Architectural Licensure Exam",
      "studyMode": "Self-Study"
    },
    "studyStats": {
      "totalStudyTime": 1250,
      "cardsStudied": 445,
      "quizzesCompleted": 23,
      "averageScore": 78.5
    }
  }
}
```

## Learning Content Endpoints

### GET /api/flashcards/decks
Get available flashcard decks.

**Query Parameters:**
- `category`: Filter by category (optional)
- `difficulty`: Filter by difficulty level (optional)
- `limit`: Number of results (default: 20)
- `offset`: Pagination offset (default: 0)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "decks": [
      {
        "id": 1,
        "title": "Architectural History - Ancient Civilizations",
        "description": "Covers Egyptian, Greek, and Roman architecture",
        "cardCount": 45,
        "category": "History",
        "difficulty": "Medium",
        "lastUpdated": "2024-01-10T12:00:00Z"
      }
    ],
    "total": 15,
    "hasMore": true
  }
}
```

**Current Implementation Status:**
- ✅ Frontend deck display
- ✅ Mock flashcard data
- ⏳ Database storage
- ⏳ Content management system

### GET /api/flashcards/decks/:deckId
Get flashcards for a specific deck.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "deck": {
      "id": 1,
      "title": "Architectural History - Ancient Civilizations",
      "cards": [
        {
          "id": 1,
          "question": "What is the most famous example of Neolithic architecture?",
          "answer": "Stonehenge",
          "category": "Prehistoric Architecture",
          "difficulty": "Easy",
          "imageUrl": null
        }
      ]
    }
  }
}
```

### POST /api/study-sessions
Record a study session.

**Request Body:**
```json
{
  "type": "flashcards",
  "deckId": 1,
  "duration": 1800,
  "cardsStudied": 25,
  "knownCards": [1, 3, 5, 8, 12],
  "unknownCards": [2, 4, 6, 9, 15]
}
```

**Current Implementation Status:**
- ✅ Frontend session tracking
- ⏳ Backend session storage
- ⏳ Progress analytics

## Quiz System Endpoints

### GET /api/quizzes/sections
Get available quiz sections and topics.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "sections": [
      {
        "id": "history-theory",
        "title": "History and Theory of Architecture",
        "percentage": 30,
        "subsections": [
          {
            "id": "history",
            "title": "History of Architecture",
            "topics": ["Pre-Historic Architecture", "Ancient Architecture"],
            "questionCount": 45
          }
        ]
      }
    ]
  }
}
```

### POST /api/quizzes/start
Start a new quiz session.

**Request Body:**
```json
{
  "sectionId": "history-theory",
  "subsectionId": "history",
  "questionCount": 10,
  "timeLimit": 600
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "sessionId": "sess_12345",
    "questions": [
      {
        "id": 1,
        "question": "What is the most famous example of Neolithic architecture?",
        "options": ["Stonehenge", "Pyramids of Giza", "Parthenon", "Colosseum"],
        "imageUrl": null
      }
    ],
    "timeLimit": 600
  }
}
```

**Current Implementation Status:**
- ✅ Frontend quiz interface
- ✅ Timer functionality
- ✅ Question navigation
- ⏳ Backend question storage
- ⏳ Session management

### POST /api/quizzes/submit
Submit quiz answers for scoring.

**Request Body:**
```json
{
  "sessionId": "sess_12345",
  "answers": {
    "1": 0,
    "2": 2,
    "3": 1
  },
  "timeSpent": 450
}
```

## Error Response Format

All API endpoints follow a consistent error response format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "field": "email",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR`: Invalid input data
- `AUTHENTICATION_ERROR`: Invalid or expired credentials
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `RESOURCE_NOT_FOUND`: Requested resource doesn't exist
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `SERVER_ERROR`: Internal server error

## Authentication

### JWT Token Structure
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "1234567890",
    "email": "john@example.com",
    "role": "user",
    "iat": 1516239022,
    "exp": 1516242622
  }
}
```

### Protected Endpoints
Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

## Rate Limiting

API endpoints are rate limited to prevent abuse:
- Authentication endpoints: 5 requests per minute
- General API endpoints: 100 requests per minute
- Quiz submissions: 10 requests per minute

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1609459200
```

## Webhooks (Future Implementation)

### Payment Events
- `payment.succeeded`
- `payment.failed`
- `subscription.created`
- `subscription.cancelled`

### User Events
- `user.registered`
- `user.verified`
- `study_session.completed`

## Implementation Roadmap

### Phase 1: Core Backend (Months 1-2)
- [ ] User authentication system
- [ ] Profile management
- [ ] Basic flashcard API
- [ ] Study session tracking

### Phase 2: Enhanced Features (Months 3-4)
- [ ] Quiz system backend
- [ ] Content management system
- [ ] Progress analytics
- [ ] Email notifications

### Phase 3: Advanced Features (Months 5-6)
- [ ] Payment processing
- [ ] Advanced analytics
- [ ] Real-time features
- [ ] Mobile API endpoints

## Frontend Integration Points

### Current Simulation Points to Replace
1. `setTimeout` calls in authentication components
2. Mock data arrays in flashcard and quiz components
3. Local storage for user preferences
4. Client-side progress tracking

### API Client Setup
```typescript
// api/client.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const apiClient = {
  async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('accessToken');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }
};
```

This API documentation will be updated as the backend development progresses.