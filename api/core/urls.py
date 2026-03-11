from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ResumeViewSet, JobDescriptionViewSet, CustomizedResumeViewSet,
    customize_resume, quick_customize
)

# Create router for viewsets
router = DefaultRouter()
router.register(r'resumes', ResumeViewSet, basename='resume')
router.register(r'job-descriptions', JobDescriptionViewSet, basename='job-description')
router.register(r'customized-resumes', CustomizedResumeViewSet, basename='customized-resume')

# URL patterns
urlpatterns = [
    # Router URLs
    path('', include(router.urls)),
    
    # Custom endpoints
    path('customize/', customize_resume, name='customize-resume'),
    path('quick-customize/', quick_customize, name='quick-customize'),
]
