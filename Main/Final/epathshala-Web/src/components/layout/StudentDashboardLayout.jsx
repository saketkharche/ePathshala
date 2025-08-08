import React, { useState } from 'react';
import { Box } from '@mui/material';
import Navbar from '../common/Navbar';
import StudentSidebar from './StudentSidebar';

function StudentDashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <StudentSidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onCollapse={handleSidebarCollapse}
      />
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
        <Navbar 
          onMenuClick={handleSidebarToggle}
          sidebarCollapsed={sidebarCollapsed}
        />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            pt: { xs: '64px', sm: '72px' },
            px: { xs: 2, sm: 3, md: 4 },
            py: 3,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default StudentDashboardLayout;