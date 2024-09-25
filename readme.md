# AI-Powered Web Application

Welcome to our AI-powered web application project! This README provides comprehensive instructions for setting up and using the development environment.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Prerequisites](#prerequisites)
4. [Getting Started](#getting-started)
5. [Development Workflow](#development-workflow)
6. [Project Structure](#project-structure)
7. [Making Changes](#making-changes)
8. [Deployment](#deployment)
9. [Additional Resources](#additional-resources)

## Project Overview

This project is an AI-powered web application that combines a React frontend with a FastAPI backend. It features a bio page and an AI chat interface, designed to be scalable, maintainable, and easy to develop.

## Technology Stack

- Frontend: React 17 with TypeScript, styled-components
- Backend: FastAPI (Python 3.9+)
- Containerization: Docker and Docker Compose

## Prerequisites

Ensure you have the following installed:

- Docker and Docker Compose
- Make
- Node.js 14+ and npm (for local frontend development)
- Python 3.9+ (for local backend development)

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-repo/ai-powered-web-app.git
   cd ai-powered-web-app
   ```

2. Build and start the development environment:
   ```
   make setup-dev
   make start-dev
   ```

3. Access the application:
   - Frontend: http://localhost:3002
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Development Workflow

Our development environment is containerized using Docker for consistency across different machines.

### Common Commands

- Start the development server: `make start-dev`
- Stop the development server: `make stop-dev`
- Rebuild containers: `make rebuild`
- View logs: `make logs`

### Making Changes

- Frontend: Edit files in `frontend/src`. Changes will hot-reload.
- Backend: Edit files in `backend/app`. Restart the backend container to apply changes.

### Adding Dependencies

- Frontend: Add to `frontend/package.json`, then run `make rebuild`
- Backend: Add to `backend/requirements.txt`, then run `make rebuild`

## Project Structure

```
.
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIDemo.tsx
│   │   │   ├── Bio.tsx
│   │   │   ├── Skills.tsx
│   │   │   └── common/
│   │   │       ├── Button.tsx
│   │   │       └── Card.tsx
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   └── index.ts
│   │   ├── styles/
│   │   │   └── theme.ts
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── global.css
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── backend/
│   ├── app/
│   │   └── main.py
│   │   └── routers/
│   │      └── ai_routes.py
│   ├── Dockerfile
│   ├── .env
│   └── requirements.txt
├── infrastructure/
│   └── docker-compose.yml
├── .gitignore
├── Makefile
├── README.md
└── prompt.md
```

## Deployment

Currently, the project is set up for local development only. For production deployment, you would need to:

1. Set up a production-ready server environment
2. Configure environment variables for production settings
3. Build production-optimized Docker images
4. Set up a reverse proxy (e.g., Nginx) to serve the application
5. Implement proper security measures (HTTPS, secure headers, etc.)

## Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Docker Documentation](https://docs.docker.com/)

Remember, development is an iterative process. Don't be afraid to experiment, make mistakes, and learn from them. Happy coding!
