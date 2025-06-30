import React, { useEffect, useState } from 'react';
import {
  Container, Typography, List, IconButton, Box,
  Button, Paper, Divider, Pagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/User';

interface Project {
  id: number;
  name: string;
  description?: string;
}

const ITEMS_PER_PAGE = 2;

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const user: User = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  useEffect(() => {
    setProjects([
      { id: 1, name: 'Project Alpha', description: 'Revamp the client dashboard.' },
      { id: 2, name: 'Project Beta', description: 'Develop backend APIs for mobile app.' },
      { id: 3, name: 'Project Gamma', description: 'Migrate legacy database.' },
      { id: 4, name: 'Project Delta', description: 'Implement CI/CD pipeline.' },
    ]);
  }, []);

  const handleCreateProject = () => {
    navigate('/create-project');
  };

  // Pagination Logic
  const pageCount = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const paginatedProjects = projects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Project Dashboard
      </Typography>
      <Typography variant="subtitle1" textAlign="center" mb={3}>
        Welcome, <strong>{user.username}</strong> ({user.role})
      </Typography>

      <Paper elevation={4} sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Projects</Typography>
          {user.role === 'Admin' && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleCreateProject}
            >
              Create Project
            </Button>
          )}
        </Box>

        <Divider sx={{ mb: 2 }} />

        {projects.length === 0 ? (
          <Typography>No projects found.</Typography>
        ) : (
          <>
            <List>
              {paginatedProjects.map((project) => (
                <Paper key={project.id} variant="outlined" sx={{ mb: 2, p: 2 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {project.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {project.description}
                      </Typography>
                    </Box>
                    {user.role === 'Admin' && (
                      <Box>
                        <IconButton color="primary" aria-label="edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </Paper>
              ))}
            </List>

            <Box display="flex" justifyContent="center" mt={2}>
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={(_, value) => setCurrentPage(value)}
                color="primary"
              />
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ProjectList;
