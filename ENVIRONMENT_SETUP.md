# Environment Setup Guide

This guide will help you set up the environment variables for the AI Lawyer Consultation project.

## Backend Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
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
```

## Frontend Environment Variables

Create a `.env` file in the `frontend/` directory with the following variables:

```env
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
```

## Required API Keys and Services

### 1. OpenRouter API Key
- Visit [OpenRouter](https://openrouter.ai/)
- Create an account and generate an API key
- Replace `your_openrouter_api_key_here` with your actual API key

### 2. Google OAuth Credentials
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select existing one
- Enable Google+ API
- Create OAuth 2.0 credentials
- Add authorized origins: `http://localhost:5173`
- Add authorized redirect URIs: `http://localhost:5173`
- Replace `your_google_client_id_here` with your actual client ID

### 3. MongoDB Connection String
- For local MongoDB: `mongodb://localhost:27017/legalmind`
- For MongoDB Atlas:
  - Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
  - Create a cluster
  - Get connection string
  - Replace username, password, and cluster details

### 4. JWT Secret (Optional)
- Generate a secure random string for JWT signing
- You can use: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

## Security Notes

1. **Never commit `.env` files to version control**
2. **Use strong, unique passwords for all services**
3. **Rotate API keys regularly**
4. **Use environment-specific configurations**
5. **Validate all environment variables on startup**

## Production Environment

For production deployment, update the following variables:

```env
# Backend Production
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
PORT=process.env.PORT (set by hosting platform)

# Frontend Production
VITE_API_BASE_URL=https://your-backend-domain.com
VITE_DEV_MODE=false
VITE_DEBUG_MODE=false
```

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure `CORS_ORIGIN` matches your frontend URL
2. **Database Connection**: Verify MongoDB URI and network access
3. **API Key Issues**: Check OpenRouter API key validity and quota
4. **OAuth Errors**: Verify Google OAuth credentials and redirect URIs

### Validation Commands:

```bash
# Test backend environment
cd backend
node -e "require('dotenv').config(); console.log('Backend env loaded:', process.env.NODE_ENV)"

# Test frontend environment
cd frontend
node -e "console.log('Frontend env check completed')"
```

## Environment Variable Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Backend server port | No | 5000 |
| `NODE_ENV` | Environment mode | No | development |
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `OPENROUTER_API_KEY` | OpenRouter API key | Yes | - |
| `CORS_ORIGIN` | Allowed CORS origin | No | http://localhost:5173 |
| `JWT_SECRET` | JWT signing secret | No | - |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes | - |
| `VITE_API_BASE_URL` | Backend API URL | Yes | - |
| `VITE_GOOGLE_CLIENT_ID` | Frontend Google OAuth ID | Yes | - | 