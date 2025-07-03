@echo off
REM AI Lawyer Consultation - Windows Setup Script
REM This script helps you set up the project for development

echo ==========================================
echo   AI Lawyer Consultation Setup Script
echo ==========================================
echo.

echo 🚀 Setting up AI Lawyer Consultation Project...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js v18 or higher.
    pause
    exit /b 1
)

echo [SUCCESS] Node.js version is installed

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed. Please install npm.
    pause
    exit /b 1
)

echo [SUCCESS] npm version is installed

REM Setup backend
echo [INFO] Setting up backend...
cd backend
if not exist "package.json" (
    echo [ERROR] package.json not found in backend directory
    pause
    exit /b 1
)

echo [INFO] Installing backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit /b 1
)
echo [SUCCESS] Backend dependencies installed successfully
cd ..

REM Setup frontend
echo [INFO] Setting up frontend...
cd frontend
if not exist "package.json" (
    echo [ERROR] package.json not found in frontend directory
    pause
    exit /b 1
)

echo [INFO] Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install frontend dependencies
    pause
    exit /b 1
)
echo [SUCCESS] Frontend dependencies installed successfully
cd ..

REM Create environment files
echo [INFO] Creating environment files...

REM Backend .env
if not exist "backend\.env" (
    (
        echo # AI Lawyer Consultation Backend Environment Variables
        echo.
        echo # Server Configuration
        echo PORT=5000
        echo NODE_ENV=development
        echo.
        echo # Database Configuration
        echo MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/legalmind?retryWrites=true^&w=majority^&authSource=admin^&appName=Cluster0
        echo.
        echo # OpenRouter API Configuration
        echo OPENROUTER_API_KEY=sk-or-v1-your_openrouter_api_key_here
        echo.
        echo # CORS Configuration
        echo CORS_ORIGIN=http://localhost:5173
        echo.
        echo # JWT Configuration ^(if implementing JWT authentication^)
        echo JWT_SECRET=your_jwt_secret_key_here
        echo JWT_EXPIRE=24h
        echo.
        echo # Google OAuth Configuration ^(if implementing server-side OAuth^)
        echo GOOGLE_CLIENT_ID=your_google_client_id_here
        echo GOOGLE_CLIENT_SECRET=your_google_client_secret_here
        echo.
        echo # Security Configuration
        echo BCRYPT_ROUNDS=12
        echo.
        echo # Logging Configuration
        echo LOG_LEVEL=info
        echo.
        echo # Rate Limiting
        echo RATE_LIMIT_WINDOW_MS=900000
        echo RATE_LIMIT_MAX_REQUESTS=100
    ) > backend\.env
    echo [SUCCESS] Created backend\.env file
    echo [WARNING] Please update backend\.env with your actual values
) else (
    echo [WARNING] backend\.env already exists
)

REM Frontend .env
if not exist "frontend\.env" (
    (
        echo # AI Lawyer Consultation Frontend Environment Variables
        echo.
        echo # API Configuration
        echo VITE_API_BASE_URL=http://localhost:5000
        echo VITE_API_TIMEOUT=30000
        echo.
        echo # Google OAuth Configuration
        echo VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
        echo.
        echo # Application Configuration
        echo VITE_APP_NAME=AI Lawyer Consultation
        echo VITE_APP_VERSION=1.0.0
        echo VITE_APP_DESCRIPTION=Professional AI-powered legal consultation platform
        echo.
        echo # Feature Flags
        echo VITE_ENABLE_GOOGLE_OAUTH=true
        echo VITE_ENABLE_PROFILE_HISTORY=true
        echo VITE_ENABLE_ANALYTICS=false
        echo.
        echo # Development Configuration
        echo VITE_DEV_MODE=true
        echo VITE_DEBUG_MODE=false
        echo.
        echo # External Services ^(if any^)
        echo VITE_ANALYTICS_ID=your_analytics_id_here
    ) > frontend\.env
    echo [SUCCESS] Created frontend\.env file
    echo [WARNING] Please update frontend\.env with your actual values
) else (
    echo [WARNING] frontend\.env already exists
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Update environment variables in backend\.env and frontend\.env
echo 2. Get your OpenRouter API key from https://openrouter.ai/
echo 3. Set up Google OAuth credentials in Google Cloud Console
echo 4. Configure MongoDB Atlas or local MongoDB
echo.
echo 🚀 To start development:
echo   Backend:  cd backend ^&^& npm run dev
echo   Frontend: cd frontend ^&^& npm run dev
echo.
echo 📚 For more information, see:
echo   - README.md
echo   - ENVIRONMENT_SETUP.md
echo   - DEPLOYMENT_GUIDE.md
echo.

pause 