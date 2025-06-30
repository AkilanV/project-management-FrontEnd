import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, TextField,
  Select, MenuItem, Button, Box, Paper, InputLabel, FormControl
} from '@mui/material';
import { useSnackbar } from 'notistack';
import carImg from '../assets/Images/bigstock-Car-Service.jpg';
import type { User } from '../types/User';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Admin' | 'Viewer'>('Viewer');
  const [isSignUp, setIsSignUp] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = () => {
    const user: User = { username, role }; // Note: Role from local state (default is Viewer)
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/projects');
  };

  const handleRegister = () => {
    enqueueSnackbar('Registered successfully!', { variant: 'success' });
    setIsSignUp(false); // Go back to login
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

            {/* Role dropdown only during Sign Up */}
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
