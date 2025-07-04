const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { setupSecurity, validateLegalConsultInput, validateApiKey, errorHandler } = require('./security');

require('dotenv').config();
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

const app = express();

// Debug: log every path registered with app.use, app.get, app.post, app.options
['use', 'get', 'post', 'options'].forEach(method => {
  const original = app[method];
  app[method] = function (path, ...args) {
    if (typeof path === 'string') {
      console.log(`Registering ${method.toUpperCase()} for path:`, path);
    }
    return original.call(this, path, ...args);
  };
});

app.use(express.json({ limit: '10mb' }));

// Support multiple origins (comma-separated)
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

// Security middleware
setupSecurity(app);

app.post('/legal-consult', validateLegalConsultInput, validateApiKey, async (req, res) => {
  const { message, specialization, jurisdiction, language } = req.body;

  const prompt = `
You are an AI legal assistant. Answer the following question as a lawyer would, using clear, professional language.

Please provide your response in the following JSON format:
{
  "message": "Your main legal analysis here...",
  "legalReferences": ["Reference 1", "Reference 2"],
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "disclaimers": ["Disclaimer 1", "Disclaimer 2"],
  "followUp": ["Follow-up question 1", "Follow-up question 2"]
}

Question Details:
- Specialization: ${specialization}
- Jurisdiction: ${jurisdiction}
- Language: ${language}
- Question: ${message}

If you are not a lawyer, include appropriate disclaimers.`;

  try {
    const openrouterRes = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-4o',
        messages: [
          { role: 'system', content: 'You are an AI legal assistant.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173', // or your deployed domain
          'X-Title': 'AI Lawyer Consultation'
        }
      }
    );

    const answer = openrouterRes.data.choices?.[0]?.message?.content || 'No answer generated.';

    // Try to parse as JSON, fallback to simple text
    let parsedResponse;
    try {
      // Check if response is wrapped in code blocks (```json ... ```)
      let jsonContent = answer;
      if (answer.includes('```json')) {
        // Extract JSON from code block
        const jsonMatch = answer.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
          jsonContent = jsonMatch[1].trim();
        }
      }

      parsedResponse = JSON.parse(jsonContent);
    } catch (e) {
      // If not valid JSON, wrap in the expected format
      parsedResponse = {
        message: answer,
        legalReferences: [],
        recommendations: [],
        disclaimers: ["This response is for informational purposes only and does not constitute legal advice."],
        followUp: []
      };
    }

    res.json({ status: 'success', result: { response: parsedResponse } });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ status: 'error', message: 'Failed to get response from OpenRouter', error: err.response?.data || err.message });
  }
});

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));