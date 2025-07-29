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

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '',
    subject: '',
    class: '',
    date: '',
    status: 'Present',
    remarks: ''
  });

  useEffect(() => {
    fetchAttendance();
    fetchStudents();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get('http://localhost:8080/ePathshala/api/attendance');
      setAttendance(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
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
      if (editingAttendance) {
        await axios.put(`http://localhost:8080/ePathshala/api/attendance/${editingAttendance.id}`, formData);
      } else {
        await axios.post('http://localhost:8080/ePathshala/api/attendance', formData);
      }
      fetchAttendance();
      handleClose();
    } catch (error) {
      console.error('Error saving attendance:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/ePathshala/api/attendance/${id}`);
      fetchAttendance();
    } catch (error) {
      console.error('Error deleting attendance:', error);
    }
  };

  const handleEdit = (attendanceRecord) => {
    setEditingAttendance(attendanceRecord);
    setFormData({
      studentId: attendanceRecord.studentId.toString(),
      subject: attendanceRecord.subject,
      class: attendanceRecord.class,
      date: attendanceRecord.date?.split('T')[0] || '',
      status: attendanceRecord.status,
      remarks: attendanceRecord.remarks || ''
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingAttendance(null);
    setFormData({ studentId: '', subject: '', class: '', date: '', status: 'Present', remarks: '' });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Attendance Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Mark Attendance
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  {students.find(s => s.id === record.studentId)?.name || 'Unknown'}
                </TableCell>
                <TableCell>{record.subject}</TableCell>
                <TableCell>{record.class}</TableCell>
                <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                <TableCell>{record.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(record)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(record.id)}>
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
          {editingAttendance ? 'Edit Attendance' : 'Mark Attendance'}
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
              label="Class"
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                label="Status"
              >
                <MenuItem value="Present">Present</MenuItem>
                <MenuItem value="Absent">Absent</MenuItem>
                <MenuItem value="Late">Late</MenuItem>
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
            {editingAttendance ? 'Update' : 'Mark'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Attendance; 