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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingGrade, setEditingGrade] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '',
    subject: '',
    marks: '',
    maxMarks: '',
    examType: '',
    remarks: ''
  });

  useEffect(() => {
    fetchGrades();
    fetchStudents();
  }, []);

  const fetchGrades = async () => {
    try {
      const response = await axios.get('http://localhost:8080/ePathshala/api/grades');
      setGrades(response.data);
    } catch (error) {
      console.error('Error fetching grades:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/ePathshala/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingGrade) {
        await axios.put(`http://localhost:8080/ePathshala/api/grades/${editingGrade.id}`, formData);
      } else {
        await axios.post('http://localhost:8080/ePathshala/api/grades', formData);
      }
      fetchGrades();
      handleClose();
    } catch (error) {
      console.error('Error saving grade:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/ePathshala/api/grades/${id}`);
      fetchGrades();
    } catch (error) {
      console.error('Error deleting grade:', error);
    }
  };

  const handleEdit = (grade) => {
    setEditingGrade(grade);
    setFormData({
      studentId: grade.studentId.toString(),
      subject: grade.subject,
      marks: grade.marks.toString(),
      maxMarks: grade.maxMarks.toString(),
      examType: grade.examType,
      remarks: grade.remarks || ''
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingGrade(null);
    setFormData({ studentId: '', subject: '', marks: '', maxMarks: '', examType: '', remarks: '' });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Grades Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Add Grade
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Marks</TableCell>
              <TableCell>Exam Type</TableCell>
              <TableCell>Percentage</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grades.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell>
                  {students.find(s => s.id === grade.studentId)?.name || 'Unknown'}
                </TableCell>
                <TableCell>{grade.subject}</TableCell>
                <TableCell>{grade.marks}/{grade.maxMarks}</TableCell>
                <TableCell>{grade.examType}</TableCell>
                <TableCell>
                  {((grade.marks / grade.maxMarks) * 100).toFixed(1)}%
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(grade)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(grade.id)}>
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
          {editingGrade ? 'Edit Grade' : 'Add New Grade'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Student</InputLabel>
              <Select
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                label="Student"
              >
                {students.map((student) => (
                  <MenuItem key={student.id} value={student.id}>
                    {student.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Marks Obtained"
              type="number"
              value={formData.marks}
              onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Maximum Marks"
              type="number"
              value={formData.maxMarks}
              onChange={(e) => setFormData({ ...formData, maxMarks: e.target.value })}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Exam Type</InputLabel>
              <Select
                value={formData.examType}
                onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
                label="Exam Type"
              >
                <MenuItem value="Midterm">Midterm</MenuItem>
                <MenuItem value="Final">Final</MenuItem>
                <MenuItem value="Quiz">Quiz</MenuItem>
                <MenuItem value="Assignment">Assignment</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Remarks"
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              margin="normal"
              multiline
              rows={2}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingGrade ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Grades; 