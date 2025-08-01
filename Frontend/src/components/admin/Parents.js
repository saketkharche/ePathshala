import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const Parents = () => {
  const [parents, setParents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingParent, setEditingParent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    fetchParents();
  }, []);

  const fetchParents = async () => {
    try {
      const response = await axios.get('http://localhost:5129/api/parents');
      setParents(response.data);
    } catch (error) {
      console.error('Error fetching parents:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parentData = {
        ...formData,
        role: 'Parent' // Add the required role field
      };
      
      if (editingParent) {
        await axios.put(`http://localhost:5129/api/parents/${editingParent.id}`, parentData);
      } else {
        await axios.post('http://localhost:5129/api/parents', parentData);
      }
      fetchParents();
      handleClose();
    } catch (error) {
      console.error('Error saving parent:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5129/api/parents/${id}`);
      fetchParents();
    } catch (error) {
      console.error('Error deleting parent:', error);
    }
  };

  const handleEdit = (parent) => {
    setEditingParent(parent);
    setFormData({
      name: parent.name,
      email: parent.email,
      password: ''
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingParent(null);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Parents Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Add Parent
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Account Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parents.map((parent) => (
              <TableRow key={parent.id}>
                <TableCell>{parent.name}</TableCell>
                <TableCell>{parent.email}</TableCell>
                <TableCell>{parent.accountNumber}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(parent)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(parent.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingParent ? 'Edit Parent' : 'Add New Parent'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              margin="normal"
              required={!editingParent}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingParent ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Parents; 