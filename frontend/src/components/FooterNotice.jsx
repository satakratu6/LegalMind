import { Box, Divider, Alert, Typography } from '@mui/material'

function FooterNotice() {
  return (
    <Box sx={{ mt: 6, textAlign: 'center' }}>
      <Divider sx={{ mb: 2 }} />
      <Alert severity="warning" sx={{ maxWidth: 800, mx: 'auto' }}>
        <Typography variant="body2">
          ⚠️ This AI provides general legal information only and is not a substitute for professional legal advice. 
          For specific legal matters, please consult with a qualified attorney.
        </Typography>
      </Alert>
    </Box>
  )
}

export default FooterNotice 