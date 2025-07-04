import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import UserProfile from "./UserProfile";

function Header({ user, onLogout, onViewHistory }) {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}
        >
          <img
            src="/fu6cDy01.svg"
            alt="Logo"
            style={{ height: 32, width: 32 }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 600, ml: 1 }}
          >
            LegalMind
          </Typography>
        </Box>
        {user && (
          <UserProfile
            user={user}
            onLogout={onLogout}
            onViewHistory={onViewHistory}
          />
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
