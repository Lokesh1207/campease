import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', credentials);
      localStorage.setItem('authToken', response.data.token); // Store JWT token
      navigate('/home'); // Redirect to home
    } catch (err) {
      setError('Invalid credentials. Try again.');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ width: 350, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}

          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            margin="normal"
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{ marginTop: 2 }}
          >
            Login
          </Button> 

          <Typography align="center" sx={{ marginTop: 2 }}>
            Don't have an account?{' '}
            <Button onClick={() => navigate('/register')} sx={{ textTransform: 'none' }}>
              Register
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
