#!/bin/bash

# AI Lawyer Consultation - Setup Script
# This script helps you set up the project for development

echo "🚀 Setting up AI Lawyer Consultation Project..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js v18 or higher."
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18 or higher is required. Current version: $(node -v)"
        exit 1
    fi
    
    print_success "Node.js version $(node -v) is installed"
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
    
    print_success "npm version $(npm -v) is installed"
}

# Install backend dependencies
setup_backend() {
    print_status "Setting up backend..."
    
    cd backend
    
    if [ ! -f "package.json" ]; then
        print_error "package.json not found in backend directory"
        exit 1
    fi
    
    print_status "Installing backend dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        print_success "Backend dependencies installed successfully"
    else
        print_error "Failed to install backend dependencies"
        exit 1
    fi
    
    cd ..
}

# Install frontend dependencies
setup_frontend() {
    print_status "Setting up frontend..."
    
    cd frontend
    
    if [ ! -f "package.json" ]; then
        print_error "package.json not found in frontend directory"
        exit 1
    fi
    
    print_status "Installing frontend dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        print_success "Frontend dependencies installed successfully"
    else
        print_error "Failed to install frontend dependencies"
        exit 1
    fi
    
    cd ..
}

# Create environment files
create_env_files() {
    print_status "Creating environment files..."
    
    # Backend .env
    if [ ! -f "backend/.env" ]; then
        cat > backend/.env << EOF
# AI Lawyer Consultation Backend Environment Variables

# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/legalmind?retryWrites=true&w=majority&authSource=admin&appName=Cluster0

# OpenRouter API Configuration
OPENROUTER_API_KEY=sk-or-v1-your_openrouter_api_key_here

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# JWT Configuration (if implementing JWT authentication)
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=24h

# Google OAuth Configuration (if implementing server-side OAuth)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Security Configuration
BCRYPT_ROUNDS=12

# Logging Configuration
LOG_LEVEL=info

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
EOF
        print_success "Created backend/.env file"
        print_warning "Please update backend/.env with your actual values"
    else
        print_warning "backend/.env already exists"
    fi
    
    # Frontend .env
    if [ ! -f "frontend/.env" ]; then
        cat > frontend/.env << EOF
# AI Lawyer Consultation Frontend Environment Variables

# API Configuration
VITE_API_BASE_URL=http://localhost:5000
VITE_API_TIMEOUT=30000

# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

# Application Configuration
VITE_APP_NAME=AI Lawyer Consultation
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Professional AI-powered legal consultation platform

# Feature Flags
VITE_ENABLE_GOOGLE_OAUTH=true
VITE_ENABLE_PROFILE_HISTORY=true
VITE_ENABLE_ANALYTICS=false

# Development Configuration
VITE_DEV_MODE=true
VITE_DEBUG_MODE=false

# External Services (if any)
VITE_ANALYTICS_ID=your_analytics_id_here
EOF
        print_success "Created frontend/.env file"
        print_warning "Please update frontend/.env with your actual values"
    else
        print_warning "frontend/.env already exists"
    fi
}

# Display next steps
show_next_steps() {
    echo ""
    echo "🎉 Setup completed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Update environment variables in backend/.env and frontend/.env"
    echo "2. Get your OpenRouter API key from https://openrouter.ai/"
    echo "3. Set up Google OAuth credentials in Google Cloud Console"
    echo "4. Configure MongoDB Atlas or local MongoDB"
    echo ""
    echo "🚀 To start development:"
    echo "  Backend:  cd backend && npm run dev"
    echo "  Frontend: cd frontend && npm run dev"
    echo ""
    echo "📚 For more information, see:"
    echo "  - README.md"
    echo "  - ENVIRONMENT_SETUP.md"
    echo "  - DEPLOYMENT_GUIDE.md"
    echo ""
}

# Main setup function
main() {
    echo "=========================================="
    echo "  AI Lawyer Consultation Setup Script"
    echo "=========================================="
    echo ""
    
    # Check prerequisites
    check_node
    check_npm
    
    # Setup project
    setup_backend
    setup_frontend
    create_env_files
    
    # Show next steps
    show_next_steps
}

# Run main function
main 