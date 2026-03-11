"""
Quick test script to verify the Gemini AI customization is working
Run this after starting the Django server
"""

import requests
import json

# API endpoint
BASE_URL = "http://localhost:8000/api"

# Sample resume data
sample_resume = {
    "personalInfo": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+1 (555) 123-4567",
        "location": "San Francisco, CA",
        "linkedin": "linkedin.com/in/johndoe",
        "github": "github.com/johndoe"
    },
    "summary": "Experienced software engineer with 5+ years in full-stack development. Passionate about building scalable web applications and leading development teams.",
    "experience": [
        {
            "company": "Tech Solutions Inc",
            "position": "Senior Software Engineer",
            "location": "San Francisco, CA",
            "startDate": "2020-01",
            "endDate": "Present",
            "description": "Lead developer for multiple web applications. Implemented microservices architecture and improved system performance by 40%."
        },
        {
            "company": "Digital Innovations",
            "position": "Software Engineer",
            "location": "San Francisco, CA",
            "startDate": "2018-06",
            "endDate": "2019-12",
            "description": "Developed and maintained e-commerce platform serving 100K+ users. Built RESTful APIs and implemented payment integrations."
        }
    ],
    "skills": [
        "JavaScript", "Python", "React", "Node.js", "Django",
        "PostgreSQL", "MongoDB", "AWS", "Docker", "Git"
    ],
    "education": [
        {
            "degree": "B.S. Computer Science",
            "institution": "University of California, Berkeley",
            "location": "Berkeley, CA",
            "graduationDate": "2018-05",
            "gpa": "3.8"
        }
    ]
}

# Sample job description
sample_job = {
    "job_title": "Senior Full Stack Developer",
    "job_company": "Amazing Tech Corp",
    "job_description": """
    We are seeking a Senior Full Stack Developer to join our growing engineering team.
    You will be responsible for designing and developing scalable web applications.
    
    Responsibilities:
    - Design and implement new features for our web platform
    - Work with React on the frontend and Node.js/Django on the backend
    - Collaborate with product managers and designers
    - Mentor junior developers
    - Optimize application performance
    
    Technologies we use:
    - Frontend: React, TypeScript, Next.js
    - Backend: Node.js, Python, Django
    - Database: PostgreSQL, Redis
    - Cloud: AWS (EC2, S3, Lambda)
    - DevOps: Docker, Kubernetes, CI/CD
    """,
    "job_requirements": """
    - 5+ years of professional software development experience
    - Strong proficiency in JavaScript and Python
    - Experience with React and Node.js
    - Knowledge of RESTful API design
    - Experience with cloud platforms (AWS preferred)
    - Strong problem-solving skills
    - Excellent communication skills
    """
}

def test_quick_customize():
    """Test the quick customize endpoint (doesn't save to DB)"""
    print("🧪 Testing Quick Customize Endpoint...")
    print("-" * 60)
    
    payload = {
        "resume_data": sample_resume,
        **sample_job
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/quick-customize/",
            json=payload,
            timeout=60  # Gemini API can take some time
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Success!")
            print(f"\n📊 Match Score: {result.get('match_score', 0):.1f}%")
            print(f"\n📝 Customization Notes:\n{result.get('customization_notes', '')[:300]}...")
            print("\n✨ The API is working correctly!")
            return True
        else:
            print(f"❌ Error: {response.status_code}")
            print(response.text)
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to the API.")
        print("Make sure the Django server is running on http://localhost:8000")
        return False
    except requests.exceptions.Timeout:
        print("⏱️ Request timed out. The Gemini API might be slow.")
        print("Try running the test again.")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {str(e)}")
        return False

def test_save_customize():
    """Test the customize endpoint (saves to DB)"""
    print("\n\n🧪 Testing Save Customize Endpoint...")
    print("-" * 60)
    
    payload = {
        "resume_data": sample_resume,
        **sample_job
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/customize/",
            json=payload,
            timeout=60
        )
        
        if response.status_code == 201:
            result = response.json()
            print("✅ Success! Customization saved to database.")
            print(f"\n📊 Match Score: {result.get('match_score', 0):.1f}%")
            print(f"🆔 Customized Resume ID: {result.get('customized_resume_id')}")
            print(f"🆔 Original Resume ID: {result.get('resume_id')}")
            print(f"🆔 Job Description ID: {result.get('job_description_id')}")
            print("\n✨ Both endpoints are working correctly!")
            return True
        else:
            print(f"❌ Error: {response.status_code}")
            print(response.text)
            return False
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def test_list_endpoints():
    """Test that the list endpoints are accessible"""
    print("\n\n🧪 Testing List Endpoints...")
    print("-" * 60)
    
    endpoints = [
        "resumes",
        "job-descriptions",
        "customized-resumes"
    ]
    
    all_good = True
    for endpoint in endpoints:
        try:
            response = requests.get(f"{BASE_URL}/{endpoint}/")
            if response.status_code == 200:
                data = response.json()
                count = len(data) if isinstance(data, list) else data.get('count', 0)
                print(f"✅ GET /api/{endpoint}/ - {count} records")
            else:
                print(f"❌ GET /api/{endpoint}/ - Error {response.status_code}")
                all_good = False
        except Exception as e:
            print(f"❌ GET /api/{endpoint}/ - {str(e)}")
            all_good = False
    
    return all_good

if __name__ == "__main__":
    print("\n" + "="*60)
    print("🚀 ATS Resume API Test Suite")
    print("="*60)
    
    # Test list endpoints first (quick)
    test_list_endpoints()
    
    # Test quick customize (no DB save)
    quick_success = test_quick_customize()
    
    if quick_success:
        # Only test save if quick test passed
        user_input = input("\n\nDo you want to test the save endpoint? (saves to DB) [y/N]: ")
        if user_input.lower() in ['y', 'yes']:
            test_save_customize()
    
    print("\n" + "="*60)
    print("🏁 Testing Complete!")
    print("="*60 + "\n")
