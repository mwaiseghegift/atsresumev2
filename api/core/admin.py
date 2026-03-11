from django.contrib import admin
from .models import Resume, JobDescription, CustomizedResume


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ['id', 'created_at', 'updated_at']
    list_filter = ['created_at', 'updated_at']
    search_fields = ['resume_data']
    readonly_fields = ['created_at', 'updated_at']
    
    def has_add_permission(self, request):
        return True


@admin.register(JobDescription)
class JobDescriptionAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'company', 'created_at']
    list_filter = ['created_at']
    search_fields = ['title', 'company', 'description', 'requirements']
    readonly_fields = ['created_at']


@admin.register(CustomizedResume)
class CustomizedResumeAdmin(admin.ModelAdmin):
    list_display = ['id', 'original_resume', 'job_description', 'match_score', 'created_at']
    list_filter = ['created_at', 'match_score']
    search_fields = ['customization_notes']
    readonly_fields = ['created_at']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('original_resume', 'job_description')
