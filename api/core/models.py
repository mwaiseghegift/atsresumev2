from django.db import models
from django.conf import settings
import json

class Resume(models.Model):
    """Model to store resume data"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='resumes', null=True, blank=True)
    resume_data = models.JSONField(help_text="Complete resume data in JSON format")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Resume {self.id} - Created: {self.created_at.strftime('%Y-%m-%d')}"
    
    class Meta:
        ordering = ['-created_at']


class JobDescription(models.Model):
    """Model to store job descriptions"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='job_descriptions', null=True, blank=True)
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255, blank=True)
    description = models.TextField(help_text="Full job description text")
    requirements = models.TextField(blank=True, help_text="Specific job requirements")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.title} at {self.company}" if self.company else self.title
    
    class Meta:
        ordering = ['-created_at']


class CustomizedResume(models.Model):
    """Model to store customized resumes"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='customized_resumes_owned', null=True, blank=True)
    original_resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='customizations')
    job_description = models.ForeignKey(JobDescription, on_delete=models.CASCADE, related_name='customized_resumes')
    customized_data = models.JSONField(help_text="Customized resume data optimized for the job")
    customization_notes = models.TextField(blank=True, help_text="AI-generated notes about the customization")
    match_score = models.FloatField(null=True, blank=True, help_text="Compatibility score (0-100)")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Customized Resume {self.id} for {self.job_description.title}"
    
    class Meta:
        ordering = ['-created_at']
