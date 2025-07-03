import { useState } from 'react'
import {
  Paper, Box, Typography, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Button, Alert, CircularProgress
} from '@mui/material'
import { Gavel, Category, LocationOn, Language, Send } from '@mui/icons-material'

function ConsultationForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    message: '',
    specialization: '',
    jurisdiction: '',
    language: 'en'
  })
  const [error, setError] = useState(null)

  // Static lists for dropdowns
  const specializations = [
    'General', 'Constitutional', 'Criminal', 'Civil', 'Corporate', 'Contract', 'Property', 'Tort', 'Family', 'Employment', 'Immigration', 'Tax', 'IP', 'Environmental', 'Real Estate', 'International', 'Education', 'Cybersecurity', 'AI', 'Blockchain'
  ]
  
  const jurisdictions = [
    'General', 'International', 'US', 'UK', 'Canada', 'Australia', 'India', 'Japan', 'China', 'Brazil', 'EU', 'UAE'
  ]
  
  const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'ar', name: 'Arabic' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'hi', name: 'Hindi' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ko', name: 'Korean' },
    { code: 'it', name: 'Italian' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError(null) // Clear error when user starts typing
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.message || !formData.specialization || !formData.jurisdiction) {
      setError('Please fill in all required fields')
      return
    }
    
    try {
      await onSubmit(formData)
      setError(null)
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 4, height: 'fit-content' }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Gavel color="primary" sx={{ mr: 1, fontSize: 28 }} />
        <Typography variant="h5" component="h2">
          Ask Your Legal Question
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Legal Question"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Describe your legal situation or ask your question..."
          required
          sx={{ mb: 3 }}
        />
        <Box sx={{ mb: 4 }}>
          <FormControl fullWidth required sx={{ mb: 3 }}>
            <InputLabel>Legal Specialization</InputLabel>
            <Select
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              label="Legal Specialization"
              sx={{
                '& .MuiSelect-select': {
                  py: 2,
                  fontSize: '1rem',
                  fontWeight: 500
                },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                }
              }}
            >
              {specializations.map((spec, index) => (
                <MenuItem key={index} value={spec} sx={{ py: 1.5 }}>
                  <Box display="flex" alignItems="center">
                    <Category sx={{ mr: 1.5, fontSize: 22 }} />
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {spec.charAt(0).toUpperCase() + spec.slice(1)}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl fullWidth required sx={{ mb: 3 }}>
            <InputLabel>Jurisdiction</InputLabel>
            <Select
              name="jurisdiction"
              value={formData.jurisdiction}
              onChange={handleInputChange}
              label="Jurisdiction"
              sx={{
                '& .MuiSelect-select': {
                  py: 2,
                  fontSize: '1rem',
                  fontWeight: 500
                },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                }
              }}
            >
              {jurisdictions.map((jur, index) => (
                <MenuItem key={index} value={jur} sx={{ py: 1.5 }}>
                  <Box display="flex" alignItems="center">
                    <LocationOn sx={{ mr: 1.5, fontSize: 22 }} />
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {jur.toUpperCase()}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Language</InputLabel>
          <Select
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            label="Language"
            sx={{
              '& .MuiSelect-select': {
                py: 2,
                fontSize: '1rem',
                fontWeight: 500
              },
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              }
            }}
          >
            {languageOptions.map((lang) => (
              <MenuItem key={lang.code} value={lang.code} sx={{ py: 1.5 }}>
                <Box display="flex" alignItems="center">
                  <Language sx={{ mr: 1.5, fontSize: 22 }} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {lang.name}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <Send />}
          sx={{ py: 1.5 }}
        >
          {loading ? 'Getting Legal Advice...' : 'Get Legal Advice'}
        </Button>
      </form>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Paper>
  )
}

export default ConsultationForm 