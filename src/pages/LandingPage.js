import React from "react";
import { Button, Typography, Box, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f5f5, #d6d6d6)",
        color: "#333",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h3"
          className="fw-bold"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Welcome to CampEase
        </Typography>
        <Typography
          variant="h5"
          sx={{ maxWidth: 700, mx: "auto", opacity: 0.8 }}
        >
          Your all-in-one campus companion for a seamless college experience.
        </Typography>
      </motion.div>

      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, rotate: -2 }}
                style={{
                  padding: 20,
                  background: "rgba(255, 255, 255, 0.8)",
                  borderRadius: 10,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 500 }}>
                  {feature.icon} {feature.title}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {feature.description}
                </Typography>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ marginTop: 50 }}
      >
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => navigate("/register")}
          sx={{
            fontSize: "1.2rem",
            padding: "12px 30px",
            borderRadius: 3,
            backgroundColor: "#333",
            color: "#fff",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
            "&:hover": {
              backgroundColor: "#444",
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          Get Started - Sign Up
        </Button>
      </motion.div>
    </Box>
  );
};

const features = [
  {
    title: "Lost & Found",
    description: "Report and claim lost items easily.",
    icon: "🔍",
  },
  {
    title: "Interview Reviews",
    description: "Share and explore placement experiences.",
    icon: "💬",
  },
  {
    title: "Notes Sharing",
    description: "Upload and access study materials.",
    icon: "📚",
  },
  {
    title: "Ride Sharing",
    description: "Find or offer rides within campus.",
    icon: "🚗",
  },
];

export default LandingPage;
