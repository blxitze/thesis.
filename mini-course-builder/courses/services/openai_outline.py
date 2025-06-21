import openai
from django.conf import settings
import json
import re


def generate_outline(data):
    openai.api_key = settings.OPENAI_API_KEY
    
    topic = data.get('topic', '')
    modules_str = ', '.join(data.get('modules', []))
    audience_level = data.get('audience', 'beginners')
    
    audience_context = {
        'beginners': 'complete newcomers who need step-by-step guidance and foundational knowledge',
        'intermediate': 'with some experience who want to deepen their skills and learn best practices',
        'advanced': 'who want to master complex scenarios and advanced techniques',
        'professionals': 'seeking expert-level strategies and leadership skills'
    }
    
    audience_description = audience_context.get(audience_level, audience_context['beginners'])
    
    topic_lower = topic.lower()
    
    if any(word in topic_lower for word in ['programming', 'coding', 'software', 'web', 'app', 'development', 'tech', 'data', 'ai', 'machine learning']):
        topic_category = "technology"
        example_resources = "GitHub, VS Code, Stack Overflow, documentation"
        example_objectives = [
            "BAD: 'Understand programming basics'",
            "GOOD: 'Build a working calculator app with error handling and user input validation'",
            "BAD: 'Learn about databases'", 
            "GOOD: 'Design and implement a user authentication system with PostgreSQL and secure password hashing'"
        ]
    elif any(word in topic_lower for word in ['design', 'art', 'creative', 'graphic', 'ui', 'ux', 'visual']):
        topic_category = "design"
        example_resources = "Figma, Adobe Creative Suite, Canva, Sketch"
        example_objectives = [
            "BAD: 'Learn design principles'",
            "GOOD: 'Create a complete brand identity with logo, color palette, and style guide'",
            "BAD: 'Understand user experience'",
            "GOOD: 'Design and prototype a mobile app interface with user testing and iteration'"
        ]
    elif any(word in topic_lower for word in ['business', 'marketing', 'sales', 'entrepreneur', 'finance', 'management']):
        topic_category = "business"
        example_resources = "Google Analytics, HubSpot, Canva, Excel/Sheets"
        example_objectives = [
            "BAD: 'Understand marketing basics'",
            "GOOD: 'Launch a social media campaign that generates 100 qualified leads in 30 days'",
            "BAD: 'Learn about business strategy'",
            "GOOD: 'Create a 12-month business plan with financial projections and market analysis'"
        ]
    elif any(word in topic_lower for word in ['language', 'english', 'spanish', 'french', 'writing', 'grammar', 'literature']):
        topic_category = "language"
        example_resources = "Duolingo, Grammarly, language exchange apps, dictionaries"
        example_objectives = [
            "BAD: 'Learn grammar rules'",
            "GOOD: 'Write a 500-word essay using complex sentence structures and advanced vocabulary'",
            "BAD: 'Understand pronunciation'",
            "GOOD: 'Record yourself speaking for 5 minutes with 90% pronunciation accuracy'"
        ]
    elif any(word in topic_lower for word in ['music', 'instrument', 'piano', 'guitar', 'singing', 'composition']):
        topic_category = "music"
        example_resources = "Music notation software, metronome apps, online lessons, sheet music"
        example_objectives = [
            "BAD: 'Learn music theory'",
            "GOOD: 'Compose and perform a 2-minute piece using major and minor scales'",
            "BAD: 'Practice instrument'",
            "GOOD: 'Play a complete song from memory with proper rhythm and dynamics'"
        ]
    elif any(word in topic_lower for word in ['health', 'fitness', 'nutrition', 'wellness', 'exercise', 'yoga']):
        topic_category = "health"
        example_resources = "Fitness apps, nutrition trackers, workout videos, health journals"
        example_objectives = [
            "BAD: 'Learn about nutrition'",
            "GOOD: 'Create a personalized meal plan that meets your daily macro and micronutrient needs'",
            "BAD: 'Understand exercise'",
            "GOOD: 'Complete a 30-day workout program and track strength improvements'"
        ]
    elif any(word in topic_lower for word in ['science', 'physics', 'chemistry', 'biology', 'research', 'lab']):
        topic_category = "science"
        example_resources = "Lab equipment, research databases, simulation software, scientific journals"
        example_objectives = [
            "BAD: 'Understand scientific concepts'",
            "GOOD: 'Design and conduct an experiment with hypothesis, methodology, and data analysis'",
            "BAD: 'Learn about research'",
            "GOOD: 'Write a research paper with peer-reviewed sources and statistical analysis'"
        ]
    else:
        topic_category = "general"
        example_resources = "Books, online resources, practice materials, community forums"
        example_objectives = [
            "BAD: 'Understand the basics'",
            "GOOD: 'Complete a practical project that demonstrates mastery of key concepts'",
            "BAD: 'Learn the fundamentals'",
            "GOOD: 'Create something tangible that showcases your new skills'"
        ]

    prompt = f"""
    Create a professional course outline for: "{topic}"
    Target Audience: {audience_level.title()} - learners {audience_description}
    Core Modules to Include: {modules_str}
    Topic Category: {topic_category}
    
    CRITICAL CONTEXT AWARENESS:
    - This course is about "{topic}" - NOT technology or programming
    - Only suggest tools/resources that are DIRECTLY relevant to {topic}
    - Use terminology and examples specific to the {topic} field
    - Avoid any technical jargon unless the topic is actually technical
    
    COURSE STRUCTURE REQUIREMENTS:
    1. Start with an "Introduction" or "Getting Started" module (foundations, setup if needed)
    2. Progress logically through the core modules provided
    3. End with a "Capstone Project" module that applies all knowledge to create something real
    4. Each module should build upon previous ones
    5. Include realistic time estimates appropriate for {topic}
    
    LEARNING OBJECTIVES - TOPIC-SPECIFIC EXAMPLES:
    {chr(10).join(example_objectives)}
    
    RESOURCE GUIDELINES:
    - For {topic}, appropriate resources might include: {example_resources}
    - NEVER suggest AWS, GitHub, or coding tools unless the topic is actually about programming
    - Resources should be tools that {topic} practitioners actually use
    - Only include resources when they add real value
    
    CRITICAL REQUIREMENTS:
    1. Write SPECIFIC, actionable learning objectives for {topic}
    2. Describe what learners will BUILD, CREATE, or ACCOMPLISH in the {topic} field
    3. Use terminology and tools specific to {topic}, not generic tech terms
    4. Include measurable outcomes relevant to {topic}
    5. Make durations realistic for {topic} learning: "2 hours", "1 week", "3 days"
    6. Create a logical learning progression for {topic}
    7. The capstone should be a real project that {topic} professionals would create
    
    Return ONLY valid JSON in this exact format:
    {{
        "title": "Specific course title focused on {topic} outcomes",
        "overview": "2-3 sentences explaining what {topic} problem this solves and what learners will create",
        "total_duration": "Realistic total time for learning {topic} (e.g., '6 weeks', '20 hours')",
        "modules": [
            {{
                "title": "Introduction to {topic}" or "Getting Started with {topic}",
                "description": "Foundation module covering {topic} basics and setup",
                "objectives": [
                    "Specific foundational skill in {topic}",
                    "First practical exercise in {topic}",
                    "Basic tool or method setup for {topic}"
                ],
                "duration": "Realistic time estimate",
                "resources": ["Only {topic}-relevant tools if helpful"]
            }},
            {{
                "title": "Core module based on provided modules",
                "description": "Specific {topic} skills and applications",
                "objectives": [
                    "Concrete {topic} deliverable they'll create",
                    "Specific {topic} technique they'll master", 
                    "Measurable {topic} result they'll achieve",
                    "Real-world {topic} application they'll complete"
                ],
                "duration": "Appropriate time estimate",
                "resources": ["Tools specific to this {topic} area"]
            }},
            {{
                "title": "Capstone Project: [Specific {topic} Project Name]",
                "description": "Final {topic} project combining all course knowledge",
                "objectives": [
                    "Complete {topic} project using all course concepts",
                    "Professional {topic} portfolio piece",
                    "Real-world {topic} application or presentation"
                ],
                "duration": "Project completion time",
                "resources": ["Relevant {topic} tools from course"]
            }}
        ]
    }}
    """
    
    try:
        client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system", 
                    "content": f"You are an expert instructional designer specializing in {topic}. You create practical, hands-on courses that help learners build real skills in {topic}. You understand that {topic} has its own tools, terminology, and best practices - you never default to technical or programming solutions unless the topic is actually about technology. Your courses always include an introduction, logical skill progression, and a capstone project that creates something valuable in the {topic} field."
                },
                {
                    "role": "user", 
                    "content": prompt
                }
            ],
            max_tokens=6000,
            temperature=0.7
        )
        
        content = response.choices[0].message.content.strip()
        print(f"OpenAI Response: {content[:200]}...")
        
        if content.startswith('```json'):
            content = re.sub(r'^```json\s*', '', content)
            content = re.sub(r'\s*```$', '', content)
        elif content.startswith('```'):
            content = re.sub(r'^```\s*', '', content)
            content = re.sub(r'\s*```$', '', content)
        
        try:
            outline = json.loads(content)
            
            required_keys = ['title', 'overview', 'modules']
            if not all(key in outline for key in required_keys):
                raise ValueError("Missing required keys in outline")
            
            if 'total_duration' not in outline:
                outline['total_duration'] = "4-6 weeks"
            
            for module in outline['modules']:
                if 'objectives' not in module:
                    module['objectives'] = module.get('key_points', [])
                
                if 'key_points' not in module:
                    module['key_points'] = module.get('objectives', [])
                
                if 'description' not in module:
                    module['description'] = f"Learn essential {module['title']} concepts and techniques"
                
                if 'duration' not in module:
                    module['duration'] = "1 week"
                
                if 'resources' not in module:
                    module['resources'] = []
                
                if module['resources'] and topic_category != "technology":
                    tech_terms = ['github', 'aws', 'docker', 'kubernetes', 'api', 'database', 'server', 'framework']
                    module['resources'] = [
                        resource for resource in module['resources'] 
                        if not any(tech_term in resource.lower() for tech_term in tech_terms)
                    ]
            
            print(f"Successfully parsed AI outline: {outline['title']}")
            return outline
            
        except (json.JSONDecodeError, ValueError) as e:
            print(f"JSON Parse Error: {str(e)}")
            print(f"Content: {content}")
            return create_fallback_outline(data)
        
    except Exception as e:
        print(f"OpenAI API Error: {str(e)}")
        return create_fallback_outline(data)


