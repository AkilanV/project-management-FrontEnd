import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, TextField,
  Button, Box, Paper
} from '@mui/material';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const ProjectForm: React.FC = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      enqueueSnackbar('Project name is required.', { variant: 'warning' });
      return;
    }

    try {
      const payload = {
        name: projectName,
        description: description || undefined,
      };

      await axios.post(`${API_URL}/projects`, payload);

      enqueueSnackbar(`Project "${projectName}" created successfully!`, { variant: 'success' });
      navigate('/projects');
    } catch (error) {
      console.error('Error creating project:', error);
      enqueueSnackbar('Failed to create project.', { variant: 'error' });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 10 }}>
        <Box display="flex" flexDirection="column" gap={3}>
          <Typography variant="h4" textAlign="center">Create Project</Typography>

          <TextField
            label="Project Name"
            fullWidth
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateProject}
            fullWidth
          >
            Create Project
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProjectForm;
