import { Box, Card, CardContent, Typography, Button, Container } from '@mui/material'
import { Google } from '@mui/icons-material'
import { useGoogleLogin } from '@react-oauth/google'

function Login({ onLoginSuccess }) {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // Store the access token
      localStorage.setItem('googleAccessToken', tokenResponse.access_token)
      onLoginSuccess(tokenResponse)
    },
    onError: () => {
      console.log('Login Failed')
    }
  })

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="background.default"
      >
        <Card sx={{ p: 4, textAlign: 'center', maxWidth: 400, width: '100%' }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
              🤖 AI Lawyer Consultation
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Get instant legal advice and consultation powered by AI. 
              Please sign in to continue.
            </Typography>

            <Button
              variant="contained"
              size="large"
              startIcon={<Google />}
              onClick={() => login()}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600,
                bgcolor: '#4285f4',
                '&:hover': {
                  bgcolor: '#3367d6'
                }
              }}
            >
              Sign in with Google
            </Button>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
              By signing in, you agree to our terms of service and privacy policy.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default Login 