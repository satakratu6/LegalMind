# AI Lawyer Consultation Platform

A comprehensive AI-powered legal consultation platform built with the MERN stack (MongoDB, Express.js, React, Node.js) that provides professional legal advice through advanced AI integration.

## 🚀 Features

- **AI-Powered Legal Consultation**: Get instant legal advice using OpenAI's GPT-4 through OpenRouter API
- **Multi-Jurisdiction Support**: Specify jurisdiction and legal specialization for targeted advice
- **Professional Response Format**: Structured legal responses with references, recommendations, and disclaimers
- **User Authentication**: Google OAuth integration for secure user management
- **Consultation History**: Track and review past legal consultations
- **User Profiles**: Manage personal information and consultation preferences
- **Responsive Design**: Modern, mobile-friendly interface built with Material-UI
- **Real-time Processing**: Fast and efficient AI response generation

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **OpenRouter API** - AI model integration
- **CORS** - Cross-origin resource sharing
- **Axios** - HTTP client

### Frontend
- **React 19** - JavaScript library for building user interfaces
- **Vite** - Build tool and development server
- **Material-UI (MUI)** - React component library
- **Google OAuth** - Authentication system
- **Axios** - HTTP client for API communication

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas cloud)
- **Google OAuth** credentials
- **OpenRouter API** key

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd AI-Lawyer-Consultation
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

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

# Google OAuth Configuration
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

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

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

## 🚀 Running the Application

### Development Mode

1. **Start the Backend Server**:
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start the Frontend Development Server**:
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Production Mode

1. **Build the Frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the Backend**:
   ```bash
   cd backend
   npm start
   ```

## 🔑 API Configuration

### OpenRouter API Setup

1. Visit [OpenRouter](https://openrouter.ai/) and create an account
2. Generate an API key
3. Add the API key to your backend `.env` file

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized JavaScript origins and redirect URIs
6. Add the client ID to both backend and frontend `.env` files

### MongoDB Setup

1. **Local MongoDB**:
   - Install MongoDB locally
   - Start the MongoDB service
   - Update the connection string in `.env`

2. **MongoDB Atlas** (Recommended):
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get your connection string
   - Update the `MONGODB_URI` in your `.env` file

## 📁 Project Structure

```
AI-Lawyer-Consultation/
├── backend/
│   ├── db.js                 # Database connection
│   ├── index.js              # Main server file
│   ├── profileServer.js      # Profile management server
│   ├── profileHistory.js     # Consultation history logic
│   ├── listModels.js         # AI model listing
│   ├── test-db.js           # Database testing
│   ├── package.json
│   └── .env                 # Backend environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConsultationApp.jsx
│   │   │   ├── ConsultationForm.jsx
│   │   │   ├── LegalResponse.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ProfileHistory.jsx
│   │   │   ├── UserProfile.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── HeaderBar.jsx
│   │   │   └── FooterNotice.jsx
│   │   ├── utils/
│   │   │   └── auth.js      # Authentication utilities
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── .env                 # Frontend environment variables
├── .gitignore
└── README.md
```

## 🔒 Security Features

- **Environment Variables**: All sensitive data stored in `.env` files
- **CORS Protection**: Configured cross-origin resource sharing
- **Input Validation**: Server-side validation for all inputs
- **Rate Limiting**: API rate limiting to prevent abuse
- **Secure Headers**: HTTP security headers implementation
- **OAuth Authentication**: Secure Google OAuth integration

## 📝 API Endpoints

### Legal Consultation
- `POST /legal-consult` - Submit legal questions and receive AI-powered responses

### User Management
- `GET /profile` - Get user profile information
- `PUT /profile` - Update user profile
- `GET /history` - Get consultation history
- `DELETE /history/:id` - Delete specific consultation

## 🎨 UI Components

- **ConsultationForm**: Legal question input form with specialization and jurisdiction selection
- **LegalResponse**: Structured display of AI legal advice
- **UserProfile**: User profile management interface
- **ProfileHistory**: Consultation history tracking
- **Header/Footer**: Navigation and branding components

## 🚀 Deployment

### Backend Deployment (Heroku)

1. Create a Heroku account
2. Install Heroku CLI
3. Create a new Heroku app
4. Set environment variables in Heroku dashboard
5. Deploy using Git

```bash
heroku create your-app-name
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your preferred platform
3. Set environment variables in the platform dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This application provides AI-generated legal information for educational and informational purposes only. It is not a substitute for professional legal advice. Always consult with a qualified attorney for specific legal matters.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation in the `/docs` folder

## 🔄 Version History

- **v1.0.0** - Initial release with basic legal consultation features
- **v1.1.0** - Added user authentication and profile management
- **v1.2.0** - Enhanced UI/UX with Material-UI components
- **v1.3.0** - Added consultation history and user preferences

---

**Built with ❤️ using the MERN stack** 