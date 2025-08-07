import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { useResponsive, containerStyles, responsiveUtils } from '../../utils/responsive';

function ResponsiveContainer({ 
  children, 
  maxWidth = 'lg', 
  padding = true,
  variant = 'main',
  sx = {},
  fullHeight = false,
  centerContent = false
}) {
  const { isMobile, isTablet, isDesktop, isLargeDesktop, isExtraLarge } = useResponsive();

  const getMaxWidth = () => {
    switch (maxWidth) {
      case 'xs': return { xs: '444px', sm: '444px', md: '444px', lg: '444px', xl: '444px' };
      case 'sm': return { xs: '600px', sm: '600px', md: '600px', lg: '600px', xl: '600px' };
      case 'md': return { xs: '900px', sm: '900px', md: '900px', lg: '900px', xl: '900px' };
      case 'lg': return { xs: '1200px', sm: '1200px', md: '1200px', lg: '1200px', xl: '1200px' };
      case 'xl': return { xs: '1536px', sm: '1536px', md: '1536px', lg: '1536px', xl: '1536px' };
      default: return { xs: '1200px', sm: '1200px', md: '1200px', lg: '1200px', xl: '1200px' };
    }
  };

  const getContainerStyle = () => {
    const baseStyle = containerStyles[variant] || containerStyles.main;
    const maxWidthValue = getMaxWidth();
    
    return {
      maxWidth: maxWidthValue,
      mx: 'auto',
      width: '100%',
      minHeight: fullHeight ? '100vh' : 'auto',
      display: centerContent ? 'flex' : 'block',
      flexDirection: centerContent ? 'column' : 'row',
      justifyContent: centerContent ? 'center' : 'flex-start',
      alignItems: centerContent ? 'center' : 'stretch',
      ...baseStyle,
      ...sx
    };
  };

  return (
    <Box sx={getContainerStyle()}>
      {children}
    </Box>
  );
}

export default React.memo(ResponsiveContainer); 