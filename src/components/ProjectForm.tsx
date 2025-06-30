// components/ProjectForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, TextField,
  Button, Box, Paper
} from '@mui/material';
import { useSnackbar } from 'notistack';

const ProjectForm: React.FC = () => {
  const [projectName, setProjectName] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleCreateProject = () => {
    console.log(`Created project: ${projectName}`);
    enqueueSnackbar(`Project "${projectName}" created successfully!`, { variant: 'success' });
    navigate('/projects');
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
