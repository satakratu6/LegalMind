import { AppBar, Toolbar, Typography } from '@mui/material'
import { Gavel } from '@mui/icons-material'

function HeaderBar() {
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        <Gavel sx={{ mr: 2, fontSize: 32 }} />
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          AI Lawyer Consultation
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default HeaderBar 