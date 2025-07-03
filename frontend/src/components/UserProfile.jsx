import { Box, Avatar, Typography, Button, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { AccountCircle, Logout, History } from '@mui/icons-material'

function UserProfile({ user, onLogout, onViewHistory }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleClose()
    onLogout()
  }

  const handleViewHistory = () => {
    handleClose()
    if (onViewHistory) {
      onViewHistory()
    }
  }

  return (
    <Box>
      <Button
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: 'text.primary',
          textTransform: 'none',
          '&:hover': {
            bgcolor: 'action.hover'
          }
        }}
      >
        <Avatar
          src={user?.picture}
          alt={user?.name}
          sx={{ width: 32, height: 32 }}
        >
          <AccountCircle />
        </Avatar>
        <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
          {user?.name}
        </Typography>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar src={user?.picture} alt={user?.name} sx={{ width: 24, height: 24 }}>
              <AccountCircle />
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight={600}>
                {user?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleViewHistory}>
          <History sx={{ mr: 1 }} />
          Consultation History
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Logout sx={{ mr: 1 }} />
          Sign Out
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default UserProfile 