import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Navbar from '../common/Navbar';
import { useAuth } from '../../utils/auth';

function AdminDashboardLayout({ children }) {
  const { user } = useAuth();
  // Only render sidebar if user is ADMIN
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {user?.role === 'ADMIN' && <Sidebar />}
      <Box className="app-wrapper" sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Navbar />
        <Box component="main" className="main-content" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default React.memo(AdminDashboardLayout);