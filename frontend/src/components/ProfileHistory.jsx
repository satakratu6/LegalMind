import React, { useState, useEffect } from "react";
// Use Vite env variable for API base URL
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/profile`;
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  CircularProgress,
  Pagination,
  Paper,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  History,
  Delete,
  Visibility,
  ExpandMore,
  ClearAll,
  Refresh,
  Schedule,
  Gavel,
  Language,
  LocationOn,
  ArrowBack,
} from "@mui/icons-material";

const ProfileHistory = ({ user, onBackToConsultation }) => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalConsultations: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // ...existing code...

  const fetchHistory = async (page = 1) => {
    if (!user?.email) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/history/${encodeURIComponent(
          user.email
        )}?page=${page}&limit=5`
      );
      const data = await response.json();

      if (data.status === "success") {
        setConsultations(data.data.consultations);
        setPagination(data.data.pagination);
      } else {
        setError("Failed to fetch consultation history");
      }
    } catch (err) {
      console.error("Error fetching history:", err);
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const deleteConsultation = async (consultationId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/history/${consultationId}?userId=${encodeURIComponent(
          user.email
        )}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        // Refresh the current page
        fetchHistory(currentPage);
      } else {
        setError("Failed to delete consultation");
      }
    } catch (err) {
      console.error("Error deleting consultation:", err);
      setError("Failed to delete consultation");
    }
  };

  const clearAllHistory = async () => {
    if (
      !window.confirm(
        "Are you sure you want to clear all consultation history? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/history/clear/${encodeURIComponent(user.email)}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        setConsultations([]);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalConsultations: 0,
          hasNextPage: false,
          hasPrevPage: false,
        });
      } else {
        setError("Failed to clear history");
      }
    } catch (err) {
      console.error("Error clearing history:", err);
      setError("Failed to clear history");
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    fetchHistory(newPage);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  useEffect(() => {
    if (user?.email) {
      fetchHistory();
    }
  }, [user]);

  if (!user) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Please log in to view your consultation history
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <History sx={{ fontSize: 32, color: "primary.main" }} />
          <Typography variant="h4" component="h1" fontWeight={600}>
            Consultation History
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={onBackToConsultation}
            variant="outlined"
            color="primary"
          >
            Back to Consultation
          </Button>
          <Button
            startIcon={<Refresh />}
            onClick={() => fetchHistory(currentPage)}
            disabled={loading}
            variant="outlined"
          >
            Refresh
          </Button>
          {consultations.length > 0 && (
            <Button
              startIcon={<ClearAll />}
              onClick={clearAllHistory}
              color="error"
              variant="outlined"
            >
              Clear All
            </Button>
          )}
        </Box>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Empty State */}
      {!loading && consultations.length === 0 && (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <History sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No consultation history found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Your consultation history will appear here once you start using
            LegalMind
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={onBackToConsultation}
          >
            Start Your First Consultation
          </Button>
        </Paper>
      )}

      {/* Consultation List */}
      {!loading && consultations.length > 0 && (
        <Grid container spacing={3}>
          {consultations.map((consultation) => (
            <Grid item xs={12} key={consultation._id}>
              <Card elevation={2}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {truncateText(consultation.question, 80)}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          mb: 2,
                          flexWrap: "wrap",
                        }}
                      >
                        <Chip
                          icon={<Gavel />}
                          label={consultation.specialization}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Chip
                          icon={<LocationOn />}
                          label={consultation.jurisdiction}
                          size="small"
                          color="secondary"
                          variant="outlined"
                        />
                        <Chip
                          icon={<Language />}
                          label={consultation.language}
                          size="small"
                          variant="outlined"
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          color: "text.secondary",
                        }}
                      >
                        <Schedule sx={{ fontSize: 16 }} />
                        <Typography variant="body2">
                          {formatDate(consultation.timestamp)}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        onClick={() => {
                          setSelectedConsultation(consultation);
                          setDialogOpen(true);
                        }}
                        color="primary"
                        size="small"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteConsultation(consultation._id)}
                        color="error"
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {!loading && pagination.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={pagination.totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      {/* Consultation Detail Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedConsultation && (
          <>
            <DialogTitle>
              <Typography variant="h6" component="div">
                Consultation Details
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDate(selectedConsultation.timestamp)}
              </Typography>
            </DialogTitle>

            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Your Question:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ bgcolor: "grey.50", p: 2, borderRadius: 1 }}
                >
                  {selectedConsultation.question}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Legal Analysis:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ bgcolor: "grey.50", p: 2, borderRadius: 1 }}
                >
                  {selectedConsultation.response.message}
                </Typography>
              </Box>

              {selectedConsultation.response.recommendations?.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Recommendations:
                  </Typography>
                  <List dense>
                    {selectedConsultation.response.recommendations.map(
                      (rec, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={`• ${rec}`} />
                        </ListItem>
                      )
                    )}
                  </List>
                </Box>
              )}

              {selectedConsultation.response.legalReferences?.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Legal References:
                  </Typography>
                  <List dense>
                    {selectedConsultation.response.legalReferences.map(
                      (ref, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={`• ${ref}`} />
                        </ListItem>
                      )
                    )}
                  </List>
                </Box>
              )}

              {selectedConsultation.response.disclaimers?.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    gutterBottom
                    color="warning.main"
                  >
                    Disclaimers:
                  </Typography>
                  <List dense>
                    {selectedConsultation.response.disclaimers.map(
                      (disclaimer, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={`• ${disclaimer}`}
                            sx={{
                              "& .MuiListItemText-primary": {
                                color: "warning.main",
                              },
                            }}
                          />
                        </ListItem>
                      )
                    )}
                  </List>
                </Box>
              )}

              {selectedConsultation.response.followUp?.length > 0 && (
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Follow-up Questions:
                  </Typography>
                  <List dense>
                    {selectedConsultation.response.followUp.map(
                      (question, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={`• ${question}`} />
                        </ListItem>
                      )
                    )}
                  </List>
                </Box>
              )}
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ProfileHistory;
