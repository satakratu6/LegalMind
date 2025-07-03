const connectDB = require('./db');
const mongoose = require('mongoose');

// Import the schema definition
const consultationHistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  userEmail: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    default: 'General'
  },
  jurisdiction: {
    type: String,
    default: 'General'
  },
  language: {
    type: String,
    default: 'English'
  },
  response: {
    message: String,
    legalReferences: [String],
    recommendations: [String],
    disclaimers: [String],
    followUp: [String]
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

async function testDatabase() {
  try {
    console.log('Testing MongoDB connection and collection creation...');

    // Connect to database
    await connectDB();

    // Create the model
    const ConsultationHistory = mongoose.model('ConsultationHistory', consultationHistorySchema);

    const testConsultation = new ConsultationHistory({
      userId: 'test@example.com',
      userEmail: 'test@example.com',
      userName: 'Test User',
      question: 'This is a test consultation to verify database creation',
      specialization: 'Test',
      jurisdiction: 'Test',
      language: 'English',
      response: {
        message: 'Test response',
        legalReferences: ['Test Reference'],
        recommendations: ['Test Recommendation'],
        disclaimers: ['Test Disclaimer'],
        followUp: ['Test Follow-up']
      }
    });

    await testConsultation.save();
    console.log('✅ Test consultation saved successfully!');

    // Verify the document was saved
    const savedConsultation = await ConsultationHistory.findOne({ userId: 'test@example.com' });
    if (savedConsultation) {
      console.log('✅ Document retrieved successfully!');
      console.log('📄 Document ID:', savedConsultation._id);
      console.log('📅 Created at:', savedConsultation.timestamp);
    }

    // Clean up test data
    await ConsultationHistory.deleteOne({ userId: 'test@example.com' });
    console.log('✅ Test data cleaned up!');

    console.log('\n🎉 Database and collection are working correctly!');
    console.log('📊 Database: legalmind');
    console.log('📁 Collection: consultationhistories');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

testDatabase(); 