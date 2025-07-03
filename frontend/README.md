# 🤖 AI Lawyer Consultation App

A modern React application that provides instant legal advice and consultation powered by AI. Built with Vite and React, this application connects to the AI Lawyer API to offer comprehensive legal guidance across various jurisdictions and specializations.

## ✨ Features

- **AI-Powered Legal Advice**: Get instant legal consultation on various legal matters
- **Multiple Jurisdictions**: Support for 35+ jurisdictions including US, UK, EU, Canada, Australia, and more
- **Legal Specializations**: 55+ legal areas including contract law, family law, employment law, criminal law, and more
- **Multi-Language Support**: Available in 8+ languages including English, Spanish, French, German, Arabic, Chinese, Japanese, and Hindi
- **Comprehensive Responses**: Detailed legal analysis with references, recommendations, disclaimers, and follow-up questions
- **Modern UI/UX**: Beautiful, responsive design with smooth animations and professional styling
- **Real-time API Integration**: Direct integration with the AI Lawyer API for instant responses

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to view the application.

## 📱 How to Use

1. **Select Legal Specialization**: Choose from 55+ legal areas (contract, family, employment, etc.)
2. **Choose Jurisdiction**: Select your legal jurisdiction (US, UK, EU, etc.)
3. **Ask Your Question**: Describe your legal situation or ask your specific question
4. **Select Language**: Choose your preferred language for the response
5. **Get Legal Advice**: Submit and receive comprehensive legal analysis

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── index.css        # Global styles
│   └── main.jsx         # Application entry point
├── public/              # Static assets
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🔧 API Integration

The application integrates with the AI Lawyer API using the following endpoints:

- **GET Specializations**: `/specializations` - Fetches available legal specializations
- **GET Jurisdictions**: `/jurisdictions` - Fetches available legal jurisdictions  
- **POST Chat**: `/chat` - Sends legal questions and receives AI-powered responses

### API Configuration

The API key and host are configured in the `App.jsx` file:

```javascript
const API_KEY = 'e5ac5285a8msh0618ba36d4346f2p17eaa0jsn977bb4c77ab0'
const API_HOST = 'ai-lawyer-online-legal-advice-attorney-consultation.p.rapidapi.com'
```

## 🎨 Design Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with gradient backgrounds and glass-morphism effects
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Accessibility**: Proper contrast ratios and keyboard navigation support
- **Cross-browser Compatibility**: Works on all modern browsers

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## ⚠️ Important Disclaimers

- This application provides **general legal information only**
- It is **not a substitute for professional legal advice**
- For specific legal matters, always consult with a qualified attorney
- Legal concepts and regulations may vary significantly between jurisdictions
- The AI responses are for educational purposes only

## 🔒 Security

- API keys are included in the frontend code for demonstration purposes
- In production, these should be stored securely on the backend
- The application uses HTTPS for all API communications

## 🌟 Technologies Used

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **Axios** - HTTP client for API requests
- **CSS3** - Styling with modern features (Grid, Flexbox, Custom Properties)
- **AI Lawyer API** - Legal consultation service

## 📄 License

This project is for educational and demonstration purposes. Please ensure compliance with the AI Lawyer API terms of service.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ using React and Vite**
