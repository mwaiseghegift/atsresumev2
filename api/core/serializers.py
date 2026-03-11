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
        required_keys = ['personalInfo']
        for key in required_keys:
            if key not in value:
                raise serializers.ValidationError(f"Missing required field: {key}")
        return value
