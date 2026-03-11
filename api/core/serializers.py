from rest_framework import serializers
from .models import Resume, JobDescription, CustomizedResume


class ResumeSerializer(serializers.ModelSerializer):
    """Serializer for Resume model"""
    class Meta:
        model = Resume
        fields = ['id', 'resume_data', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class JobDescriptionSerializer(serializers.ModelSerializer):
    """Serializer for JobDescription model"""
    class Meta:
        model = JobDescription
        fields = ['id', 'title', 'company', 'description', 'requirements', 'created_at']
        read_only_fields = ['id', 'created_at']


class CustomizedResumeSerializer(serializers.ModelSerializer):
    """Serializer for CustomizedResume model"""
    job_description = JobDescriptionSerializer(read_only=True)
    
    class Meta:
        model = CustomizedResume
        fields = [
            'id', 'original_resume', 'job_description', 'customized_data',
            'customization_notes', 'match_score', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class CustomizeResumeRequestSerializer(serializers.Serializer):
    """Serializer for the customize resume request"""
    resume_data = serializers.JSONField()
    job_title = serializers.CharField(max_length=255)
    job_company = serializers.CharField(max_length=255, required=False, allow_blank=True)
    job_description = serializers.CharField()
    job_requirements = serializers.CharField(required=False, allow_blank=True)
    
    def validate_resume_data(self, value):
        """Validate that resume_data contains necessary fields"""
        # Check for either the nested structure (personalInfo) or flat structure (name, email, etc.)
        has_personal_info = 'personalInfo' in value
        has_flat_structure = 'name' in value or 'email' in value
        
        if not has_personal_info and not has_flat_structure:
            raise serializers.ValidationError(
                "Resume data must contain either 'personalInfo' object or personal fields like 'name', 'email', etc."
            )
        
        return value
