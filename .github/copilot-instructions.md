# Copilot Instructions for atsresumev2

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

---

## Next.js (JavaScript) UI
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

---

## Django API (Python)
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

---

## Collaboration & Documentation
- Document all new endpoints in Bruno format under `api/collection/bruno/`.
- Keep README files up to date for both frontend and backend.
- Use Git for version control and commit often with clear messages.
- Follow best practices for both Next.js and Django projects.
