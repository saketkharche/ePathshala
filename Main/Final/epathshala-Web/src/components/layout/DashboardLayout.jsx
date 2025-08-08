import React, { useState, useEffect } from 'react';
import { Box, IconButton, useTheme, useMediaQuery, Backdrop, Fade } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Navbar from '../common/Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

// Constants for responsive design
const SIDEBAR_COLLAPSED_WIDTH = 60;
const SIDEBAR_EXPANDED_WIDTH = 280;
const NAVBAR_HEIGHT = {
  xs: '56px',
  sm: '64px', 
  md: '72px',
  lg: '80px',
  xl: '88px'
};

function DashboardLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  // State management
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const stored = localStorage.getItem('mainSidebarCollapsed');
    return stored === 'true';
  });

  // Responsive sidebar behavior
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  // Handlers
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarCollapse = () => {
    setSidebarCollapsed((prev) => {
      const newValue = !prev;
      localStorage.setItem('mainSidebarCollapsed', newValue);
      return newValue;
    });
  };

  const handleSidebarClose = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Calculate sidebar width based on state
  const sidebarWidth = sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH;
  
  // Calculate main content margin
  const mainContentMargin = isMobile ? 0 : sidebarWidth;

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={handleSidebarClose}
        collapsed={sidebarCollapsed}
        onCollapse={handleSidebarCollapse}
        isMobile={isMobile}
      />

      {/* Main Content Area */}
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          minHeight: '100vh',
          width: '100%',
          ml: {
            xs: 0,
            md: `${mainContentMargin}px`
          },
          transition: theme.transitions.create(['margin-left'], {
            duration: theme.transitions.duration.standard,
          }),
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Fixed Navbar */}
        <Navbar 
          onMenuClick={handleSidebarToggle}
          isMobile={isMobile}
        />

        {/* Content Container */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            minHeight: `calc(100vh - ${NAVBAR_HEIGHT.xs})`,
            pt: {
              xs: NAVBAR_HEIGHT.xs,
              sm: NAVBAR_HEIGHT.sm,
              md: NAVBAR_HEIGHT.md,
              lg: NAVBAR_HEIGHT.lg,
              xl: NAVBAR_HEIGHT.xl
            },
            position: 'relative',
            overflow: 'auto'
          }}
        >
          {/* Page Content */}
          <Box 
            component="main" 
            sx={{
              flexGrow: 1,
              p: {
                xs: 2,
                sm: 3,
                md: 4
              },
              pb: {
                xs: 8, // Space for footer
                sm: 10
              },
              maxWidth: '100%',
              overflow: 'hidden'
            }}
          >
            {children}
          </Box>

          {/* Footer */}
          <Footer />
        </Box>
      </Box>

      {/* Mobile Backdrop */}
      {isMobile && sidebarOpen && (
        <Backdrop
          open={sidebarOpen}
          onClick={handleSidebarClose}
          sx={{
            zIndex: theme.zIndex.drawer - 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
        />
      )}
    </Box>
  );
}

export default React.memo(DashboardLayout); 