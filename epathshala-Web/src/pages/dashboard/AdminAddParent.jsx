import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { addParent } from '../../api/admin';

function AdminAddParent() {
  const [parentForm, setParentForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const onAddParent = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const result = await addParent(parentForm);
      if (result && result.error) {
        setError(result.error);
      } else {
        setSuccess('Parent added successfully!');
        setParentForm({ name: '', email: '', password: '' });
      }
    } catch (err) {
      setError('Failed to add parent');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={onAddParent} sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>Add Parent</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Name"
          value={parentForm.name}
          onChange={e => setParentForm({ ...parentForm, name: e.target.value })}
          required
        />
        <TextField
          label="Email"
          value={parentForm.email}
          onChange={e => setParentForm({ ...parentForm, email: e.target.value })}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={parentForm.password}
          onChange={e => setParentForm({ ...parentForm, password: e.target.value })}
          required
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Parent'}
        </Button>
      </Box>
      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
}

export default React.memo(AdminAddParent);