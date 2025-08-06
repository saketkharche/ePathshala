import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { assignTeacher } from '../../api/admin';

function AdminAssignTeacher() {
  const [assign, setAssign] = useState({ email: '', subject: '', assignedClass: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const onAssignTeacher = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const result = await assignTeacher(assign);
      if (result && result.error) {
        setError(result.error);
      } else {
        setSuccess('Teacher assigned successfully!');
        setAssign({ email: '', subject: '', assignedClass: '' });
      }
    } catch (err) {
      setError('Failed to assign teacher');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={onAssignTeacher} sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>Assign Teacher to Class/Subject</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Teacher Email"
          value={assign.email}
          onChange={e => setAssign({ ...assign, email: e.target.value })}
          required
        />
        <TextField
          label="Subject"
          value={assign.subject}
          onChange={e => setAssign({ ...assign, subject: e.target.value })}
          required
        />
        <TextField
          label="Assigned Class"
          value={assign.assignedClass}
          onChange={e => setAssign({ ...assign, assignedClass: e.target.value })}
          required
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Assigning...' : 'Assign'}
        </Button>
      </Box>
      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
}

export default React.memo(AdminAssignTeacher);