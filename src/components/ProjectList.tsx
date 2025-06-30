import React, { useEffect, useState } from 'react';
import {
  Container, Typography, List, IconButton, Box,
  Button, Paper, Divider, Pagination, Dialog,
  DialogTitle, DialogContent, DialogActions,
  TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  const [editOpen, setEditOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);

  const user: User = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/projects`);
      setProjects(res.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleEditClick = (project: Project) => {
    setEditProject(project);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditProject(null);
  };

  const handleEditSave = async () => {
    if (editProject) {
      try {
        await axios.put(`${API_URL}/projects/${editProject.id}`, {
          name: editProject.name,
          description: editProject.description,
        });
        handleEditClose();
        fetchProjects();
      } catch (error) {
        console.error('Error updating project:', error);
      }
    }
  };

  const handleCreateProject = () => {
    navigate('/create-project');
  };

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
                        <IconButton color="primary" onClick={() => handleEditClick(project)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(project.id)}>
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

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 5, mt: 1 }}>
          <TextField
            label="Project Name"
            fullWidth
            sx={{ mt: 2}}
            value={editProject?.name || ''}
            onChange={(e) => setEditProject(prev => prev ? { ...prev, name: e.target.value } : null)}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={3}
            value={editProject?.description || ''}
            onChange={(e) => setEditProject(prev => prev ? { ...prev, description: e.target.value } : null)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProjectList;
