import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../common/Navbar';
import Footer from './Footer';

function PublicLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

export default React.memo(PublicLayout); 