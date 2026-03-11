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
        
        # Use the latest fast model for resume customization
        # Using models/gemini-2.5-flash for best performance and cost-effectiveness
        self.model = genai.GenerativeModel('models/gemini-2.5-flash')
    
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

**CRITICAL: Data Structure Requirements**
- The resume has a specific structure that MUST be preserved exactly
- `keyAchievements` field in workExperience MUST be a STRING with newlines (\\n), NOT an array
- Example: "Achievement 1.\\nAchievement 2.\\nAchievement 3."
- All other fields should maintain their original data types (strings, arrays, objects)

**CRITICAL: Text Formatting Requirements**
- DO NOT use markdown formatting (no asterisks **, no underscores _, no backticks `)
- Write all text as PLAIN TEXT without any markdown syntax
- For emphasis, use natural language and strong word choices instead of markdown bold/italic
- Examples:
  * WRONG: "Led **end-to-end delivery** of scalable services"
  * CORRECT: "Led end-to-end delivery of scalable services"
  * WRONG: "Developed _robust_ solutions"
  * CORRECT: "Developed robust solutions"

**Instructions:**
1. Analyze the job description and identify key skills, qualifications, and requirements
2. Optimize the resume by:
   - Tailoring the professional summary to highlight relevant experience for this specific role (MAXIMUM 40 WORDS - keep it concise and impactful)
   - Reordering and emphasizing relevant skills that match the job requirements
   - Adjusting work experience descriptions and keyAchievements to emphasize accomplishments relevant to the job
   - Using keywords from the job description naturally throughout the resume
   - Maintaining truthfulness - do not add false information, only reframe existing content
   - **IMPORTANT: Optimize content length for single-page PDF layout:**
     * Limit work experience entries to 3-4 most relevant positions
     * Focus on recent and relevant experience
     * Consolidate older or less relevant positions
     * Keep skill lists focused on job-relevant skills (aim for 4-6 skills per category)
     * Limit projects to 2-3 most relevant ones
     * Keep descriptions concise and achievement-focused
3. Calculate a match score (0-100) based on how well the candidate fits the job
4. Provide customization notes explaining what changes were made and why

**Summary Guidelines:**
- Keep the summary between 35-40 words maximum
- Focus on the most relevant skills and experience for THIS specific job
- Use strong action words and quantifiable achievements where possible
- Make every word count - remove filler words and redundancies

**Content Length Optimization:**
- Target: Single-page PDF (A4 size, ~297mm height)
- Left sidebar should contain: Summary, Education (2-3 entries), Skills (top 4-6 per category), Languages, Certifications
- Right side should contain: 3-4 work experiences with 2-3 achievements each, 2-3 projects
- Prioritize quality over quantity - each line should add value
- Remove or consolidate less relevant information to maintain clean single-page layout

**Output Format (MUST BE VALID JSON):**
{{
  "customized_resume": {{
    // Complete resume data structure with optimized content
    // MAINTAIN EXACT STRUCTURE: if keyAchievements was a string, keep it as a string with \\n separators
    // Example workExperience item:
    // {{
    //   "company": "Company Name",
    //   "position": "Position",
    //   "description": "Description text",
    //   "keyAchievements": "First achievement.\\nSecond achievement.\\nThird achievement.",
    //   "startYear": "YYYY-MM",
    //   "endYear": "YYYY-MM"
    // }}
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
            
            # Normalize the resume structure to ensure consistency
            customized_resume = self._normalize_resume_structure(customized_resume)
            
            # Clean markdown formatting from all text fields
            customized_resume = self._clean_markdown_formatting(customized_resume)
            
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
    
    def _normalize_resume_structure(self, resume_data):
        """
        Normalize the resume structure to ensure consistency with the original format
        Converts arrays back to strings where needed (e.g., keyAchievements)
        """
        # Handle workExperience keyAchievements
        if 'workExperience' in resume_data and isinstance(resume_data['workExperience'], list):
            for experience in resume_data['workExperience']:
                if 'keyAchievements' in experience:
                    # If keyAchievements is a list, convert it to a string with newlines
                    if isinstance(experience['keyAchievements'], list):
                        experience['keyAchievements'] = '\n'.join(experience['keyAchievements'])
        
        return resume_data
    
    def _clean_markdown_formatting(self, resume_data):
        """
        Remove markdown formatting artifacts from resume text
        Cleans **bold**, __italic__, *emphasis*, _underscores_, etc.
        """
        def clean_text(text):
            if not isinstance(text, str):
                return text
            
            # Remove markdown bold (**text** or __text__)
            text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)
            text = re.sub(r'__([^_]+)__', r'\1', text)
            
            # Remove markdown italic (*text* or _text_) - be careful with underscores in URLs
            text = re.sub(r'(?<!\w)\*([^*]+?)\*(?!\w)', r'\1', text)
            text = re.sub(r'(?<!\w)_([^_]+?)_(?!\w)', r'\1', text)
            
            # Remove markdown code (`text`)
            text = re.sub(r'`([^`]+)`', r'\1', text)
            
            # Remove any remaining isolated asterisks or underscores
            text = re.sub(r'\*\*', '', text)
            text = re.sub(r'__', '', text)
            
            return text
        
        def clean_dict(data):
            if isinstance(data, dict):
                return {key: clean_dict(value) for key, value in data.items()}
            elif isinstance(data, list):
                return [clean_dict(item) for item in data]
            elif isinstance(data, str):
                return clean_text(data)
            else:
                return data
        
        return clean_dict(resume_data)
    
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
