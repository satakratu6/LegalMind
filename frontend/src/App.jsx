import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Alert,
  Button,
} from "@mui/material";
import Login from "./components/Login";
import Header from "./components/Header";
import ConsultationApp from "./components/ConsultationApp";
import ProfileHistory from "./components/ProfileHistory";
import {
  validateGoogleToken,
  getStoredUser,
  setStoredUser,
  clearStoredUser,
} from "./utils/auth";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#dc004e",
      light: "#ff5983",
      dark: "#9a0036",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

// Replace with your Google OAuth Client ID
// Get your Client ID from: https://console.cloud.google.com/apis/credentials
// const GOOGLE_CLIENT_ID = '787904341358-k4l99g2iqge1d9dsgerdpec89h6i8aen.apps.googleusercontent.com'
const GOOGLE_CLIENT_ID =
  "955264390176-10bj5v0skrs12uehdk5qhiqreuasj9m7.apps.googleusercontent.com";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = async () => {
      try {
        const accessToken = localStorage.getItem("googleAccessToken");
        const storedUser = getStoredUser();

        if (accessToken && storedUser) {
          // Verify the token is still valid
          const { valid, userInfo } = await validateGoogleToken(accessToken);

          if (valid && userInfo) {
            setUser(userInfo);
            // Update stored user info
            setStoredUser(userInfo);
          } else {
            // Token is invalid, clear storage
            clearStoredUser();
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        // Clear invalid data
        clearStoredUser();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLoginSuccess = async (tokenResponse) => {
    try {
      // Get user info from Google
      const { valid, userInfo } = await validateGoogleToken(
        tokenResponse.access_token
      );

      if (valid && userInfo) {
        setUser(userInfo);
        // Store both token and user info
        localStorage.setItem("googleAccessToken", tokenResponse.access_token);
        setStoredUser(userInfo);
      } else {
        // Fallback if we can't get user info
        const fallbackUser = { name: "User", email: "user@example.com" };
        setUser(fallbackUser);
        localStorage.setItem("googleAccessToken", tokenResponse.access_token);
        setStoredUser(fallbackUser);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      // Fallback user
      const fallbackUser = { name: "User", email: "user@example.com" };
      setUser(fallbackUser);
      localStorage.setItem("googleAccessToken", tokenResponse.access_token);
      setStoredUser(fallbackUser);
    }
  };

  const handleLogout = () => {
    clearStoredUser();
    setUser(null);
    setDemoMode(false);
    setShowHistory(false);
  };

  const handleDemoMode = () => {
    setDemoMode(true);
    const demoUser = { name: "Demo User", email: "demo@example.com" };
    setUser(demoUser);
    setStoredUser(demoUser);
  };

  const handleViewHistory = () => {
    setShowHistory(true);
  };

  const handleBackToConsultation = () => {
    setShowHistory(false);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }} />
      </ThemeProvider>
    );
  }

  // Check if we have a valid Google Client ID
  const hasValidClientId =
    GOOGLE_CLIENT_ID && GOOGLE_CLIENT_ID !== "GOOGLE_CLIENT_ID";

  return (
    <GoogleOAuthProvider
      clientId={hasValidClientId ? GOOGLE_CLIENT_ID : "demo"}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
          {!user ? (
            <Box>
              {!hasValidClientId && (
                <Alert
                  severity="warning"
                  sx={{
                    position: "fixed",
                    top: 16,
                    left: 16,
                    right: 16,
                    zIndex: 1000,
                  }}
                  action={
                    <Button
                      color="inherit"
                      size="small"
                      onClick={handleDemoMode}
                    >
                      Try Demo Mode
                    </Button>
                  }
                >
                  Google OAuth not configured. Please set up your Google Client
                  ID or use demo mode.
                </Alert>
              )}
              <Login onLoginSuccess={handleLoginSuccess} />
            </Box>
          ) : (
            <>
              <Header 
                user={user} 
                onLogout={handleLogout} 
                onViewHistory={handleViewHistory}
              />
              {showHistory ? (
                <ProfileHistory user={user} onBackToConsultation={handleBackToConsultation} />
              ) : (
                <ConsultationApp user={user} />
              )}
            </>
          )}
        </Box>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
