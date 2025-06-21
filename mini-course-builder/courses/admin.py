from django.contrib import admin
from .models import CourseRequest


@admin.register(CourseRequest)
class CourseRequestAdmin(admin.ModelAdmin):
    list_display = ['topic', 'audience', 'design', 'created_at']
    list_filter = ['audience', 'design', 'created_at']
    search_fields = ['topic']
    readonly_fields = ['id', 'created_at', 'updated_at']
