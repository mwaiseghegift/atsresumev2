# AGENTS.md — ATS Resume V2

Single source of truth for AI coding assistants (Claude Code, GitHub Copilot, and others) working in this repository.

## Project Overview

ATS Resume V2 is a full-stack web application that provides AI-powered resume customization and optimization for Applicant Tracking Systems (ATS). It uses Google's Gemini AI to intelligently tailor resumes to specific job descriptions, improving match scores and visibility in automated hiring systems.

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

## General Guidelines

- Write clean, readable, and well-documented code.
- Use meaningful variable and function names.
- Keep code DRY (Don't Repeat Yourself) and modular.
- Implement comprehensive error handling for all API calls and backend logic.
- Always validate and sanitize all user inputs on both frontend and backend.
- Use environment variables for secrets and configuration.
- Keep business logic out of views/components; use services/helpers instead.
- Maintain resume data structure integrity (JSON format with specific fields).
- Ensure AI customization preserves data types and structure.

## Frontend (Next.js/React)

### Component Architecture

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

### Architecture Awareness

- **Resume Data Structure**: Resume data is stored as JSON with specific structure including `personalInfo`, `summary`, `workExperience`, `education`, `skills`, `projects`, etc.
- **AI Integration**: JobCustomizer component handles AI customization with match scores (0-100) and detailed notes.
- **Authentication**: Uses AuthContext for session management with CSRF token handling.

### Frontend Best Practices

- Use functional components with hooks (e.g., `useState`, `useEffect`).
- Implement proper loading, error, and empty states in UI components.
- Handle CSRF tokens for authenticated requests.
- Maintain resume data structure integrity.
- Use TypeScript or prop-types for type safety where possible.
- Follow Next.js App Router conventions.
- All API endpoint URLs must be defined in `ui/src/constants/api.js` — do not hardcode API URLs in components.
- All API call logic must be placed in service files under `ui/src/services/`.
- Components should import endpoints from `api.js` and call services from `services/`.
- Use CSS modules, Tailwind, or global styles in `ui/src/styles/` for styling.
- Keep components small and focused; split into subcomponents as needed.
- Store reusable logic in hooks under `ui/src/hooks/`.
- Store constants in `ui/src/constants/`.
- Store utility/helper functions in `ui/src/components/utility/`.

### Key Components to Understand

- **Builder**: Main resume creation interface with state management.
- **JobCustomizer**: Modal interface for AI customization with match score display and visualization.
- **AuthContext**: Global authentication state with CSRF handling.

### API Integration

- Use CSRF tokens for all state-changing operations.
- Handle authentication errors and token refresh gracefully.
- Implement proper error handling and retry logic for transient API failures.
- Support both authenticated and anonymous resume operations.
- Parse and display meaningful error messages.

## Backend (Django)

### API Structure

```
api/
├── config/                # Django settings
├── core/                  # Main app (AI, models, views)
├── accounts/              # User management
├── collection/bruno/      # API documentation
└── manage.py
```

### Architecture Awareness

- **AI Integration**: GeminiService handles Google Gemini AI interactions for resume customization.
- **Data Models**: Resume, JobDescription, CustomizedResume with JSONField storage.
- **Authentication**: Custom User model with UUID primary keys.
- **Security**: CSRF protection and CORS configuration for frontend access.

### Backend Best Practices

- Use Django REST Framework for all API endpoints.
- Organize apps by domain (e.g., `core`, `accounts`).
- Use serializers for all input/output validation.
- Use class-based views or viewsets for API endpoints.
- Keep business logic out of views; use services/helpers instead.
- Use UUID primary keys for the User model (see `accounts.CustomUser`).
- Use environment variables for secrets and sensitive config (see `.env`).
- Register all models in `admin.py` for admin access.
- Write migrations for all model changes and keep them in version control.
- Configure CORS and CSRF settings to allow frontend access (see `settings.py`).
- Document all endpoints (see `collection/bruno/` for API request docs).
- Write tests for all critical logic in `tests.py`.
- Use `AUTH_USER_MODEL` for the custom user model.
- Keep settings modular and secure; do not commit secrets.

### Data Models

- **User**: Custom model with UUID primary key, extends AbstractUser.
- **Resume**: JSONField storage for complete resume data, user association, timestamps.
- **JobDescription**: Title, company, description, requirements, user association.
- **CustomizedResume**: Links resume + job, stores customized data, match score, notes.

## AI Integration (Gemini)

### GeminiService Guidelines

- Use `models/gemini-2.5-flash` for optimal speed/cost balance.
- Maintain exact resume JSON structure during customization.
- Convert `keyAchievements` arrays to newline-separated strings.
- Implement fallback parsing for Gemini API responses.
- Generate detailed customization notes and match scores (0-100 compatibility based on job-resume alignment).
- Use specialized prompts for ATS optimization and keyword matching.

### Resume Data Structure

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
| POST | `/api/customize/` | Customize and save resume to database |
| POST | `/api/quick-customize/` | Preview customization without saving |
| GET/POST | `/api/resumes/` | CRUD operations for resumes |
| GET/POST | `/api/job-descriptions/` | CRUD operations for job descriptions |
| GET/POST | `/api/customized-resumes/` | CRUD operations for customized resumes |
| POST | `/api/auth/login/` | User authentication |
| POST | `/api/auth/register/` | User registration |
| POST | `/api/auth/logout/` | User logout |
| GET | `/api/auth/me/` | Get current user info |

## Development Workflow

### When Making Changes

1. **Backend Changes**:
   - Update models and create migrations.
   - Modify serializers and views.
   - Test API endpoints thoroughly.
   - Update Bruno documentation.

2. **Frontend Changes**:
   - Modify components following established patterns.
   - Test integration with backend APIs.
   - Handle loading and error states properly.
   - Maintain TypeScript types if applicable.

3. **AI Integration Changes**:
   - Modify GeminiService with careful testing.
   - Validate resume data structure preservation.
   - Test customization quality and match scoring.
   - Document prompt engineering changes.

### Security Considerations

- Always implement CSRF protection.
- Validate all inputs through serializers.
- Use environment variables for secrets.
- Sanitize data before processing.
- Implement proper authentication checks.

### Testing Requirements

- Write unit tests for critical business logic, especially AI integration and API endpoints.
- Test AI customization flows end-to-end.
- Validate API responses and error handling.
- Test authentication and authorization.
- Verify data integrity across operations.

## Common Patterns

### Resume Data Handling

- Always preserve the exact JSON structure.
- Convert `keyAchievements` arrays to strings with newlines.
- Maintain data types (strings, arrays, objects).
- Handle both authenticated and anonymous users.

### API Communication

- Include CSRF tokens in state-changing requests.
- Handle authentication errors gracefully.
- Implement retry logic for transient failures.
- Parse and display meaningful error messages.

### AI Customization Flow

1. User inputs job details in JobCustomizer.
2. Frontend sends resume + job data to API.
3. Backend calls GeminiService for customization.
4. AI returns optimized resume with match score.
5. Frontend updates UI with results.

## File Organization

### Important Files to Reference

- `docs/ARCHITECTURE.md`: Complete system architecture.
- `api/core/gemini_service.py`: AI integration logic.
- `ui/src/components/JobCustomizer.jsx`: AI customization UI.
- `ui/src/constants/api.js`: API endpoint definitions.
- `api/config/settings.py`: Django configuration.

### Documentation Updates

- Update ARCHITECTURE.md for significant changes.
- Maintain Bruno API documentation under `api/collection/bruno/`.
- Keep README files current for both frontend and backend.
- Document AI prompt and logic changes.

## Collaboration & Documentation

- Use Git for version control and commit often with clear messages.
- Follow best practices for both Next.js and Django projects.
- Maintain data structure consistency across frontend and backend.
- Include security considerations in code reviews.

## UI Design Guardrails: Avoid Vibe-Coded Interfaces

When generating or editing UI, do not ship designs that look AI-generated, trend-chasing, or visually noisy. Every visual choice must support usability, hierarchy, product meaning, or user action.

### 1. Use a restrained color system

Do not use many competing neon or high-saturation colors. Avoid interfaces where every section, button, card, chart, or label uses a different bright accent color.

Use:

- One dominant brand color
- One accent color
- Neutral colors for backgrounds, borders, and text

Color must communicate priority, status, brand meaning, or interaction state. If a color does not serve a clear purpose, remove it.

### 2. Avoid decorative glow effects

Do not add glowing text, radial light blooms, aurora backgrounds, excessive gradients, or soft neon shadows unless they communicate a specific interaction or state.

Dark mode should rely on:

- Strong typography
- Clear contrast
- Thoughtful surface levels
- Accessible text and component states

Do not use glow effects simply to make the UI feel "modern," "premium," "AI-like," or "futuristic."

### 3. Do not use emojis as UI icons

Avoid using emojis as:

- Navigation icons
- Section icons
- Bullet replacements
- Status markers
- Decorative interface elements

Use a consistent icon system instead. Icons should share the same visual style, stroke weight, size, spacing, and meaning. Emojis may only appear in conversational or informal microcopy when they support tone, not structure.

### 4. Do not default to purple-blue gradients

Do not apply purple, indigo, blue, or neon gradients by default. Gradients should not be used just because the product is technical, AI-related, SaaS-based, or "modern."

Choose colors based on:

- Product identity
- Brand values
- Audience
- Accessibility
- Visual hierarchy

If the gradient has no brand or functional reason, use a flat color or neutral surface instead.

### 5. Do not put every block of content inside cards

Avoid excessive card nesting. Do not create cards inside cards inside more cards unless each card represents a distinct, independently actionable object.

Use whitespace, spacing, proximity, typography, and layout structure before adding borders or containers.

Cards should be used only when they help the user understand that an item is:

- Clickable
- Selectable
- Independently grouped
- Comparable with similar items
- A self-contained object

Most text sections do not need a box around them.

### 6. Avoid random multicolored side tabs

Do not add colored side bars, side tabs, or accent strips to every content block. Do not cycle through red, blue, green, orange, purple, or other colors without a defined system.

Accent marks must follow a rule, such as:

- Current selected item
- Warning/error/success state
- Priority level
- Category with a documented legend

If every block has an accent, nothing is emphasized. Use accent color sparingly.

### 7. Status indicators must mean something

Do not add colored dots, pills, badges, or status markers unless they represent a real state that the user can understand.

Every status indicator must have:

- A defined meaning
- A consistent color mapping
- A nearby label or obvious context
- A reason for being shown

Do not use dots or badges as decoration. If the status is not actionable or informative, remove it.

### 8. Prioritize hierarchy over decoration

The UI must clearly answer:

- What is the most important thing on the screen?
- What should the user do next?
- Which information is primary, secondary, or supporting?
- Which elements are interactive?
- Which elements are only informational?

Use size, spacing, alignment, contrast, and typography to create hierarchy before adding colors, effects, icons, or containers.

### 9. Design from product context, not trends

Before creating UI, identify:

- The user's goal
- The product's purpose
- The emotional tone of the interface
- The main action on the page
- The information hierarchy
- The brand or domain context

Do not generate generic "modern SaaS," "AI dashboard," or "startup landing page" visuals. The interface should feel specific to the product and audience.

### 10. Accessibility and usability requirements

All generated UI must follow basic accessibility expectations:

- Text must have sufficient contrast.
- Interactive elements must be visually clear.
- Color must not be the only way to communicate meaning.
- Buttons and links must have clear labels.
- Spacing must support readability.
- Decorative elements must not interfere with comprehension.

### 11. Final UI review checklist

Before finalizing any UI, check the following:

- Are there more than two accent colors? If yes, simplify.
- Are glow effects decorative rather than functional? If yes, remove them.
- Are emojis being used as icons or structure? If yes, replace them.
- Are gradients used without a brand reason? If yes, remove or simplify.
- Are there unnecessary cards or nested containers? If yes, flatten the layout.
- Are side tabs or accent bars applied randomly? If yes, remove or systematize them.
- Are status dots or badges meaningful and labeled? If no, remove them.
- Is the visual hierarchy obvious within five seconds? If no, revise layout, spacing, and typography.
- Does the UI look specific to this product, or could it belong to any AI-generated SaaS page? If it feels generic, redesign with stronger product intent.

### 12. Default design direction

When uncertain, choose restraint.

Prefer:

- Clean layouts
- Fewer colors
- Clear typography
- Strong spacing
- Minimal decoration
- Purposeful components
- Consistent iconography
- Meaningful interaction states

Avoid:

- Neon overload
- Random gradients
- Decorative glow
- Emoji-based UI
- Excessive cards
- Rainbow accents
- Meaningless status dots
- Generic AI-dashboard aesthetics

Remember: This is an AI-powered resume optimization platform. Always prioritize data integrity, security, and the quality of AI-generated customizations.
