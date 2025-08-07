import React, { useState } from 'react';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import StudentSidebar from './StudentSidebar';
import Footer from './Footer';
import Navbar from '../common/Navbar';
import Breadcrumb from '../common/Breadcrumb';

function StudentDashboardLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <StudentSidebar open={mobileOpen} onClose={handleDrawerToggle} />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Navbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Navbar>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Breadcrumb />
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default React.memo(StudentDashboardLayout);