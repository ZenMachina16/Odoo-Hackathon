import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  Link as MuiLink,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const res = await axios.post('/api/auth/register', JSON.stringify(formData), config);

      if (res.data.success) {
        setMessage('Registration successful! Redirecting...');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMessage('Registration failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong.';
      setMessage(errorMessage);
    }

    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #fff7f0, #ffe0c7)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Card
        elevation={8}
        sx={{
          backdropFilter: 'blur(12px)',
          background: 'rgba(255, 255, 255, 0.8)',
          border: '1px solid rgba(255, 165, 0, 0.2)',
          borderRadius: '30px',
          padding: 4,
          width: '100%',
          maxWidth: 420,
        }}
      >
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          Sign Up
        </Typography>

        {message && (
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              borderRadius: '15px',
              p: 1.5,
              fontSize: '14px',
              textAlign: 'center',
              backgroundColor: message.includes('successful') ? '#e6ffe6' : '#ffe6e6',
              color: message.includes('successful') ? '#2e7d32' : '#c62828',
              border: `1px solid ${message.includes('successful') ? '#a5d6a7' : '#ef9a9a'}`,
            }}
          >
            {message}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="name"
            value={name}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{ sx: { borderRadius: '20px' } }}
            InputLabelProps={{ sx: { color: '#777' } }}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{ sx: { borderRadius: '20px' } }}
            InputLabelProps={{ sx: { color: '#777' } }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{ sx: { borderRadius: '20px' } }}
            InputLabelProps={{ sx: { color: '#777' } }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              mt: 3,
              py: 1.4,
              fontWeight: 'bold',
              fontSize: '16px',
              borderRadius: '30px',
              backgroundColor: '#ffa726',
              boxShadow: '0 4px 12px rgba(255, 167, 38, 0.4)',
              transition: '0.3s ease-in-out',
              '&:hover': {
                backgroundColor: '#fb8c00',
                boxShadow: '0 6px 18px rgba(251, 140, 0, 0.5)',
              },
            }}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            Already have an account?{' '}
            <MuiLink component={Link} to="/login" underline="hover" color="primary">
              Sign In
            </MuiLink>
          </Typography>
          <Typography variant="body2" mt={1}>
            <MuiLink component={Link} to="/" underline="hover" color="primary">
              Back to Home
            </MuiLink>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default SignUp;
