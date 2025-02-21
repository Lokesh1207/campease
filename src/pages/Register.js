import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "", name: "" });
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (!user.name.trim()) errors.name = "Full Name is required";
    if (!user.username.trim()) {
      errors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(user.username)) {
      errors.username = "Enter a valid email address";
    }
    if (!user.password) {
      errors.password = "Password is required";
    } else if (user.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    try {
      await api.post("/auth/register", user);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      ></div>
      <div
        className="container text-white position-relative"
        style={{ zIndex: 2 }}
      >
        <div className="row justify-content-center align-items-center">
          <div className="col-md-4 mb-4">
            <Card
              sx={{
                width: "100%",
                padding: 3,
                boxShadow: 4,
                borderRadius: 2,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  align="center"
                  gutterBottom
                  className="fw-bold"
                  sx={{ color: "#333" }}
                >
                  Register
                </Typography>
                {error && (
                  <Typography color="error" align="center">
                    {error}
                  </Typography>
                )}
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  margin="normal"
                  error={!!validationErrors.name}
                  helperText={validationErrors.name}
                />
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  margin="normal"
                  error={!!validationErrors.username}
                  helperText={validationErrors.username}
                />
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  margin="normal"
                  error={!!validationErrors.password}
                  helperText={validationErrors.password}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleRegister}
                  sx={{ marginTop: 2 }}
                >
                  Register
                </Button>
                <Typography align="center" sx={{ marginTop: 2 }}>
                  Already have an account?{" "}
                  <Button
                    onClick={() => navigate("/login")}
                    sx={{ textTransform: "none" }}
                  >
                    Login
                  </Button>
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  className="mt-3 text-muted"
                >
                  By signing up, you agree to our{" "}
                  <Link to="/terms-of-service">Terms of Service </Link>
                  and <Link to="/privacy-policy">Privacy Policy</Link>.
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Register;
