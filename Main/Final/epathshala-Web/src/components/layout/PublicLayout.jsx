import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../common/Navbar';
import Footer from './Footer';

function PublicLayout({ children }) {
  console.log("PublicLayout component rendering...");
  
  try {
    return (
      <Box className="app-wrapper" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        {/* Spacer to prevent content from being hidden behind fixed navbar */}
        <Box
          sx={{
            height: { xs: '56px', sm: '64px', md: '72px', lg: '80px', xl: '88px' },
            width: '100%',
          }}
        />
        <Box 
          component="main" 
          className="main-content" 
          sx={{ 
            flexGrow: 1,
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    );
  } catch (error) {
    console.error("Error in PublicLayout component:", error);
    return (
      <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
        <h1 style={{ color: '#1976d2' }}>PublicLayout Error</h1>
        <p>Error: {error.message}</p>
      </div>
    );
  }
}

export default React.memo(PublicLayout); 