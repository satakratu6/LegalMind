// Use Vite env variable for API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useState } from "react";
import { Container, Box, Typography, Paper } from "@mui/material";
import ConsultationForm from "./ConsultationForm";
import LegalResponse from "./LegalResponse";
import FooterNotice from "./FooterNotice";

function ConsultationApp({ user }) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const saveConsultationToHistory = async (formData, responseData) => {
    if (!user?.email) return; // Don't save if no user is logged in

    try {
      // Map language codes to full names
      const languageMap = {
        en: "English",
        es: "Spanish",
        fr: "French",
        de: "German",
        ar: "Arabic",
        zh: "Chinese",
        ja: "Japanese",
        hi: "Hindi",
        pt: "Portuguese",
        ru: "Russian",
        ko: "Korean",
        it: "Italian",
      };

      const consultationData = {
        userId: user.email,
        userEmail: user.email,
        userName: user.name || user.email,
        question: formData.message,
        specialization: formData.specialization,
        jurisdiction: formData.jurisdiction,
        language: languageMap[formData.language] || formData.language,
        response: responseData,
      };

      const res = await fetch(`${API_BASE_URL}/api/profile/save-consultation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(consultationData),
      });

      const data = await res.json();
      if (data.status === "success") {
        console.log("Consultation saved to history successfully");
      } else {
        console.error("Failed to save consultation to history:", data.message);
      }
    } catch (error) {
      console.error("Error saving consultation to history:", error);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/legal-consult`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.status === "success") {
        const responseData = data.result.response;
        setResponse(responseData);

        // Save the consultation to history
        await saveConsultationToHistory(formData, responseData);
      } else {
        throw new Error(data.message || "Failed to get response");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse({
        message:
          "Sorry, there was an error processing your request. Please try again.",
        legalReferences: [],
        recommendations: [],
        disclaimers: ["This is an error response. Please try again."],
        followUp: [],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 600, textAlign: "center" }}
        >
          Get Legal Consultation
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          Ask your legal questions and get AI-powered analysis, recommendations,
          and guidance.
        </Typography>
      </Box>

      <Box
        sx={{ display: "grid", gap: 4, gridTemplateColumns: { md: "1fr 1fr" } }}
      >
        <Paper sx={{ p: 3 }}>
          <ConsultationForm onSubmit={handleSubmit} loading={loading} />
        </Paper>

        <Paper sx={{ p: 3 }}>
          <LegalResponse response={response} loading={loading} />
        </Paper>
      </Box>

      <FooterNotice />
    </Container>
  );
}

export default ConsultationApp;
