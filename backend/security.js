// Security middleware setup
const setupSecurity = (app) => {
  // Additional security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });
};

// Input validation middleware
const validateLegalConsultInput = (req, res, next) => {
  const { message, specialization, jurisdiction, language } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Legal question is required and must be a non-empty string'
    });
  }

  if (message.length > 2000) {
    return res.status(400).json({
      status: 'error',
      message: 'Legal question must be less than 2000 characters'
    });
  }

  if (specialization && typeof specialization !== 'string') {
    return res.status(400).json({
      status: 'error',
      message: 'Specialization must be a string'
    });
  }

  if (jurisdiction && typeof jurisdiction !== 'string') {
    return res.status(400).json({
      status: 'error',
      message: 'Jurisdiction must be a string'
    });
  }

  if (language && typeof language !== 'string') {
    return res.status(400).json({
      status: 'error',
      message: 'Language must be a string'
    });
  }

  // Sanitize inputs
  req.body.message = message.trim();
  req.body.specialization = specialization ? specialization.trim() : '';
  req.body.jurisdiction = jurisdiction ? jurisdiction.trim() : '';
  req.body.language = language ? language.trim() : '';

  next();
};

// API key validation middleware
const validateApiKey = (req, res, next) => {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    console.error('OpenRouter API key not configured');
    return res.status(500).json({
      status: 'error',
      message: 'API configuration error'
    });
  }

  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // MongoDB errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: 'Validation error',
      details: Object.values(err.errors).map(e => e.message)
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid ID format'
    });
  }

  // Default error
  res.status(err.status || 500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
};

module.exports = {
  setupSecurity,
  validateLegalConsultInput,
  validateApiKey,
  errorHandler
}; 