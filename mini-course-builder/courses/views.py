from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse, Http404
from django.template.loader import render_to_string
from django.shortcuts import get_object_or_404
import io
import logging
import os

os.environ['PKG_CONFIG_PATH'] = '/opt/homebrew/lib/pkgconfig:' + os.environ.get('PKG_CONFIG_PATH', '')
os.environ['DYLD_LIBRARY_PATH'] = '/opt/homebrew/lib:' + os.environ.get('DYLD_LIBRARY_PATH', '')

try:
    import weasyprint
    WEASYPRINT_AVAILABLE = True
except ImportError as e:
    WEASYPRINT_AVAILABLE = False
    logging.error(f"WeasyPrint import failed: {e}")

from .models import CourseRequest
from .services.openai_outline import generate_outline, create_fallback_outline

logger = logging.getLogger(__name__)


@api_view(['POST'])
def generate_view(request):
    """
    Generate course outline using OpenAI and store in database
    """
    try:
        data = request.data
        
        required_fields = ['topic', 'audience', 'modules', 'design']
        for field in required_fields:
            if field not in data:
                return Response(
                    {'error': f'Missing required field: {field}'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        if not isinstance(data['modules'], list) or len(data['modules']) < 3:
            return Response(
                {'error': 'At least 3 modules are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            outline = generate_outline(data)
            logger.info(f"Successfully generated AI outline for: {data['topic']}")
        except Exception as ai_error:
            logger.warning(f"OpenAI generation failed: {str(ai_error)}, using fallback")
            outline = create_fallback_outline(data)
        
        course_request = CourseRequest.objects.create(
            topic=data['topic'],
            audience=data['audience'],
            modules=data['modules'],
            design=data['design'],
            ai_payload=outline
        )
        
        return Response({
            'outline': outline,
            'request_id': str(course_request.id),
            'topic': course_request.topic,
            'audience': course_request.audience,
            'modules': course_request.modules,
            'design': course_request.design,
            'created_at': course_request.created_at.isoformat(),
            'ai_payload': outline
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        logger.error(f"Course generation error: {str(e)}")
        return Response(
            {'error': f'Failed to generate course: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def pdf_view(request, request_id):
    """
    Generate and return PDF for the course outline
    """
    try:
        course_request = get_object_or_404(CourseRequest, id=request_id)
        
        context = {
            'course': course_request,
            'outline': course_request.ai_payload,
            'design': course_request.design
        }
        
        modules_count = len(course_request.ai_payload.get('modules', []))
        logger.info(f"PDF generation for course '{course_request.topic}': {modules_count} modules")
        
        template_name = f'pdf_templates/{course_request.design}.html'
        
        html_string = render_to_string(template_name, context)
        
        if not WEASYPRINT_AVAILABLE:
            logger.error("WeasyPrint is not available")
            return Response(
                {'error': 'PDF generation service is not available. Please check WeasyPrint installation.'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        try:
            html_doc = weasyprint.HTML(string=html_string)
            
            pdf_bytes = html_doc.write_pdf(
                optimize_images=True,
                pdf_version='1.7'
            )
            
            logger.info(f"Successfully generated PDF for course '{course_request.topic}' with {modules_count} modules")
            
            safe_filename = course_request.topic.replace(" ", "-").replace("/", "-").lower()
            response = HttpResponse(pdf_bytes, content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="course-{safe_filename}.pdf"'
            return response
        except Exception as pdf_error:
            logger.error(f"PDF generation error: {str(pdf_error)}")
            return Response(
                {'error': 'Error generating PDF'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
    except CourseRequest.DoesNotExist:
        raise Http404("Course request not found")
    except Exception as e:
        logger.error(f"PDF generation failed: {str(e)}")
        return Response(
            {'error': f'Failed to generate PDF: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
