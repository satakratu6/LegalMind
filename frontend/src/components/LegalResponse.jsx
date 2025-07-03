import {
  Paper, Box, Typography, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemIcon, ListItemText, Chip, Grid, CircularProgress
} from '@mui/material'
import {
  CheckCircle, Info, Book, ExpandMore, Lightbulb, Warning, Help, Gavel
} from '@mui/icons-material'

function LegalResponse({ response, loading }) {
  if (loading) {
    return (
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', height: 'fit-content' }}>
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Getting Legal Advice...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Our AI is analyzing your question and preparing a comprehensive response.
        </Typography>
      </Paper>
    )
  }

  if (!response) {
    return (
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', height: 'fit-content' }}>
        <Gavel sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Ready for Legal Consultation
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fill out the form on the left to get instant AI-powered legal advice.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <CheckCircle color="success" sx={{ mr: 1, fontSize: 28 }} />
        <Typography variant="h5" component="h2">
          Legal Advice
        </Typography>
      </Box>
      
      {/* Main Analysis */}
      <Card sx={{ mb: 3, bgcolor: 'primary.50' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Info sx={{ mr: 1 }} />
            Analysis
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            {response.message}
          </Typography>
        </CardContent>
      </Card>

      {/* Legal References */}
      {response.legalReferences && response.legalReferences.length > 0 && (
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box display="flex" alignItems="center">
              <Book sx={{ mr: 1 }} />
              <Typography variant="h6">Legal References</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {response.legalReferences.map((ref, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Book fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={ref} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Recommendations */}
      {response.recommendations && response.recommendations.length > 0 && (
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box display="flex" alignItems="center">
              <Lightbulb sx={{ mr: 1 }} />
              <Typography variant="h6">Recommendations</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {response.recommendations.map((rec, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircle fontSize="small" color="success" />
                  </ListItemIcon>
                  <ListItemText primary={rec} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Disclaimers */}
      {response.disclaimers && response.disclaimers.length > 0 && (
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box display="flex" alignItems="center">
              <Warning sx={{ mr: 1 }} />
              <Typography variant="h6">Important Disclaimers</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {response.disclaimers.map((disclaimer, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Warning fontSize="small" color="warning" />
                  </ListItemIcon>
                  <ListItemText primary={disclaimer} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Follow-up Questions */}
      {response.followUp && response.followUp.length > 0 && (
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box display="flex" alignItems="center">
              <Help sx={{ mr: 1 }} />
              <Typography variant="h6">Follow-up Questions</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {response.followUp.map((question, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Help fontSize="small" color="info" />
                  </ListItemIcon>
                  <ListItemText primary={question} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}
    </Paper>
  )
}

export default LegalResponse 