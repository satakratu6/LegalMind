const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const profileHistoryRouter = require('./profileHistory');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
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