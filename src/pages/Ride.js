import React from "react";
import { Container, Typography, Button, Card } from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Ride = () => {
  const navigate = useNavigate();
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "#f8f9fa", padding: "20px" }}
    >
      <Container className="text-center">
        <Card
          elevation={4}
          className="p-5"
          sx={{
            maxWidth: "500px",
            margin: "auto",
            borderRadius: "12px",
            background: "#ffffff",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h4"
            className="fw-bold"
            sx={{ color: "#333", mb: 2 }}
          >
            Ride Sharing 🚗
          </Typography>
          <Typography variant="body1" sx={{ color: "#555", mb: 3 }}>
            This feature is under development. Stay tuned for updates!
          </Typography>
          <Button
            onClick={() => navigate("/home")} 
            variant="contained"
            sx={{
              background: "#ff9800",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "8px",
              transition: "0.3s",
              "&:hover": {
                background: "#f57c00",
                transform: "scale(1.05)",
              },
            }}
          >
            Back to Home
          </Button>
        </Card>
      </Container>
    </div>
  );
};

export default Ride;
