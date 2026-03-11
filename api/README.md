# ATS Resume Customization API

## Overview

This API uses Google's Gemini AI to intelligently customize resumes based on specific job descriptions, optimizing them for Applicant Tracking Systems (ATS).

## Features

- ✨ AI-powered resume customization using Gemini
- 🎯 Job-specific keyword optimization
- 📊 Resume-job match scoring (0-100)
- 💾 Save and track customizations
- 🚀 Quick preview without saving

## Setup

### 1. Install Dependencies

```bash
cd api
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create a `.env` file in the `api` directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your API key from: <https://makersuite.google.com/app/apikey>

### 3. Run Migrations

```bash
python manage.py migrate
```

### 4. Start the Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

## API Endpoints

### 1. Customize Resume (Save to Database)

**POST** `/api/customize/`

Customizes a resume for a specific job and saves the result to the database.

**Request Body:**

```json
{
  "resume_data": {
    "personalInfo": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "location": "San Francisco, CA",
      "linkedin": "linkedin.com/in/johndoe"
    },
    "summary": "Experienced software engineer...",
    "experience": [
      {
        "company": "Tech Corp",
        "position": "Senior Developer",
        "startDate": "2020-01",
        "endDate": "Present",
        "description": "Led development of..."
      }
    ],
    "skills": ["JavaScript", "Python", "React", "Node.js"],
    "education": [
      {
        "degree": "B.S. Computer Science",
        "institution": "University of California",
        "graduationDate": "2018"
      }
    ]
  },
  "job_title": "Senior Software Engineer",
  "job_company": "Amazing Tech Inc",
  "job_description": "We are seeking a senior software engineer with expertise in full-stack development...",
  "job_requirements": "5+ years experience with React, Node.js, and cloud platforms..."
}
```

**Response:**

```json
{
  "success": true,
  "customized_resume_id": 1,
  "resume_id": 1,
  "job_description_id": 1,
  "customized_data": {
    "personalInfo": {...},
    "summary": "...",
    "experience": [...],
    "skills": [...],
    "education": [...]
  },
  "customization_notes": "The resume has been optimized to highlight...",
  "match_score": 85.5
}
```

### 2. Quick Customize (Preview Only)

**POST** `/api/quick-customize/`

Customizes a resume without saving to the database. Perfect for previewing changes.

**Request/Response:** Same format as `/api/customize/`

### 3. List Resumes

**GET** `/api/resumes/`

Returns all saved resumes.

### 4. Get Resume by ID

**GET** `/api/resumes/{id}/`

Returns a specific resume.

### 5. List Job Descriptions

**GET** `/api/job-descriptions/`

Returns all saved job descriptions.

### 6. Get Job Description by ID

**GET** `/api/job-descriptions/{id}/`

Returns a specific job description.

### 7. List Customized Resumes

**GET** `/api/customized-resumes/`

Returns all customized resumes.

### 8. Get Customized Resumes by Resume ID

**GET** `/api/customized-resumes/by_resume/?resume_id={id}`

Returns all customizations for a specific resume.

### 9. Get Customized Resumes by Job ID

**GET** `/api/customized-resumes/by_job/?job_id={id}`

Returns all customizations for a specific job description.

## How It Works

1. **User submits** their resume data and a job description
2. **Gemini AI analyzes** the job requirements and identifies key skills/qualifications
3. **AI optimizes** the resume by:
   - Tailoring the professional summary
   - Emphasizing relevant skills and experiences
   - Incorporating job-specific keywords
   - Reordering content for maximum impact
4. **Match score** is calculated (0-100) based on alignment
5. **Customization notes** explain what changed and why

## Resume Data Structure

The `resume_data` field should follow this structure:

```json
{
  "personalInfo": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "linkedin": "string (optional)",
    "github": "string (optional)",
    "website": "string (optional)"
  },
  "summary": "string",
  "experience": [
    {
      "company": "string",
      "position": "string",
      "location": "string (optional)",
      "startDate": "string (YYYY-MM format)",
      "endDate": "string (YYYY-MM or 'Present')",
      "description": "string",
      "highlights": ["string"] (optional)
    }
  ],
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "location": "string (optional)",
      "graduationDate": "string",
      "gpa": "string (optional)",
      "honors": ["string"] (optional)
    }
  ],
  "skills": ["string"],
  "projects": [
    {
      "name": "string",
      "description": "string",
      "technologies": ["string"],
      "link": "string (optional)"
    }
  ] (optional),
  "certifications": [
    {
      "name": "string",
      "issuer": "string",
      "date": "string"
    }
  ] (optional)
}
```

## Error Handling

### Common Error Responses

**400 Bad Request**

```json
{
  "resume_data": ["This field is required."],
  "job_description": ["This field may not be blank."]
}
```

**500 Internal Server Error**

```json
{
  "success": false,
  "error": "Error customizing resume with Gemini: API key not configured"
}
```

## Best Practices

1. **Include comprehensive resume data** - The more information provided, the better the AI can optimize
2. **Provide detailed job descriptions** - Better input = better output
3. **Use quick-customize for testing** - Preview changes before saving
4. **Review AI suggestions** - Always verify the customized content for accuracy
5. **Keep track of customizations** - Use the database endpoints to manage multiple versions

## Testing

### Example cURL Request

```bash
curl -X POST http://localhost:8000/api/quick-customize/ \
  -H "Content-Type: application/json" \
  -d '{
    "resume_data": {
      "personalInfo": {
        "name": "John Doe",
        "email": "john@example.com"
      },
      "summary": "Software engineer with 5 years experience",
      "skills": ["Python", "JavaScript", "React"]
    },
    "job_title": "Full Stack Developer",
    "job_description": "Looking for a full stack developer proficient in Python and React"
  }'
```

## Troubleshooting

### "GEMINI_API_KEY not found in settings"

- Make sure you created a `.env` file with your Gemini API key
- Verify the `.env` file is in the `api` directory

### "Failed to parse Gemini response as JSON"

- The Gemini API occasionally returns malformed responses
- Try the request again
- Check your API key is valid and has quota remaining

### CORS issues from frontend

- Make sure your frontend URL is in `CORS_ALLOWED_ORIGINS` in settings.py
- Default is `http://localhost:3000` for Next.js development

## Next Steps

Now that the backend is ready, integrate it with your Next.js frontend using the React component provided in `ui/src/components/JobCustomizer.jsx`.
