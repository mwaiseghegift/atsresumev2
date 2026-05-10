# Copilot Instructions for atsresumev2

## Project Overview
ATS Resume V2 is a full-stack web application that provides AI-powered resume customization and optimization for Applicant Tracking Systems (ATS). The application uses Google's Gemini AI to intelligently tailor resumes to specific job descriptions, improving match scores and visibility in automated hiring systems.

## General Guidelines
- Write clean, readable, and well-documented code.
- Use meaningful variable and function names.
- Keep code DRY (Don't Repeat Yourself) and modular.
- Prefer functional/stateless components where possible in React/Next.js.
- Use ES6+ features and modern JavaScript best practices.
- Always validate and sanitize user input on both frontend and backend.
- Write error handling for all API calls and backend logic.
- Use environment variables for secrets and configuration.
- Keep business logic out of views/components; use services/helpers.
- Maintain resume data structure integrity (JSON format with specific fields).
- Ensure AI customization preserves data types and structure.

---

## Next.js (JavaScript) UI

### Architecture Awareness
- **Resume Data Structure**: Resume data is stored as JSON with specific structure including `personalInfo`, `summary`, `workExperience`, `education`, `skills`, `projects`, etc.
- **AI Integration**: JobCustomizer component handles AI customization with match scores (0-100) and detailed notes.
- **Authentication**: Uses AuthContext for session management with CSRF token handling.

### Component Guidelines
- All API endpoint URLs must be defined in `ui/src/constants/api.js`.
- All API call logic must be placed in service files under `ui/src/services/`.
- Components should import endpoints from `api.js` and call services from `services/`.
- Use functional React components and hooks (e.g., `useState`, `useEffect`).
- Use CSS modules, Tailwind, or global styles in `ui/src/styles/` for styling.
- Keep components small and focused; split into subcomponents as needed.
- Use Next.js routing and file-based structure for pages.
- Do not hardcode API URLs in components; always use constants from `api.js`.
- Handle loading, error, and empty states in UI components.
- Use prop-types or TypeScript for type safety if possible.
- Store reusable logic in hooks under `ui/src/hooks/`.
- Store constants in `ui/src/constants/`.
- Store utility/helper functions in `ui/src/components/utility/`.

### Key Components
- **Builder Component**: Main resume creation interface with state management
- **JobCustomizer Component**: AI customization interface with modal forms and match score visualization
- **AuthContext**: Global authentication state management with CSRF handling

### API Integration
- Use CSRF tokens for all state-changing operations
- Handle authentication errors and token refresh
- Implement proper error handling for API failures
- Support both authenticated and anonymous resume operations

---

## Django API (Python)

### Architecture Awareness
- **AI Integration**: GeminiService handles Google Gemini AI interactions for resume customization
- **Data Models**: Resume, JobDescription, CustomizedResume with JSONField storage
- **Authentication**: Custom User model with UUID primary keys
- **Security**: CSRF protection and CORS configuration for frontend access

### API Guidelines
- Use Django REST Framework for all API endpoints.
- Organize apps by domain (e.g., `core`, `accounts`).
- Use serializers for all input/output validation.
- Use class-based views or viewsets for API endpoints.
- Keep business logic out of views; use services/helpers where possible.
- Use UUIDs for primary keys if possible (see `accounts.CustomUser`).
- Use environment variables for secrets and sensitive config (see `.env`).
- Register all models in `admin.py` for admin access.
- Write migrations for all model changes and keep them in version control.
- Use `CORS` and `CSRF` settings to allow frontend access (see `settings.py`).
- Document all endpoints (see `collection/bruno/` for API request docs).
- Write tests for all critical logic in `tests.py`.
- Use `AUTH_USER_MODEL` for custom user models.
- Keep settings modular and secure; do not commit secrets.

### AI Integration Guidelines
- **GeminiService**: Use `models/gemini-2.5-flash` for fast, cost-effective processing
- **Resume Customization**: Maintain exact JSON structure, convert keyAchievements arrays to newline-separated strings
- **Prompt Engineering**: Use specialized prompts for ATS optimization and keyword matching
- **Error Handling**: Implement fallback parsing for Gemini API responses
- **Match Scoring**: Calculate 0-100 compatibility scores based on job-resume alignment

### API Endpoints
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

### Data Models
- **Resume**: JSONField for complete resume data, user association, timestamps
- **JobDescription**: Title, company, description, requirements, user association
- **CustomizedResume**: Links resume + job, stores customized data, match score, notes
- **User**: UUID primary key, extends AbstractUser

---

## Collaboration & Documentation
- Document all new endpoints in Bruno format under `api/collection/bruno/`.
- Keep README files up to date for both frontend and backend.
- Update ARCHITECTURE.md when making significant changes.
- Use Git for version control and commit often with clear messages.
- Follow best practices for both Next.js and Django projects.
- Maintain data structure consistency across frontend and backend.
- Document AI customization logic and prompt changes.
- Include security considerations in code reviews.

---

## Development Workflow
1. **Backend Changes**: Update models → create migrations → update serializers → test API
2. **Frontend Changes**: Update components → test integration → handle errors
3. **AI Changes**: Modify GeminiService → test customization flow → validate data structure
4. **Security**: Always use CSRF protection, validate inputs, sanitize data
5. **Testing**: Write tests for critical logic, especially AI integration and API endpoints
