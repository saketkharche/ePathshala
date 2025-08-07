import React, { useState } from 'react';
import { Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Navbar from '../common/Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

function DashboardLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const stored = localStorage.getItem('mainSidebarCollapsed');
    return stored === 'true';
  });
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleSidebarCollapse = () => {
    setSidebarCollapsed((prev) => {
      localStorage.setItem('mainSidebarCollapsed', !prev);
      return !prev;
    });
  };
  const sidebarWidth = sidebarCollapsed ? 60 : 280;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={handleSidebarToggle}
        collapsed={sidebarCollapsed}
        onCollapse={handleSidebarCollapse}
      />
      {/* Main Content */}
      <Box className="app-wrapper" sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, ml: { md: `${sidebarCollapsed ? 60 : 280}px` }, transition: 'margin-left 0.3s' }}>
        {/* Fixed Navbar */}
        <Navbar />
        {/* Spacer to prevent content from being hidden behind fixed navbar */}
        <Box
          sx={{
            height: { xs: '56px', sm: '64px', md: '72px', lg: '80px', xl: '88px' },
            width: '100%',
          }}
        />
        {/* Top Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderBottom: 1, borderColor: 'divider' }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open sidebar"
              onClick={handleSidebarToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
        {/* Page Content */}
        <Box component="main" className="main-content" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
}

export default React.memo(DashboardLayout); 