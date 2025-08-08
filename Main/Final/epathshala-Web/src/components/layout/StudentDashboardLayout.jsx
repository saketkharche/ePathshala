import React, { useState } from 'react';
import { Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Navbar from '../common/Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useResponsive } from '../../utils/responsive';

function StudentDashboardLayout({ children }) {
  const theme = useTheme();
  const { isMobile, isTablet, isDesktop } = useResponsive();
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
      const newState = !prev;
      localStorage.setItem('mainSidebarCollapsed', newState);
      return newState;
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
      <Box 
        className="app-wrapper" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          flexGrow: 1, 
          ml: { md: `${sidebarWidth}px` }, 
          transition: 'margin-left 0.3s ease-in-out',
          width: { md: `calc(100% - ${sidebarWidth}px)` }
        }}
      >
        {/* Fixed Navbar */}
        <Navbar sidebarCollapsed={sidebarCollapsed} />
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

export default React.memo(StudentDashboardLayout);