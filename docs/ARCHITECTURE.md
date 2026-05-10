# ATS Resume V2 Architecture

## Overview

ATS Resume V2 is a full-stack web application that provides AI-powered resume customization and optimization for Applicant Tracking Systems (ATS). The application uses Google's Gemini AI to intelligently tailor resumes to specific job descriptions, improving match scores and visibility in automated hiring systems.

## System Architecture

### High-Level Architecture

```plain
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js UI    │    │  Django REST    │    │   Google Gemini │
│   (Frontend)    │◄──►│     API         │◄──►│       AI        │
│                 │    │   (Backend)     │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Resume        │    │   SQLite DB     │    │   AI Models     │
│   Builder       │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Technology Stack

### Backend (Django REST API)

- **Framework**: Django 6.0.3
- **API Framework**: Django REST Framework 3.15.2
- **Database**: SQLite 3
- **Authentication**: Django Auth with custom User model (UUID primary key)
- **AI Integration**: Google Generative AI (Gemini 2.5 Flash)
- **Cross-Origin**: django-cors-headers 4.8.0
- **Environment**: python-dotenv 1.0.1

### Frontend (Next.js)

- **Framework**: Next.js 16.1.6
- **Runtime**: React 19.2.4
- **Styling**: Tailwind CSS 4.2.1
- **Language**: TypeScript 5.9.3
- **Drag & Drop**: @hello-pangea/dnd 18.0.1
- **Icons**: react-icons 5.6.0
- **Highlighting**: react-highlight-menu 2.1.1

### Development Tools

- **Python Environment**: Virtual Environment (venv)
- **Package Management**: pip (Python), npm (Node.js)
- **Linting**: ESLint 10.0.3
- **Build Tools**: PostCSS 8.5.8, Autoprefixer 10.4.27

## Application Components

### Backend Architecture

#### Models (`api/core/models.py`)

1. **User Model** (`api/accounts/models.py`)
   - Extends Django's AbstractUser
   - Uses UUID as primary key
   - Standard Django auth fields (username, email, password, etc.)

2. **Resume Model**
   - Stores complete resume data as JSONField
   - User association (optional for anonymous use)
   - Timestamps for creation and updates

3. **JobDescription Model**
   - Job title, company, description, and requirements
   - User association for personal job tracking
   - Timestamps

4. **CustomizedResume Model**
   - Links original resume and job description
   - Stores AI-customized resume data
   - Match score (0-100) from Gemini AI
   - Customization notes and metadata

#### Services

**GeminiService** (`api/core/gemini_service.py`)

- Handles all interactions with Google Gemini AI
- Customizes resumes based on job descriptions
- Calculates match scores
- Provides detailed customization notes
- Maintains resume data structure integrity

#### API Endpoints (`api/core/urls.py`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/customize/` | Customize and save resume to database |
| POST | `/api/quick-customize/` | Preview customization without saving |
| GET/POST | `/api/resumes/` | CRUD operations for resumes |
| GET/POST | `/api/job-descriptions/` | CRUD operations for job descriptions |
| GET/POST | `/api/customized-resumes/` | CRUD operations for customized resumes |
| POST | `/api/auth/login/` | User authentication |
| POST | `/api/auth/register/` | User registration |
| POST | `/api/auth/logout/` | User logout |
| GET | `/api/auth/me/` | Get current user info |

#### Views (`api/core/views.py`)

- RESTful API views using Django REST Framework
- Authentication and authorization
- CSRF protection for state-changing operations
- Error handling and validation

### Frontend Architecture

#### Component Structure

```plain
ui/src/
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout with AuthProvider
│   ├── page.jsx           # Home page
│   ├── dashboard/         # User dashboard
│   ├── login/             # Authentication pages
│   └── register/
├── components/
│   ├── builder.jsx        # Main resume builder component
│   ├── JobCustomizer.jsx  # AI customization interface
│   ├── Navbar.jsx         # Navigation component
│   ├── FormCloseOpenBtn.jsx
│   ├── form/              # Resume form components
│   ├── preview/           # Resume preview components
│   ├── hero/              # Landing page components
│   ├── meta/              # Metadata components
│   └── ui/                # Reusable UI components
├── constants/
│   └── api.js             # API endpoint constants
├── context/
│   └── AuthContext.jsx    # Authentication context
├── hooks/                 # Custom React hooks
├── services/              # API service functions
│   ├── authService.js
│   ├── customizeService.js
│   └── resumeService.js
└── styles/
    └── globals.css        # Global styles
```

#### Key Components

**Builder Component** (`ui/src/components/builder.jsx`)

- Main resume creation interface
- State management for resume data
- Integration with JobCustomizer
- Print functionality for PDF generation

