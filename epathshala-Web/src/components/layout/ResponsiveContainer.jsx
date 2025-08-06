import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';

function ResponsiveContainer({ 
  children, 
  maxWidth = 'lg', 
  padding = true,
  sx = {} 
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const getMaxWidth = () => {
    switch (maxWidth) {
      case 'xs': return '444px';
      case 'sm': return '600px';
      case 'md': return '900px';
      case 'lg': return '1200px';
      case 'xl': return '1536px';
      default: return '1200px';
    }
  };

  const getPadding = () => {
    if (!padding) return 0;
    if (isMobile) return 2;
    if (isTablet) return 3;
    return 4;
  };

  return (
    <Box
      sx={{
        maxWidth: getMaxWidth(),
        mx: 'auto',
        px: getPadding(),
        width: '100%',
        ...sx
      }}
    >
      {children}
    </Box>
  );
}

export default React.memo(ResponsiveContainer); 