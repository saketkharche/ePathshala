import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { addTeacher } from '../../api/admin';

function AdminAddTeacher() {
  const [teacherForm, setTeacherForm] = useState({ name: '', email: '', password: '', subject: '', assignedClass: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const onAddTeacher = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const result = await addTeacher(teacherForm);
      if (result && result.error) {
        setError(result.error);
      } else {
        setSuccess('Teacher added successfully!');
        setTeacherForm({ name: '', email: '', password: '', subject: '', assignedClass: '' });
      }
    } catch (err) {
      setError('Failed to add teacher');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={onAddTeacher} sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>Add Teacher</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Name"
          value={teacherForm.name}
          onChange={e => setTeacherForm({ ...teacherForm, name: e.target.value })}
          required
        />
        <TextField
          label="Email"
          value={teacherForm.email}
          onChange={e => setTeacherForm({ ...teacherForm, email: e.target.value })}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={teacherForm.password}
          onChange={e => setTeacherForm({ ...teacherForm, password: e.target.value })}
          required
        />
        <TextField
          label="Subject"
          value={teacherForm.subject}
          onChange={e => setTeacherForm({ ...teacherForm, subject: e.target.value })}
          required
        />
        <TextField
          label="Assigned Class"
          value={teacherForm.assignedClass}
          onChange={e => setTeacherForm({ ...teacherForm, assignedClass: e.target.value })}
          required
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Teacher'}
        </Button>
      </Box>
      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
}

export default React.memo(AdminAddTeacher);