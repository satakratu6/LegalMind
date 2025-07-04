const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const profileHistoryRouter = require('./profileHistory');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
// Support multiple origins from env
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const allowed = CORS_ORIGIN.split(',').map(o => o.trim());
    if (allowed.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/profile', profileHistoryRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'success', message: 'Profile History Server is running' });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Profile History Server running on port ${PORT}`);
}); 