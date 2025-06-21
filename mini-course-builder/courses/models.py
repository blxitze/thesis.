import uuid
from django.db import models


class CourseRequest(models.Model):
    DESIGN_CHOICES = [
        ('classic', 'Classic'),
        ('modern', 'Modern'),
        ('dark', 'Dark'),
        ('elegant', 'Elegant'),
        ('corporate', 'Corporate'),
        ('creative', 'Creative'),
        ('minimalist', 'Minimalist'),
        ('academic', 'Academic'),
        ('magazine', 'Magazine'),
        ('tech', 'Tech'),
    ]
    
    AUDIENCE_CHOICES = [
        ('beginners', 'Beginners'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
        ('professionals', 'Professionals'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    topic = models.CharField(max_length=255)
    audience = models.CharField(max_length=50, choices=AUDIENCE_CHOICES)
    modules = models.JSONField()  # List of module titles
    design = models.CharField(max_length=20, choices=DESIGN_CHOICES)
    ai_payload = models.JSONField(null=True, blank=True)  # Store OpenAI response
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Course: {self.topic} ({self.audience})"
