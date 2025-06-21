Mini Course Builder

Tech Stack

Backend:
- Django
- Django REST Framework
- weasyprint (PDF generation)
- OpenAI SDK

Frontend:
- React (Vite)
- Tailwind CSS
- Axios

Features

- Course Generator Form
- AI-Powered Outline Generation
- PDF Export (WeasyPrint)

Usage:
cd mini-course-builder
# Build and start all services
docker-compose up --build
# Or run in background
docker-compose up --build -d
# Stop services
docker-compose down
# View logs
docker-compose logs -f

```
git clone https://github.com/blxitze/thesis..git
cd mini-course-builder

echo "OPENAI_API_KEY=their-key-here" > .env

docker compose up --build
```