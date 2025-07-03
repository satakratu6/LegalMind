# Deployment Guide

This guide provides step-by-step instructions for deploying the AI Lawyer Consultation platform to various hosting platforms.

## 🚀 Quick Deployment Options

### Option 1: Railway (Recommended for Beginners)

Railway is a modern platform that makes deployment simple and straightforward.

#### Backend Deployment on Railway

1. **Create Railway Account**
   - Visit [Railway](https://railway.app/)
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Navigate to backend directory
   cd backend
   
   # Deploy
   railway up
   ```

3. **Configure Environment Variables**
   - Go to your Railway dashboard
   - Select your backend project
   - Go to Variables tab
   - Add all environment variables from your `.env` file

#### Frontend Deployment on Railway

1. **Deploy Frontend**
   ```bash
   cd frontend
   railway up
   ```

2. **Configure Environment Variables**
   - Update `VITE_API_BASE_URL` to your backend URL
   - Add other frontend environment variables

### Option 2: Render

Render provides free hosting with automatic deployments.

#### Backend Deployment on Render

1. **Create Render Account**
   - Visit [Render](https://render.com/)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New Web Service"
   - Connect your GitHub repository
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && npm start`
   - Set root directory: `backend`

3. **Configure Environment Variables**
   - Add all backend environment variables
   - Set `NODE_ENV=production`

#### Frontend Deployment on Render

1. **Create Static Site**
   - Click "New Static Site"
   - Connect your GitHub repository
   - Set build command: `cd frontend && npm install && npm run build`
   - Set publish directory: `frontend/dist`
   - Set root directory: `frontend`

2. **Configure Environment Variables**
   - Add all frontend environment variables

### Option 3: Heroku

Heroku is a mature platform with extensive features.

#### Backend Deployment on Heroku

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

3. **Deploy Backend**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

4. **Configure Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set OPENROUTER_API_KEY=your_api_key
   # Add all other environment variables
   ```

#### Frontend Deployment on Heroku

1. **Create Buildpack**
   ```bash
   heroku create your-frontend-app
   heroku buildpacks:set mars/create-react-app
   ```

2. **Deploy**
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

## 🔧 Production Configuration

### Environment Variables for Production

#### Backend Production Variables
```env
NODE_ENV=production
PORT=process.env.PORT
MONGODB_URI=your_production_mongodb_uri
OPENROUTER_API_KEY=your_openrouter_api_key
CORS_ORIGIN=https://your-frontend-domain.com
JWT_SECRET=your_secure_jwt_secret
LOG_LEVEL=error
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=50
```

#### Frontend Production Variables
```env
VITE_API_BASE_URL=https://your-backend-domain.com
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_APP_NAME=AI Lawyer Consultation
VITE_DEV_MODE=false
VITE_DEBUG_MODE=false
```

### Database Setup

#### MongoDB Atlas (Recommended)

1. **Create Atlas Cluster**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster (M0 free tier available)
   - Choose your preferred cloud provider and region

2. **Configure Network Access**
   - Go to Network Access
   - Add IP address: `0.0.0.0/0` (allows all IPs)
   - Or add specific IP ranges for better security

3. **Create Database User**
   - Go to Database Access
   - Create a new user with read/write permissions
   - Use a strong password

4. **Get Connection String**
   - Go to Clusters
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

### Domain and SSL Setup

#### Custom Domain Configuration

1. **Purchase Domain** (if needed)
   - Use providers like Namecheap, GoDaddy, or Google Domains

2. **Configure DNS**
   - Add CNAME record pointing to your hosting platform
   - Example: `api.yourdomain.com` → `your-app.railway.app`

3. **SSL Certificate**
   - Most platforms provide automatic SSL
   - For custom domains, configure SSL in your hosting platform

## 🔒 Security Checklist

### Before Deployment

- [ ] Remove hardcoded API keys from code
- [ ] Set up environment variables
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable security headers
- [ ] Configure MongoDB with proper authentication
- [ ] Set up proper logging
- [ ] Test all API endpoints

### After Deployment

- [ ] Verify HTTPS is working
- [ ] Test CORS configuration
- [ ] Monitor error logs
- [ ] Set up monitoring and alerts
- [ ] Configure backup strategies
- [ ] Test rate limiting
- [ ] Verify API key security

## 📊 Monitoring and Maintenance

### Logging Setup

```javascript
// Add to your backend for better logging
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

### Health Check Endpoint

Add this to your backend:

```javascript
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});
```

### Performance Monitoring

Consider using:
- **Uptime Robot** - For uptime monitoring
- **Sentry** - For error tracking
- **Google Analytics** - For user analytics
- **MongoDB Atlas** - For database monitoring

## 🚨 Troubleshooting

### Common Deployment Issues

1. **Build Failures**
   ```bash
   # Check build logs
   # Ensure all dependencies are in package.json
   # Verify Node.js version compatibility
   ```

2. **Environment Variables**
   ```bash
   # Verify all variables are set
   # Check for typos in variable names
   # Ensure proper formatting
   ```

3. **Database Connection**
   ```bash
   # Verify MongoDB URI
   # Check network access
   # Ensure database user has proper permissions
   ```

4. **CORS Errors**
   ```bash
   # Verify CORS_ORIGIN matches frontend URL
   # Check for trailing slashes
   # Ensure HTTPS/HTTP consistency
   ```

### Performance Optimization

1. **Enable Compression**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Cache Static Assets**
   ```javascript
   app.use(express.static('public', { maxAge: '1d' }));
   ```

3. **Database Indexing**
   ```javascript
   // Add indexes for frequently queried fields
   db.collection('consultations').createIndex({ userId: 1, createdAt: -1 });
   ```

## 📈 Scaling Considerations

### Horizontal Scaling

- Use load balancers for multiple instances
- Implement session management (Redis)
- Use CDN for static assets
- Consider serverless functions for specific features

### Database Scaling

- Implement database sharding
- Use read replicas for read-heavy operations
- Implement proper indexing strategies
- Consider using MongoDB Atlas for managed scaling

### Cost Optimization

- Use free tiers where possible
- Monitor resource usage
- Implement proper caching
- Optimize API calls and database queries

---

**Remember**: Always test your deployment in a staging environment before going to production! 