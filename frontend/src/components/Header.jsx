import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import { Gavel } from '@mui/icons-material'
import UserProfile from './UserProfile'

function Header({ user, onLogout, onViewHistory }) {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
          <Gavel sx={{ fontSize: 28 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            LegalMind
          </Typography>
        </Box>
        
        {user && (
          <UserProfile user={user} onLogout={onLogout} onViewHistory={onViewHistory} />
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header 