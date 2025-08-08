import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useAuth } from '../../utils/auth';

const HoverTest = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sidebar Hover Test
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Instructions:
        </Typography>
        <Typography variant="body1" paragraph>
          1. Make sure the sidebar is collapsed (click the collapse button if needed)
        </Typography>
        <Typography variant="body1" paragraph>
          2. Hover your mouse over the collapsed sidebar
        </Typography>
        <Typography variant="body1" paragraph>
          3. The sidebar should expand temporarily while hovering
        </Typography>
        <Typography variant="body1" paragraph>
          4. Move your mouse away and it should collapse again after 200ms
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Current User Info:
        </Typography>
        <Typography variant="body1">
          <strong>Name:</strong> {user?.name || 'Not available'}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {user?.email || 'Not available'}
        </Typography>
        <Typography variant="body1">
          <strong>Role:</strong> {user?.role || 'Not available'}
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Debug Information:
        </Typography>
        <Typography variant="body1" paragraph>
          Check the browser console for debug logs showing:
        </Typography>
        <Typography variant="body2" component="ul">
          <li>Mouse Enter/Leave events</li>
          <li>Collapsed state changes</li>
          <li>Hover expanded state changes</li>
          <li>Effective collapsed state</li>
        </Typography>
      </Paper>
    </Box>
  );
};

export default HoverTest;
