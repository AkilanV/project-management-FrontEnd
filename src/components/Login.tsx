import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, TextField,
  Select, MenuItem, Button, Box, Paper, InputLabel, FormControl
} from '@mui/material';
import { useSnackbar } from 'notistack';
import carImg from '../assets/Images/bigstock-Car-Service.jpg';
import type { User } from '../types/User';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Admin' | 'Viewer'>('Viewer');
  const [isSignUp, setIsSignUp] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE}/auth/login`, { username, password });
      const user: User = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      enqueueSnackbar('Login successful!', { variant: 'success' });
      navigate('/projects');
    } catch (error) {
      enqueueSnackbar('Login failed. Please check credentials.', { variant: 'error' });
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post(`${API_BASE}/auth/register`, { username, password, role });
      enqueueSnackbar('Registered successfully!', { variant: 'success' });
      setIsSignUp(false);
    } catch (error) {
      enqueueSnackbar('Registration failed.', { variant: 'error' });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${carImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, backdropFilter: 'blur(6px)', backgroundColor: 'rgba(255,255,255,0.85)' }}>
          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h4" textAlign="center">
              {isSignUp ? 'Register' : 'Login'}
            </Typography>

            <TextField
              label="Username"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {isSignUp && (
              <FormControl fullWidth>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  value={role}
                  label="Role"
                  onChange={(e) => setRole(e.target.value as 'Admin' | 'Viewer')}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Viewer">Viewer</MenuItem>
                </Select>
              </FormControl>
            )}

            {!isSignUp ? (
              <>
                <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
                  Sign In
                </Button>
                <Button variant="text" onClick={() => setIsSignUp(true)} fullWidth>
                  Don't have an account? Sign Up
                </Button>
              </>
            ) : (
              <>
                <Button variant="contained" color="secondary" onClick={handleRegister} fullWidth>
                  Register
                </Button>
                <Button variant="text" onClick={() => setIsSignUp(false)} fullWidth>
                  Already have an account? Sign In
                </Button>
              </>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
