import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { TextField, Button, Typography, Card, Divider } from "@mui/material";
import api from "../api/api";

const Profile = () => {
  const [user, setUser] = useState({ fullName: "", username: "", phoneNo: "" });
  const [phoneNo, setPhoneNo] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get("/home/getUser");
        setUser(response.data);
        setPhoneNo(response.data.phoneNo || "");
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    fetchUserDetails();
  }, []);

  const handleUpdatePhone = async () => {
    if (!phoneNo.match(/^\d{10}$/)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    try {
      await api.post("/home/edit", null, { params: { phoneNo } });
      setUser((prev) => ({ ...prev, phoneNo }));
      setError("");
      alert("Phone number updated successfully!");
    } catch (err) {
      console.error("Error updating phone number:", err);
      setError("Failed to update phone number.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "#f8f9fa",
        padding: "20px",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card
              elevation={4}
              className="p-4"
              sx={{
                borderRadius: "12px",
                background: "#ffffff",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                variant="h5"
                className="fw-bold text-center mb-3"
                sx={{ color: "#333" }}
              >
                Profile Details
              </Typography>
              <Divider sx={{ mb: 3 }} />

              {/* User Info */}
              <Form>
                <div className="mb-3">
                  <Typography
                    variant="subtitle1"
                    className="fw-semibold"
                    sx={{ color: "#555" }}
                  >
                    Full Name
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#222",
                      background: "#f1f3f5",
                      padding: "8px 12px",
                      borderRadius: "8px",
                    }}
                  >
                    {user.fullName}
                  </Typography>
                </div>

                <div className="mb-3">
                  <Typography
                    variant="subtitle1"
                    className="fw-semibold"
                    sx={{ color: "#555" }}
                  >
                    Username
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#222",
                      background: "#f1f3f5",
                      padding: "8px 12px",
                      borderRadius: "8px",
                    }}
                  >
                    {user.username}
                  </Typography>
                </div>

                {/* Phone Number Input */}
                <div className="mb-3">
                  <Typography
                    variant="subtitle1"
                    className="fw-semibold"
                    sx={{ color: "#555" }}
                  >
                    Phone Number
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    error={!!error}
                    helperText={error}
                    sx={{
                      background: "#f8f9fa",
                      borderRadius: "8px",
                      input: { color: "#333" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#ddd" },
                        "&:hover fieldset": { borderColor: "#aaa" },
                        "&.Mui-focused fieldset": { borderColor: "#555" },
                      },
                      "& .MuiFormHelperText-root": {
                        color: "#d9534f",
                      },
                    }}
                  />
                </div>

                {/* Update Button */}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleUpdatePhone}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    background: "#4caf50",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    transition: "0.3s",
                    "&:hover": {
                      background: "#388e3c",
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  Update Phone Number
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
