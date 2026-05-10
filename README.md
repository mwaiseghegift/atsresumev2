# ATS Resume V2

A cutting-edge resume builder that leverages AI to optimize resumes for Applicant Tracking Systems (ATS). Using Google's Gemini AI, this application intelligently customizes resumes based on specific job descriptions, improving match scores and visibility in automated hiring systems.

## Features

- **AI-Powered Resume Customization**: Automatically tailor resumes to specific job postings using advanced AI
- **ATS Optimization**: Optimize content for Applicant Tracking Systems with keyword matching and formatting
- **Match Scoring**: Get compatibility scores (0-100) for resume-job alignment
- **Interactive Resume Builder**: Drag-and-drop interface for creating professional resumes
- **Real-time Preview**: See changes instantly with live preview functionality
- **User Authentication**: Secure user accounts with personalized resume storage
- **Quick Preview Mode**: Test customizations without saving to database
- **Detailed AI Notes**: Receive comprehensive feedback on customization changes
- **Cross-Platform**: Works on Windows, macOS, and Linux

## Technology Stack

### Backend

- **Django 6.0.3** - REST API framework
- **Django REST Framework 3.15.2** - API development
- **Google Gemini AI** - Resume customization engine
- **SQLite** - Database (development)
- **Python 3.10+** - Runtime

### Frontend

- **Next.js 16.1.6** - React framework
- **React 19.2.4** - UI library
- **Tailwind CSS 4.2.1** - Styling framework
- **TypeScript 5.9.3** - Type safety
- **@hello-pangea/dnd** - Drag and drop functionality

### Development Tools

- **Virtual Environment** - Python dependency management
- **npm** - Node.js package management
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## Prerequisites

Before running this application, make sure you have:

