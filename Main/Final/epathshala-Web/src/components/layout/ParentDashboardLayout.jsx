import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import ParentSidebar from './ParentSidebar';
import Footer from './Footer';
import Navbar from '../common/Navbar';
import Breadcrumb from '../common/Breadcrumb';

function ParentDashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <ParentSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Navbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
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

export default React.memo(ParentDashboardLayout);