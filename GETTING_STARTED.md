# 🚀 Getting Started with ATS Resume AI Customization

This guide will help you set up and run the complete ATS Resume project with AI-powered resume customization using Google Gemini.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.10+** (for the Django backend)
- **Node.js 18+** and **npm** (for the Next.js frontend)
- **Git** (for version control)
- **Google Gemini API Key** (get one free at <https://makersuite.google.com/app/apikey>)

## 🏗️ Project Structure

```
atsresumev2/
├── api/              # Django REST API Backend
│   ├── core/         # Main app with AI customization logic
│   ├── config/       # Django settings
│   └── manage.py
└── ui/               # Next.js Frontend
    └── src/
        ├── app/
        └── components/
```

## 🔧 Backend Setup (Django API)

### 1. Navigate to API Directory

```bash
cd api
```

### 2. Create and Activate Virtual Environment (Windows)

```bash
python -m venv env
env\Scripts\activate
```

For Linux/Mac:

```bash
python3 -m venv env
source env/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the `api` directory:

```bash
# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

Edit the `.env` file and add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 5. Run Migrations

```bash
python manage.py migrate
```

### 6. Create a Superuser (Optional, for Django Admin)

```bash
python manage.py createsuperuser
```

### 7. Start the Backend Server

```bash
python manage.py runserver
```

The API will be available at: **<http://localhost:8000>**

Django Admin: **<http://localhost:8000/admin>**

## 🎨 Frontend Setup (Next.js UI)

### 1. Open a New Terminal and Navigate to UI Directory

```bash
cd ui
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The frontend will be available at: **<http://localhost:3000>**

## ✅ Verify Everything is Working

### Test the Backend API

Open your browser or use cURL to test the API:

```bash
curl http://localhost:8000/api/resumes/
```

You should see an empty array `[]` indicating the API is working.

### Test the Frontend

1. Open **<http://localhost:3000>** in your browser
2. You should see the resume builder interface
3. Look for the **"Customize for Job"** floating button in the bottom-right corner

## 🎯 How to Use the AI Customization Feature

### 1. Build Your Resume

- Fill in your personal information
- Add your work experience
- List your skills and education
- The resume preview updates in real-time

### 2. Customize for a Job

- Click the **"Customize for Job"** button (bottom-right floating button)
- A modal will open with the following fields:
  - **Job Title**: Enter the position you're applying for
  - **Company**: (Optional) The company name
  - **Job Description**: Paste the full job posting
  - **Requirements**: (Optional) Specific requirements or qualifications

### 3. Get AI Optimization

- Click **"Preview Customization"** to see the changes without saving
- Or click **"Save & Apply"** to save the customization to the database
- The AI will:
  - Analyze the job requirements
  - Optimize your resume content
  - Calculate a match score (0-100)
  - Provide customization notes

### 4. Review Results

- See your **match score** with a visual progress bar
- Read the **customization notes** explaining what changed
- Click **"Apply Changes"** to update your resume with the optimized version
- Or click **"Try Another Job"** to customize for a different position

## 📡 API Endpoints

All endpoints are prefixed with `/api/`

### Main Endpoints

- `POST /api/customize/` - Customize resume and save to database
- `POST /api/quick-customize/` - Preview customization without saving
- `GET /api/resumes/` - List all resumes
- `GET /api/job-descriptions/` - List all job descriptions
- `GET /api/customized-resumes/` - List all customizations

For detailed API documentation, see [api/README.md](api/README.md)

## 🐛 Troubleshooting

### Backend Issues

**"GEMINI_API_KEY not found in settings"**

- Make sure the `.env` file exists in the `api` directory
- Verify the API key is correctly set: `GEMINI_API_KEY=your_key`
- Restart the Django server after adding the API key

**Port 8000 already in use**

```bash
# Run on a different port
python manage.py runserver 8001
```

**CORS errors**

- Make sure the Django server is running
- Check that `http://localhost:3000` is in `CORS_ALLOWED_ORIGINS` in `settings.py`

### Frontend Issues

**Port 3000 already in use**

```bash
# Next.js will automatically prompt for a different port
# Or specify manually:
next dev -p 3001
```

**API connection errors**

- Verify the backend is running on `http://localhost:8000`
- Check the `fetch` URL in `JobCustomizer.jsx` matches your backend URL
- Look for CORS errors in the browser console

**"Module not found" errors**

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🔑 Getting a Gemini API Key

1. Visit: <https://makersuite.google.com/app/apikey>
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key and paste it in your `.env` file

**Note**: Gemini offers a generous free tier suitable for development and testing.

## 📊 Database Management

### Using Django Admin

1. Create a superuser: `python manage.py createsuperuser`
2. Access the admin panel: <http://localhost:8000/admin>
3. You can view and manage:
   - Resumes
   - Job Descriptions
   - Customized Resumes

### Using Django Shell

```bash
python manage.py shell
```

```python
from core.models import Resume, JobDescription, CustomizedResume

# View all resumes
Resume.objects.all()

# View all customizations
CustomizedResume.objects.all()
```

## 🚀 Production Deployment Tips

### Backend (Django)

- Set `DEBUG = False` in `settings.py`
- Use a production database (PostgreSQL, MySQL)
- Set up proper static file serving
- Use environment variables for all secrets
- Consider using Gunicorn or uWSGI
- Set up HTTPS

### Frontend (Next.js)

- Build for production: `npm run build`
- Start production server: `npm start`
- Update API URLs to point to your production backend
- Set up proper environment variables

### Environment Variables

Create production `.env` files with:

- Production database credentials
- Production Gemini API key
- Production CORS origins
- Secret keys

## 📚 Additional Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Google Gemini API Docs](https://ai.google.dev/docs)
- [API Documentation](api/README.md)

## 🆘 Need Help?

If you encounter any issues:

1. Check the browser console for frontend errors
2. Check the Django server logs for backend errors
3. Verify all environment variables are set correctly
4. Ensure all dependencies are installed
5. Try restarting both servers

## 🎉 You're All Set

Your ATS Resume Builder with AI-powered customization is now ready to use. Build your resume, customize it for specific jobs, and let the AI help you stand out to recruiters!

Happy job hunting! 🎯
