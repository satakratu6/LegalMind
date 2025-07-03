const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const router = express.Router();
router.use(cors());
router.use(express.json());

// MongoDB Schema for consultation history
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

const ConsultationHistory = mongoose.model('ConsultationHistory', consultationHistorySchema);

// Log when the model is created
console.log('ConsultationHistory model created. Collection will be auto-created as: consultationhistories');

// Save consultation to history
router.post('/save-consultation', async (req, res) => {
  try {
    const { userId, userEmail, userName, question, specialization, jurisdiction, language, response } = req.body;

    const consultation = new ConsultationHistory({
      userId,
      userEmail,
      userName,
      question,
      specialization,
      jurisdiction,
      language,
      response
    });

    await consultation.save();
    console.log(`Consultation saved to database for user: ${userEmail}`);
    res.json({ status: 'success', message: 'Consultation saved to history' });
  } catch (error) {
    console.error('Error saving consultation:', error);
    res.status(500).json({ status: 'error', message: 'Failed to save consultation' });
  }
});

// Get consultation history for a user
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const consultations = await ConsultationHistory
      .find({ userId })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await ConsultationHistory.countDocuments({ userId });

    console.log(`Fetched ${consultations.length} consultations for user: ${userId}`);

    res.json({
      status: 'success',
      data: {
        consultations,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalConsultations: total,
          hasNextPage: skip + consultations.length < total,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch consultation history' });
  }
});

// Delete a consultation from history
router.delete('/history/:consultationId', async (req, res) => {
  try {
    const { consultationId } = req.params;
    const { userId } = req.query;

    const consultation = await ConsultationHistory.findOneAndDelete({
      _id: consultationId,
      userId: userId
    });

    if (!consultation) {
      return res.status(404).json({ status: 'error', message: 'Consultation not found' });
    }

    console.log(`Consultation deleted for user: ${userId}`);
    res.json({ status: 'success', message: 'Consultation deleted from history' });
  } catch (error) {
    console.error('Error deleting consultation:', error);
    res.status(500).json({ status: 'error', message: 'Failed to delete consultation' });
  }
});

// Clear all history for a user
router.delete('/history/clear/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await ConsultationHistory.deleteMany({ userId });

    console.log(`Cleared ${result.deletedCount} consultations for user: ${userId}`);
    res.json({ status: 'success', message: 'All consultation history cleared' });
  } catch (error) {
    console.error('Error clearing history:', error);
    res.status(500).json({ status: 'error', message: 'Failed to clear consultation history' });
  }
});

module.exports = router; 