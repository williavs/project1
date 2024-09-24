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

# Deploy to staging
deploy-stage:
	@echo "Deploying to staging..."
	# Add your staging deployment commands here

# Deploy to production
deploy-prod:
	@echo "Deploying to production..."
	# Add your production deployment commands here