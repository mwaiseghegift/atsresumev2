# Claude Instructions for ATS Resume V2

## Project Overview

You are an expert AI assistant helping develop ATS Resume V2, a full-stack web application that provides AI-powered resume customization and optimization for Applicant Tracking Systems (ATS). The application uses Google's Gemini AI to intelligently tailor resumes to specific job descriptions, improving match scores and visibility in automated hiring systems.

## System Architecture

### Technology Stack

- **Backend**: Django 6.0.3 REST API with SQLite database
- **Frontend**: Next.js 16.1.6 with React 19.2.4 and Tailwind CSS
- **AI**: Google Gemini 2.5 Flash for resume customization
- **Authentication**: Django session-based auth with CSRF protection

### Key Components

- **Resume Builder**: Interactive resume creation with drag-and-drop
- **AI Customization**: Job-specific resume optimization with match scoring
- **User Management**: Authentication and personalized resume storage
- **Database Models**: Resume, JobDescription, CustomizedResume, User

## Development Guidelines

### Code Quality

- Write clean, readable, and well-documented code
- Use meaningful variable and function names
- Follow DRY principles and maintain modularity
- Implement comprehensive error handling
- Validate and sanitize all user inputs
- Use environment variables for configuration

### Frontend (Next.js/React)

#### Component Architecture

```
ui/src/
├── app/                    # Next.js App Router pages
├── components/             # Reusable components
│   ├── builder.jsx        # Main resume builder
│   ├── JobCustomizer.jsx  # AI customization interface
│   ├── form/              # Form components
│   ├── preview/           # Preview components
│   └── ui/                # UI primitives
├── constants/api.js       # API endpoint definitions
├── services/              # API service functions
├── context/AuthContext.jsx # Authentication state
├── hooks/                 # Custom React hooks
└── styles/globals.css     # Global styles
```

#### Frontend Best Practices

- Use functional components with hooks
- Implement proper loading, error, and empty states
- Handle CSRF tokens for authenticated requests
- Maintain resume data structure integrity
- Use TypeScript for type safety where possible
- Follow Next.js App Router conventions

#### Key Components to Understand

- **Builder**: Main resume creation interface with state management
- **JobCustomizer**: Modal interface for AI customization with match score display
- **AuthContext**: Global authentication state with CSRF handling

### Backend (Django)

#### API Structure

```
api/
├── config/                # Django settings
├── core/                  # Main app (AI, models, views)
├── accounts/              # User management
├── collection/bruno/      # API documentation
└── manage.py
```

#### Backend Best Practices

- Use Django REST Framework for all APIs
- Implement proper serializers for validation
- Keep business logic in services (not views)
- Use UUID primary keys for User model
- Configure CORS and CSRF for frontend access
- Document endpoints in Bruno format

#### Data Models

- **User**: Custom model with UUID primary key
- **Resume**: JSONField storage for complete resume data
- **JobDescription**: Job posting details with user association
- **CustomizedResume**: AI-customized versions with match scores

### AI Integration (Gemini)

#### GeminiService Guidelines

- Use `models/gemini-2.5-flash` for optimal speed/cost balance
- Maintain exact resume JSON structure during customization
- Convert keyAchievements arrays to newline-separated strings
- Implement fallback parsing for API responses
- Generate detailed customization notes and match scores

#### Resume Data Structure

```json
{
  "personalInfo": {...},
  "summary": "string",
  "workExperience": [
    {
      "company": "string",
      "position": "string",
      "description": "string",
      "keyAchievements": "string with \\n separators",
      "startYear": "YYYY-MM",
      "endYear": "YYYY-MM"
    }
  ],
  "education": [...],
  "skills": [...],
  "projects": [...]
}
```

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/customize/` | Save customized resume to database |
| POST | `/api/quick-customize/` | Preview customization without saving |
| GET/POST | `/api/resumes/` | Resume CRUD operations |
| GET/POST | `/api/job-descriptions/` | Job description CRUD |
| GET/POST | `/api/customized-resumes/` | Customized resume CRUD |
| POST | `/api/auth/login/` | User authentication |
| POST | `/api/auth/register/` | User registration |
| GET | `/api/auth/me/` | Get current user info |

## Development Workflow

### When Making Changes

1. **Backend Changes**:
   - Update models and create migrations
   - Modify serializers and views
   - Test API endpoints thoroughly
   - Update Bruno documentation

2. **Frontend Changes**:
   - Modify components following established patterns
   - Test integration with backend APIs
   - Handle loading and error states properly
   - Maintain TypeScript types if applicable

3. **AI Integration Changes**:
   - Modify GeminiService with careful testing
   - Validate resume data structure preservation
   - Test customization quality and match scoring
   - Document prompt engineering changes

### Security Considerations

- Always implement CSRF protection
- Validate all inputs through serializers
- Use environment variables for secrets
- Sanitize data before processing
- Implement proper authentication checks

### Testing Requirements

- Write unit tests for critical business logic
- Test AI customization flows end-to-end
- Validate API responses and error handling
- Test authentication and authorization
- Verify data integrity across operations

## Common Patterns

### Resume Data Handling

- Always preserve the exact JSON structure
- Convert keyAchievements arrays to strings with newlines
- Maintain data types (strings, arrays, objects)
- Handle both authenticated and anonymous users

### API Communication

- Include CSRF tokens in state-changing requests
- Handle authentication errors gracefully
- Implement retry logic for transient failures
- Parse and display meaningful error messages

### AI Customization Flow

1. User inputs job details in JobCustomizer
2. Frontend sends resume + job data to API
3. Backend calls GeminiService for customization
4. AI returns optimized resume with match score
5. Frontend updates UI with results

## File Organization

### Important Files to Reference

- `docs/ARCHITECTURE.md`: Complete system architecture
- `api/core/gemini_service.py`: AI integration logic
- `ui/src/components/JobCustomizer.jsx`: AI customization UI
- `ui/src/constants/api.js`: API endpoint definitions
- `api/config/settings.py`: Django configuration

### Documentation Updates

- Update ARCHITECTURE.md for significant changes
- Maintain Bruno API documentation
- Keep README files current
- Document AI prompt and logic changes

Remember: This is an AI-powered resume optimization platform. Always prioritize data integrity, security, and the quality of AI-generated customizations.
