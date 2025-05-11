# TazeAI Engine

This is the FastAPI backend service for TazeAI Engine.

## Local Development

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the development server:
```bash
python main.py
```

The server will start at http://localhost:8000

## API Documentation

Once the server is running, you can access:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Deployment to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Environment Variables

Create a `.env` file for local development with the following variables:
```
ENVIRONMENT=development
```

Note: For production deployment, set these variables in your Vercel project settings. 