**JobCustomizer Component** (`ui/src/components/JobCustomizer.jsx`)

- Floating action button interface
- Modal form for job details input
- Real-time AI customization
- Match score visualization
- Preview vs. save modes

**AuthContext** (`ui/src/context/AuthContext.jsx`)

- Global authentication state management
- CSRF token handling
- User session management

#### Services

**API Services**

- Centralized API communication
- CSRF token management
- Error handling
- Authentication headers

## Data Flow

### Resume Customization Flow

1. **User Input**: User enters job details in JobCustomizer modal
2. **API Request**: Frontend sends resume data + job details to `/api/customize/`
3. **AI Processing**: Backend calls GeminiService to customize resume
4. **Database Storage**: Customized resume saved with match score and notes
5. **Response**: Frontend receives customized data and updates UI
6. **Visualization**: Match score and customization notes displayed

### Authentication Flow

1. **Registration/Login**: User submits credentials
2. **Token Exchange**: CSRF token obtained and included in requests
3. **Session Management**: AuthContext manages user state
4. **API Access**: Authenticated requests include CSRF tokens

## AI Integration

### Gemini AI Configuration

- **Model**: `models/gemini-2.5-flash` (fast, cost-effective)
- **API Key**: Stored in environment variables
- **Prompt Engineering**: Specialized prompts for ATS optimization
- **Output Processing**: JSON parsing with fallback error handling

### Customization Features

- **Keyword Optimization**: Matches job description keywords
- **Content Restructuring**: Reorders and emphasizes relevant experience
- **ATS Compatibility**: Optimizes for applicant tracking systems
- **Match Scoring**: 0-100 compatibility score
- **Detailed Notes**: AI-generated explanations of changes

## Database Schema

### Tables

```sql
-- User (extends Django auth)
CREATE TABLE accounts_user (
    id UUID PRIMARY KEY,
    username VARCHAR(150) UNIQUE,
    email VARCHAR(254),
    -- ... other Django auth fields
);

-- Resume
CREATE TABLE core_resume (
    id INTEGER PRIMARY KEY,
    user_id UUID REFERENCES accounts_user(id),
    resume_data JSON NOT NULL,
    created_at DATETIME,
    updated_at DATETIME
);

-- Job Description
CREATE TABLE core_jobdescription (
    id INTEGER PRIMARY KEY,
    user_id UUID REFERENCES accounts_user(id),
    title VARCHAR(255),
    company VARCHAR(255),
    description TEXT,
    requirements TEXT,
    created_at DATETIME
);

-- Customized Resume
CREATE TABLE core_customizedresume (
    id INTEGER PRIMARY KEY,
    user_id UUID REFERENCES accounts_user(id),
    original_resume_id INTEGER REFERENCES core_resume(id),
    job_description_id INTEGER REFERENCES core_jobdescription(id),
    customized_data JSON NOT NULL,
    customization_notes TEXT,
    match_score REAL,
    created_at DATETIME
);
```

## Deployment & Development

### Development Setup

**Backend**:

```bash
cd api
python -m venv env
env\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Frontend**:

```bash
cd ui
npm install
npm run dev
```

**Full Application**:

- Windows: `run.bat`
- Linux/Mac: `run.sh`

### Environment Configuration

**Required Environment Variables**:

- `GEMINI_API_KEY`: Google Gemini API key
- `DEBUG`: Django debug mode (development only)
- `SECRET_KEY`: Django secret key

### CORS Configuration

- Allows frontend origin (`http://localhost:3000`)
- Credentials enabled for CSRF protection
- Trusted origins configured for development

## Security Considerations

- **CSRF Protection**: Enabled for all state-changing operations
- **Authentication**: Django session-based auth
- **Input Validation**: Django REST Framework serializers
- **Environment Variables**: Sensitive data stored securely
- **CORS**: Configured for frontend-backend communication

## Performance Optimizations

- **AI Model Selection**: Gemini 2.5 Flash for speed/cost balance
- **Database Indexing**: Automatic Django indexing on foreign keys
- **Lazy Loading**: Frontend components loaded as needed
- **Caching**: SQLite query caching
- **Bundle Optimization**: Next.js automatic code splitting

## Future Enhancements

- **Database Migration**: PostgreSQL for production scalability
- **Caching Layer**: Redis for session and API response caching
- **File Storage**: Cloud storage for resume attachments
- **Real-time Collaboration**: WebSocket support for team editing
- **Advanced Analytics**: Usage tracking and customization insights
- **Multi-language Support**: Internationalization framework
- **API Rate Limiting**: Protection against abuse
- **Backup & Recovery**: Automated database backups</content>
<parameter name="filePath">e:\dev\mwaisegheware\atsresumev2\docs\ARCHITECTURE.md