- **Python 3.10 or higher**
- **Node.js 18 or higher** and **npm**
- **Git** for version control
- **Google Gemini API Key** (free from [Google AI Studio](https://makersuite.google.com/app/apikey))

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sauravhathi/atsresume.git
cd atsresume
```

### 2. Backend Setup (Django API)

```bash
# Navigate to API directory
cd api

# Create virtual environment
python -m venv env

# Activate virtual environment
# Windows:
env\Scripts\activate
# Linux/Mac:
source env/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env file and add your Gemini API key:
# GEMINI_API_KEY=your_actual_api_key_here

# Run database migrations
python manage.py migrate

# (Optional) Create superuser for Django admin
python manage.py createsuperuser
```

### 3. Frontend Setup (Next.js)

```bash
# Navigate to UI directory
cd ../ui

# Install Node.js dependencies
npm install
```

### 4. Start the Application

#### Option A: Run Both Services (Recommended)

**Windows:**

```bash
# From project root directory
run.bat
```

**Linux/Mac:**

```bash
# From project root directory
chmod +x run.sh
./run.sh
```

#### Option B: Run Services Manually

**Terminal 1 - Backend:**

```bash
cd api
env\Scripts\activate  # Windows
source env/bin/activate  # Linux/Mac
python manage.py runserver
```

**Terminal 2 - Frontend:**

```bash
cd ui
npm run dev
```

### 5. Access the Application

- **Frontend**: <http://localhost:3000>
- **Backend API**: <http://localhost:8000>
- **Django Admin**: <http://localhost:8000/admin> (if superuser created)

## Usage

### Creating a Resume

1. **Access the Builder**: Navigate to the resume builder interface
2. **Fill Personal Information**: Add your contact details, professional summary
3. **Add Experience**: Include work history with detailed descriptions
4. **Include Education**: Add educational background and certifications
5. **List Skills**: Add technical and soft skills
6. **Add Projects**: Showcase relevant projects and achievements

### AI Customization

1. **Click Customize Button**: Use the floating action button in the bottom-right
2. **Enter Job Details**: Provide job title, company, description, and requirements
3. **Choose Mode**:
   - **Preview**: Test customization without saving
   - **Save**: Store customized version in your account
4. **Review Results**: See match score and detailed AI recommendations
5. **Apply Changes**: Accept the AI-optimized resume

### Managing Resumes

- **Save Drafts**: Store work-in-progress resumes
- **Track Customizations**: View history of AI-customized versions
- **Export**: Generate PDF versions for job applications

## 🔌 API Documentation

The backend provides a RESTful API for all operations. Key endpoints:

### Authentication

- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/me/` - Get current user info

### Resume Management

- `GET /api/resumes/` - List user resumes
- `POST /api/resumes/` - Create new resume
- `GET /api/resumes/{id}/` - Get specific resume
- `PUT /api/resumes/{id}/` - Update resume
- `DELETE /api/resumes/{id}/` - Delete resume

### AI Customization

- `POST /api/customize/` - Customize and save resume
- `POST /api/quick-customize/` - Preview customization

### Job Descriptions

- `GET /api/job-descriptions/` - List saved job descriptions
- `POST /api/job-descriptions/` - Save job description
- `GET /api/job-descriptions/{id}/` - Get specific job
- `PUT /api/job-descriptions/{id}/` - Update job description
- `DELETE /api/job-descriptions/{id}/` - Delete job description

### Customized Resumes

- `GET /api/customized-resumes/` - List customized versions
- `GET /api/customized-resumes/{id}/` - Get specific customization

## Project Structure

```
atsresumev2/
├── api/                          # Django Backend
│   ├── config/                   # Django settings
│   ├── core/                     # Main app (AI, models, views)
│   ├── accounts/                 # User management
│   ├── collection/bruno/         # API documentation
│   ├── db.sqlite3                # Database
│   ├── manage.py                 # Django CLI
│   ├── requirements.txt          # Python dependencies
│   └── README.md                 # Backend documentation
├── ui/                           # Next.js Frontend
│   ├── src/
│   │   ├── app/                  # Next.js pages
│   │   ├── components/           # React components
│   │   ├── constants/            # API endpoints
│   │   ├── services/             # API services
│   │   ├── context/              # React context
│   │   └── styles/               # Global styles
│   ├── package.json              # Node dependencies
│   └── README.md                 # Frontend documentation
├── docs/                         # Documentation
│   ├── ARCHITECTURE.md           # System architecture
│   ├── GETTING_STARTED.md        # Setup guide
│   └── IMPLEMENTATION_SUMMARY.md # Implementation details
├── .github/                      # GitHub configuration
│   └── copilot-instructions.md   # AI assistant guidelines
├── CLAUDE.md                     # Claude AI instructions
├── run.bat                       # Windows startup script
├── run.sh                        # Linux/Mac startup script
└── README.md                     # This file
```

## Contributing

We welcome contributions! Please follow these guidelines:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Follow the setup instructions above
4. Make your changes following our coding standards

### Code Standards

- **Backend**: Follow Django best practices, use meaningful names, add docstrings
- **Frontend**: Use functional components, proper TypeScript types, follow React best practices
- **AI Integration**: Preserve data structures, handle errors gracefully
- **Security**: Always use CSRF protection, validate inputs, sanitize data

### Testing

- Write tests for new features
- Test AI customization flows thoroughly
- Validate API responses and error handling
- Ensure data integrity across operations

### Pull Requests

1. Update documentation as needed
2. Ensure all tests pass
3. Provide clear description of changes
4. Reference related issues

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Google Gemini AI** for powering the resume customization engine
- **Django Community** for the excellent web framework
- **Next.js Team** for the React framework
- **Open Source Community** for the amazing tools and libraries

## Support

If you encounter any issues or have questions:

1. Check the [Getting Started Guide](docs/GETTING_STARTED.md)
2. Review the [Architecture Documentation](docs/ARCHITECTURE.md)
3. Open an issue on GitHub
4. Check existing issues for similar problems

---

**Made with ❤️ for job seekers worldwide**
