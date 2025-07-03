const mongoose = require('mongoose');

require('dotenv').config();

// MongoDB connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/legalmind';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB; 