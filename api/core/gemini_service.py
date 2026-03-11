import google.generativeai as genai
from django.conf import settings
import json
import re


class GeminiService:
    """Service class to interact with Google's Gemini API for resume customization"""
    
    def __init__(self):
        """Initialize the Gemini API with API key"""
        if not settings.GEMINI_API_KEY:
            raise ValueError("GEMINI_API_KEY not found in settings")
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-pro')
    
    def customize_resume(self, resume_data, job_description, job_title, job_requirements=""):
        """
        Customize resume based on job description using Gemini AI
        
        Args:
            resume_data (dict): Original resume data
            job_description (str): Job description text
            job_title (str): Job title
            job_requirements (str): Specific job requirements
            
        Returns:
            tuple: (customized_resume_data, customization_notes, match_score)
        """
        try:
            prompt = self._build_customization_prompt(
                resume_data, job_description, job_title, job_requirements
            )
            
            response = self.model.generate_content(prompt)
            result = self._parse_response(response.text)
            
            return result
        except Exception as e:
            raise Exception(f"Error customizing resume with Gemini: {str(e)}")
    
    def _build_customization_prompt(self, resume_data, job_description, job_title, job_requirements):
        """Build the prompt for Gemini API"""
        resume_json = json.dumps(resume_data, indent=2)
        
        prompt = f"""You are an expert resume optimizer specializing in ATS (Applicant Tracking System) optimization.

Your task is to customize and optimize a resume for a specific job posting. Analyze the job requirements and tailor the resume to maximize ATS compatibility and match score.

**Job Title:** {job_title}

**Job Description:**
{job_description}

**Job Requirements:**
{job_requirements if job_requirements else "Not specified"}

**Original Resume Data (JSON):**
{resume_json}

**Instructions:**
1. Analyze the job description and identify key skills, qualifications, and requirements
2. Optimize the resume by:
   - Tailoring the professional summary to highlight relevant experience for this specific role
   - Reordering and emphasizing relevant skills that match the job requirements
   - Adjusting work experience descriptions to emphasize accomplishments relevant to the job
   - Using keywords from the job description naturally throughout the resume
   - Maintaining truthfulness - do not add false information, only reframe existing content
3. Calculate a match score (0-100) based on how well the candidate fits the job
4. Provide customization notes explaining what changes were made and why

**Output Format (MUST BE VALID JSON):**
{{
  "customized_resume": {{
    // Complete resume data structure with optimized content
    // Keep the same structure as the input but with tailored content
  }},
  "customization_notes": "Detailed explanation of the customizations made and strategic recommendations",
  "match_score": 85,  // Number between 0-100
  "key_alignments": ["list", "of", "key", "strengths", "that", "match"],
  "suggested_improvements": ["list", "of", "areas", "to", "improve"]
}}

Please respond ONLY with valid JSON matching the format above."""
        
        return prompt
    
    def _parse_response(self, response_text):
        """Parse the Gemini API response"""
        try:
            # Clean the response text to extract JSON
            # Remove markdown code blocks if present
            json_text = response_text.strip()
            if json_text.startswith('```json'):
                json_text = json_text[7:]
            if json_text.startswith('```'):
                json_text = json_text[3:]
            if json_text.endswith('```'):
                json_text = json_text[:-3]
            json_text = json_text.strip()
            
            # Parse JSON
            result = json.loads(json_text)
            
            # Extract required fields
            customized_resume = result.get('customized_resume', {})
            customization_notes = result.get('customization_notes', '')
            match_score = float(result.get('match_score', 0))
            
            # Add additional insights to notes
            key_alignments = result.get('key_alignments', [])
            suggested_improvements = result.get('suggested_improvements', [])
            
            if key_alignments or suggested_improvements:
                customization_notes += "\n\n**Key Alignments:**\n"
                customization_notes += "\n".join(f"- {item}" for item in key_alignments)
                customization_notes += "\n\n**Suggested Improvements:**\n"
                customization_notes += "\n".join(f"- {item}" for item in suggested_improvements)
            
            return customized_resume, customization_notes, match_score
            
        except json.JSONDecodeError as e:
            # If JSON parsing fails, try to extract information manually
            raise Exception(f"Failed to parse Gemini response as JSON: {str(e)}\nResponse: {response_text[:500]}")
        except Exception as e:
            raise Exception(f"Error parsing Gemini response: {str(e)}")
    
    def analyze_job_market_fit(self, resume_data, job_descriptions):
        """
        Analyze how well a resume fits multiple job descriptions
        
        Args:
            resume_data (dict): Resume data
            job_descriptions (list): List of job description dictionaries
            
        Returns:
            list: Match scores and analysis for each job
        """
        results = []
        for job in job_descriptions:
            try:
                _, notes, score = self.customize_resume(
                    resume_data,
                    job.get('description', ''),
                    job.get('title', ''),
                    job.get('requirements', '')
                )
                results.append({
                    'job_id': job.get('id'),
                    'job_title': job.get('title'),
                    'match_score': score,
                    'analysis': notes
                })
            except Exception as e:
                results.append({
                    'job_id': job.get('id'),
                    'job_title': job.get('title'),
                    'error': str(e)
                })
        return results