def create_fallback_outline(data):
    """
    Create a context-aware fallback course outline when AI fails
    """
    topic = data.get('topic', 'Course')
    modules = data.get('modules', [])
    audience = data.get('audience', 'beginners')
    
    topic_lower = topic.lower()
    
    if any(word in topic_lower for word in ['programming', 'coding', 'software', 'web', 'app', 'development']):
        resources = ["Code editor", "Documentation", "Online tutorials"]
        project_type = "application"
        verb = "build"
    elif any(word in topic_lower for word in ['design', 'art', 'creative', 'graphic', 'ui', 'ux']):
        resources = ["Design software", "Templates", "Color palettes"]
        project_type = "design portfolio"
        verb = "create"
    elif any(word in topic_lower for word in ['business', 'marketing', 'sales', 'entrepreneur']):
        resources = ["Templates", "Analytics tools", "Presentation software"]
        project_type = "business plan"
        verb = "develop"
    elif any(word in topic_lower for word in ['language', 'english', 'spanish', 'french', 'writing']):
        resources = ["Dictionary", "Grammar guides", "Practice exercises"]
        project_type = "writing portfolio"
        verb = "write"
    elif any(word in topic_lower for word in ['music', 'instrument', 'piano', 'guitar', 'singing']):
        resources = ["Instrument", "Sheet music", "Metronome"]
        project_type = "performance"
        verb = "perform"
    elif any(word in topic_lower for word in ['health', 'fitness', 'nutrition', 'wellness']):
        resources = ["Tracking apps", "Exercise equipment", "Meal planning tools"]
        project_type = "wellness plan"
        verb = "implement"
    else:
        resources = ["Learning materials", "Practice tools", "Reference guides"]
        project_type = "final project"
        verb = "complete"
    
    course_modules = []
    
    intro_module = {
        "title": f"Introduction to {topic}",
        "description": f"Get started with {topic} fundamentals and set up your learning foundation",
        "objectives": [
            f"Understand the core principles of {topic}",
            f"Set up your {topic} learning environment",
            f"Complete your first {topic} exercise",
            f"Identify your {topic} learning goals"
        ],
        "key_points": [
            f"Understand the core principles of {topic}",
            f"Set up your {topic} learning environment", 
            f"Complete your first {topic} exercise",
            f"Identify your {topic} learning goals"
        ],
        "duration": "1-2 hours",
        "resources": resources[:2] if len(resources) > 1 else resources
    }
    course_modules.append(intro_module)
    
    for i, module in enumerate(modules):
        core_module = {
            "title": module,
            "description": f"Master {module} through practical exercises and real-world applications",
            "objectives": [
                f"Apply {module} techniques to solve practical problems",
                f"{verb.title()} a {module} project from start to finish",
                f"Demonstrate proficiency in {module} best practices",
                f"Analyze and improve your {module} results"
            ],
            "key_points": [
                f"Apply {module} techniques to solve practical problems",
                f"{verb.title()} a {module} project from start to finish", 
                f"Demonstrate proficiency in {module} best practices",
                f"Analyze and improve your {module} results"
            ],
            "duration": "1 week",
            "resources": resources
        }
        course_modules.append(core_module)
    
    capstone_module = {
        "title": f"Capstone Project: {topic} {project_type.title()}",
        "description": f"Combine all course knowledge to {verb} a comprehensive {topic} {project_type}",
        "objectives": [
            f"{verb.title()} a complete {topic} {project_type} using all course concepts",
            f"Present your {project_type} with clear explanations and results",
            f"Demonstrate mastery of all {topic} skills learned in the course",
            f"Create a portfolio piece that showcases your {topic} abilities"
        ],
        "key_points": [
            f"{verb.title()} a complete {topic} {project_type} using all course concepts",
            f"Present your {project_type} with clear explanations and results",
            f"Demonstrate mastery of all {topic} skills learned in the course", 
            f"Create a portfolio piece that showcases your {topic} abilities"
        ],
        "duration": "1-2 weeks",
        "resources": resources
    }
    course_modules.append(capstone_module)
    
    return {
        "title": f"Complete {topic} Course for {audience.title()}",
        "overview": f"Master {topic} through hands-on practice and real-world applications. This comprehensive course takes you from fundamentals to advanced techniques, culminating in a {project_type} that demonstrates your expertise.",
        "total_duration": f"{len(course_modules) + 1} weeks",
        "modules": course_modules
    } 