from django.urls import path
from . import views
 
urlpatterns = [
    path('generate/', views.generate_view, name='generate_course'),
    path('pdf/<uuid:request_id>/', views.pdf_view, name='download_pdf'),
] 