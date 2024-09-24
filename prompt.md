# AI-Powered Web Application Setup Prompt

<<PROJECT_SETUP_PROMPT>>
Create a full-stack AI-powered web application with the following specifications:

<<TECHNOLOGY_STACK>>
- Frontend: React 17 with TypeScript
- Backend: FastAPI (Python 3.9+)
- Containerization: Docker and Docker Compose
<</TECHNOLOGY_STACK>>

<<PROJECT_STRUCTURE>>
Implement the following project structure:
.
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── api/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── backend/
│   ├── app/
│   │   └── main.py
│   ├── Dockerfile
│   └── requirements.txt
├── infrastructure/
│   └── docker-compose.yml
├── .gitignore
└── Makefile
<</PROJECT_STRUCTURE>>

<<FRONTEND_SETUP>>
1. Create a new React application with TypeScript:
   ```
   npx create-react-app frontend --template typescript
   ```

2. Update `frontend/package.json`:
   - Set the version to "0.1.0"
   - Add the following dependencies:
     ```json
     "dependencies": {
       "react": "^17.0.2",
       "react-dom": "^17.0.2",
       "react-router-dom": "^6.3.0",
       "react-scripts": "4.0.3",
       "styled-components": "^5.3.0",
       "react-icons": "^4.2.0",
       "typescript": "^4.3.5",
       "axios": "^0.21.1"
     }
     ```
   - Add to devDependencies:
     ```json
     "devDependencies": {
       "@types/react": "^17.0.0",
       "@types/react-dom": "^17.0.0",
       "@types/react-router-dom": "^5.3.3",
       "@types/styled-components": "^5.1.11",
       "@babel/plugin-proposal-private-property-in-object": "^7.16.7"
     }
     ```
   - Update the "scripts" section:
     ```json
     "scripts": {
       "start": "react-scripts start",
       "build": "react-scripts build",
       "test": "react-scripts test",
       "eject": "react-scripts eject"
     }
     ```

3. Create `frontend/Dockerfile`:
   ```dockerfile
   FROM node:14
   WORKDIR /app
   COPY package*.json ./
   RUN npm cache clean --force && npm install
   COPY . .
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

4. Implement the Calculator component and necessary styling.

5. Ensure `frontend/tsconfig.json` is correctly configured for React and TypeScript.
<</FRONTEND_SETUP>>

<<BACKEND_SETUP>>
1. Create a new directory for the backend:
   ```
   mkdir backend
   cd backend
   ```

2. Create `backend/requirements.txt`:
   ```
   fastapi
   uvicorn
   pydantic
   python-jose[cryptography]
   passlib[bcrypt]
   python-multipart
   PyJWT
   ```

3. Create `backend/Dockerfile`:
   ```dockerfile
   FROM python:3.9
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt
   COPY ./app /app
   CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
   ```

4. Create `backend/app/main.py`:
   ```python
   from fastapi import FastAPI
   from fastapi.middleware.cors import CORSMiddleware
   from pydantic import BaseModel

   app = FastAPI()

   app.add_middleware(
       CORSMiddleware,
       allow_origins=["http://localhost:3000", "http://localhost:3002"],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )

   class CalculationRequest(BaseModel):
       operation: str
       x: float
       y: float

   @app.post("/calculate")
   async def calculate(request: CalculationRequest):
       # Implement calculation logic here

   @app.get("/")
   async def root():
       return {"message": "Welcome to the Simple Calculator API"}
   ```

<</BACKEND_SETUP>>

<<INFRASTRUCTURE_SETUP>>
1. Create `infrastructure/docker-compose.yml`:
   ```yaml
   version: '3.8'

   services:
     frontend:
       build:
         context: ../frontend
         dockerfile: Dockerfile
       ports:
         - "3002:3000"
       volumes:
         - ../frontend:/app
         - /app/node_modules
       environment:
         - CHOKIDAR_USEPOLLING=true
       depends_on:
         - backend

     backend:
       build:
         context: ../backend
         dockerfile: Dockerfile
       ports:
         - "8000:8000"
       volumes:
         - ../backend:/app
       environment:
         - PYTHONPATH=/app
   ```
<</INFRASTRUCTURE_SETUP>>

<<MAKEFILE_SETUP>>
Create a Makefile in the root directory with the following content:

```makefile
# Makefile

# Variables
DOCKER_COMPOSE = docker-compose -f infrastructure/docker-compose.yml

# Phony targets
.PHONY: setup-dev start-dev stop-dev rebuild logs clean

# Setup development environment
setup-dev:
	@echo "Setting up development environment..."
	$(DOCKER_COMPOSE) build

# Start development environment
start-dev:
	@echo "Starting development environment..."
	$(DOCKER_COMPOSE) up -d

# Stop development environment
stop-dev:
	@echo "Stopping development environment..."
	$(DOCKER_COMPOSE) down

# Rebuild containers
rebuild:
	@echo "Rebuilding containers..."
	$(DOCKER_COMPOSE) build

# View logs
logs:
	@echo "Viewing logs..."
	$(DOCKER_COMPOSE) logs -f

# Clean up
clean:
	@echo "Cleaning up..."
	$(DOCKER_COMPOSE) down -v --remove-orphans
```
<</MAKEFILE_SETUP>>

<<IMPORTANT_NOTES>>
1. Ensure all necessary files are created in their respective directories.
2. Double-check that all file paths in Docker configurations are correct.
3. When setting up the project, run `make setup-dev` to build the containers, then `make start-dev` to start the development environment.
4. Access the frontend at http://localhost:3002 and the backend at http://localhost:8000.
5. For any changes in dependencies, update the respective `package.json` or `requirements.txt` file and run `make rebuild`.
6. Always use `make stop-dev` to properly stop the development environment.
<</IMPORTANT_NOTES>>

<<FINAL_STEPS>>
1. Initialize a git repository in the project root.
2. Create a `.gitignore` file to exclude node_modules, build artifacts, and environment-specific files.
3. Commit the initial project structure and files.
4. Test the entire setup by running through the development workflow using the Makefile commands.
5. Document any additional steps or configurations in the README.md file.
<</FINAL_STEPS>>
<</PROJECT_SETUP_PROMPT>>