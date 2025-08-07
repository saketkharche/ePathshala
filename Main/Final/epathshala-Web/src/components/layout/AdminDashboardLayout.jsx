import React, { useState } from 'react';
import { Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Navbar from '../common/Navbar';
import { useAuth } from '../../utils/auth';
import { useResponsive } from '../../utils/responsive';

function AdminDashboardLayout({ children }) {
  const { user } = useAuth();
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const stored = localStorage.getItem('adminSidebarCollapsed');
    return stored === 'true';
  });

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarCollapse = () => {
    setSidebarCollapsed((prev) => {
      const newState = !prev;
      localStorage.setItem('adminSidebarCollapsed', newState);
      return newState;
    });
  };

  const sidebarWidth = sidebarCollapsed ? 60 : 280;

  // Only render sidebar if user is ADMIN
  if (user?.role !== 'ADMIN') {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Box className="app-wrapper" sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Navbar />
          {/* Spacer to prevent content from being hidden behind fixed navbar */}
          <Box
            sx={{
              height: { xs: '56px', sm: '64px', md: '72px', lg: '80px', xl: '88px' },
              width: '100%',
            }}
          />
          <Box component="main" className="main-content" sx={{ flexGrow: 1, p: 3 }}>
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    );
  }

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
      <Box 
        className="app-wrapper" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          flexGrow: 1, 
          ml: { md: `${sidebarWidth}px` }, 
          transition: 'margin-left 0.3s ease-in-out' 
        }}
      >
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
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            p: { xs: 1.5, sm: 2 }, 
            borderBottom: 1, 
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            boxShadow: 1
          }}
        >
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
        <Box 
          component="main" 
          className="main-content" 
          sx={{ 
            flexGrow: 1, 
            p: { xs: 2, sm: 3, md: 4 },
            backgroundColor: 'background.default',
            minHeight: 'calc(100vh - 64px - 64px)', // Subtract header and footer heights
          }}
        >
          {children}
        </Box>
        
        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
}

export default React.memo(AdminDashboardLayout);