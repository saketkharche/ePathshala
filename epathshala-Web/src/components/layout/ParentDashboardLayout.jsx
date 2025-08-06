import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Navbar from '../common/Navbar';

function ParentDashboardLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default React.memo(ParentDashboardLayout);