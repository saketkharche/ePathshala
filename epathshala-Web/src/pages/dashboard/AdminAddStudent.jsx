import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, Snackbar } from '@mui/material';
import { addStudent } from '../../api/admin';

function AdminAddStudent() {
  const [studentForm, setStudentForm] = useState({ name: '', email: '', password: '', studentClass: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const onAddStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const result = await addStudent(studentForm);
      if (result && result.error) {
        setError(result.error);
      } else {
        setSuccess('Student added successfully!');
        setStudentForm({ name: '', email: '', password: '', studentClass: '' });
      }
    } catch (err) {
      setError('Failed to add student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={onAddStudent} sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>Add Student</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Name"
          value={studentForm.name}
          onChange={e => setStudentForm({ ...studentForm, name: e.target.value })}
          required
        />
        <TextField
          label="Email"
          value={studentForm.email}
          onChange={e => setStudentForm({ ...studentForm, email: e.target.value })}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={studentForm.password}
          onChange={e => setStudentForm({ ...studentForm, password: e.target.value })}
          required
        />
        <TextField
          label="Class"
          value={studentForm.studentClass}
          onChange={e => setStudentForm({ ...studentForm, studentClass: e.target.value })}
          required
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Student'}
        </Button>
      </Box>
      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
}

export default React.memo(AdminAddStudent);