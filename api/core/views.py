from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Resume, JobDescription, CustomizedResume
from .serializers import (
    ResumeSerializer, JobDescriptionSerializer,
    CustomizedResumeSerializer, CustomizeResumeRequestSerializer
)
from .gemini_service import GeminiService


class ResumeViewSet(viewsets.ModelViewSet):
    """ViewSet for Resume CRUD operations"""
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer


class JobDescriptionViewSet(viewsets.ModelViewSet):
    """ViewSet for JobDescription CRUD operations"""
    queryset = JobDescription.objects.all()
    serializer_class = JobDescriptionSerializer


class CustomizedResumeViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing CustomizedResume records"""
    queryset = CustomizedResume.objects.all()
    serializer_class = CustomizedResumeSerializer
    
    @action(detail=False, methods=['get'])
    def by_resume(self, request):
        """Get all customized resumes for a specific resume"""
        resume_id = request.query_params.get('resume_id')
        if not resume_id:
            return Response(
                {'error': 'resume_id parameter is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        customized_resumes = self.queryset.filter(original_resume_id=resume_id)
        serializer = self.get_serializer(customized_resumes, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_job(self, request):
        """Get all customized resumes for a specific job description"""
        job_id = request.query_params.get('job_id')
        if not job_id:
            return Response(
                {'error': 'job_id parameter is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        customized_resumes = self.queryset.filter(job_description_id=job_id)
        serializer = self.get_serializer(customized_resumes, many=True)
        return Response(serializer.data)


@api_view(['POST'])
def customize_resume(request):
    """
    Customize a resume based on a job description using Gemini AI
    
    Request body:
    {
        "resume_data": {...},  // Complete resume JSON data
        "job_title": "Software Engineer",
        "job_company": "Tech Corp",
        "job_description": "Full job description text...",
        "job_requirements": "Optional specific requirements..."
    }
    """
    serializer = CustomizeResumeRequestSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    data = serializer.validated_data
    
    try:
        # Initialize Gemini service
        gemini_service = GeminiService()
        
        # Save the original resume (optional, for tracking)
        resume = Resume.objects.create(resume_data=data['resume_data'])
        
        # Save the job description
        job_description = JobDescription.objects.create(
            title=data['job_title'],
            company=data.get('job_company', ''),
            description=data['job_description'],
            requirements=data.get('job_requirements', '')
        )
        
        # Customize the resume using Gemini
        customized_data, notes, match_score = gemini_service.customize_resume(
            resume_data=data['resume_data'],
            job_description=data['job_description'],
            job_title=data['job_title'],
            job_requirements=data.get('job_requirements', '')
        )
        
        # Save the customized resume
        customized_resume = CustomizedResume.objects.create(
            original_resume=resume,
            job_description=job_description,
            customized_data=customized_data,
            customization_notes=notes,
            match_score=match_score
        )
        
        # Return the result
        return Response({
            'success': True,
            'customized_resume_id': customized_resume.id,
            'resume_id': resume.id,
            'job_description_id': job_description.id,
            'customized_data': customized_data,
            'customization_notes': notes,
            'match_score': match_score
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def quick_customize(request):
    """
    Quick customize endpoint that doesn't save to database
    Useful for previewing customizations
    
    Request body: Same as customize_resume
    """
    serializer = CustomizeResumeRequestSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    data = serializer.validated_data
    
    try:
        # Initialize Gemini service
        gemini_service = GeminiService()
        
        # Customize the resume using Gemini
        customized_data, notes, match_score = gemini_service.customize_resume(
            resume_data=data['resume_data'],
            job_description=data['job_description'],
            job_title=data['job_title'],
            job_requirements=data.get('job_requirements', '')
        )
        
        # Return the result without saving
        return Response({
            'success': True,
            'customized_data': customized_data,
            'customization_notes': notes,
            'match_score': match_score
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
