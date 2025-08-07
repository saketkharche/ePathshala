import { useTheme, useMediaQuery } from '@mui/material';

// Enhanced responsive breakpoints with better proportions
export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

// Enhanced responsive spacing with better proportions
export const spacing = {
  xs: { xs: 1, sm: 1.5, md: 2, lg: 2.5, xl: 3 },
  sm: { xs: 1.5, sm: 2, md: 3, lg: 4, xl: 5 },
  md: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
  lg: { xs: 3, sm: 4, md: 5, lg: 6, xl: 8 },
  xl: { xs: 4, sm: 5, md: 6, lg: 8, xl: 10 },
};

// Enhanced responsive typography with better proportions
export const typography = {
  h1: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem', lg: '3.25rem', xl: '3.75rem' },
  h2: { xs: '1.5rem', sm: '1.875rem', md: '2.25rem', lg: '2.75rem', xl: '3.25rem' },
  h3: { xs: '1.25rem', sm: '1.5rem', md: '1.875rem', lg: '2.25rem', xl: '2.75rem' },
  h4: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem', lg: '1.875rem', xl: '2.25rem' },
  h5: { xs: '1rem', sm: '1.125rem', md: '1.25rem', lg: '1.5rem', xl: '1.875rem' },
  h6: { xs: '0.875rem', sm: '1rem', md: '1.125rem', lg: '1.25rem', xl: '1.5rem' },
  body1: { xs: '0.875rem', sm: '0.9375rem', md: '1rem', lg: '1.0625rem', xl: '1.125rem' },
  body2: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem', lg: '0.9375rem', xl: '1rem' },
  caption: { xs: '0.6875rem', sm: '0.75rem', md: '0.8125rem', lg: '0.875rem', xl: '0.9375rem' },
};

// Enhanced responsive grid configurations with better proportions
export const gridConfig = {
  cards: {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
    xl: 2,
  },
  forms: {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
    xl: 2,
  },
  content: {
    xs: 12,
    sm: 12,
    md: 8,
    lg: 9,
    xl: 10,
  },
  sidebar: {
    xs: 12,
    sm: 12,
    md: 4,
    lg: 3,
    xl: 2,
  },
  dashboard: {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
    xl: 2,
  },
};

// Enhanced responsive container styles with better proportions
export const containerStyles = {
  main: {
    maxWidth: 'xl',
    px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
    py: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
  },
  content: {
    maxWidth: 'lg',
    px: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
    py: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
  },
  narrow: {
    maxWidth: 'md',
    px: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
    py: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
  },
  wide: {
    maxWidth: 'xl',
    px: { xs: 1, sm: 2, md: 3, lg: 4, xl: 6 },
    py: { xs: 1, sm: 2, md: 3, lg: 4, xl: 6 },
  },
};

// Enhanced responsive card styles with better proportions
export const cardStyles = {
  default: {
    p: { xs: 2, sm: 2.5, md: 3, lg: 3.5, xl: 4 },
    borderRadius: { xs: 2, sm: 2.5, md: 3, lg: 3.5, xl: 4 },
  },
  compact: {
    p: { xs: 1.5, sm: 2, md: 2.5, lg: 3, xl: 3.5 },
    borderRadius: { xs: 1.5, sm: 2, md: 2.5, lg: 3, xl: 3.5 },
  },
  spacious: {
    p: { xs: 3, sm: 3.5, md: 4, lg: 5, xl: 6 },
    borderRadius: { xs: 3, sm: 3.5, md: 4, lg: 5, xl: 6 },
  },
};

// Enhanced responsive button styles with better proportions
export const buttonStyles = {
  primary: {
    px: { xs: 2, sm: 2.5, md: 3, lg: 3.5, xl: 4 },
    py: { xs: 1, sm: 1.25, md: 1.5, lg: 1.75, xl: 2 },
    fontSize: { xs: '0.875rem', sm: '0.9375rem', md: '1rem', lg: '1.0625rem', xl: '1.125rem' },
    minHeight: { xs: 40, sm: 44, md: 48, lg: 52, xl: 56 },
  },
  secondary: {
    px: { xs: 1.5, sm: 2, md: 2.5, lg: 3, xl: 3.5 },
    py: { xs: 0.75, sm: 1, md: 1.25, lg: 1.5, xl: 1.75 },
    fontSize: { xs: '0.8125rem', sm: '0.875rem', md: '0.9375rem', lg: '1rem', xl: '1.0625rem' },
    minHeight: { xs: 36, sm: 40, md: 44, lg: 48, xl: 52 },
  },
  small: {
    px: { xs: 1, sm: 1.25, md: 1.5, lg: 1.75, xl: 2 },
    py: { xs: 0.5, sm: 0.625, md: 0.75, lg: 0.875, xl: 1 },
    fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem', lg: '0.9375rem', xl: '1rem' },
    minHeight: { xs: 32, sm: 36, md: 40, lg: 44, xl: 48 },
  },
};

// Enhanced responsive sidebar styles with better proportions
export const sidebarStyles = {
  collapsed: {
    width: { xs: 60, sm: 60, md: 60, lg: 60, xl: 60 },
    transition: 'width 0.3s ease-in-out',
  },
  expanded: {
    width: { xs: 280, sm: 280, md: 280, lg: 300, xl: 320 },
    transition: 'width 0.3s ease-in-out',
  },
  mobile: {
    width: { xs: 280, sm: 280, md: 280, lg: 300, xl: 320 },
    boxShadow: 8,
    border: 'none',
  },
  desktop: {
    boxShadow: 2,
    border: 'none',
    overflowX: 'hidden',
  },
  header: {
    minHeight: { xs: 64, sm: 72, md: 80, lg: 88, xl: 96 },
    p: { xs: 1.5, sm: 2, md: 2.5, lg: 3, xl: 3.5 },
    borderBottom: 1,
    borderColor: 'divider',
  },
  content: {
    flexGrow: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: { xs: 4, sm: 6, md: 8, lg: 8, xl: 8 },
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderRadius: { xs: 2, sm: 3, md: 4, lg: 4, xl: 4 },
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
  },
  footer: {
    p: { xs: 1.5, sm: 2, md: 2.5, lg: 3, xl: 3.5 },
    borderTop: 1,
    borderColor: 'divider',
    backgroundColor: 'background.paper',
  },
  menuItem: {
    mb: { xs: 0.5, sm: 0.75, md: 1, lg: 1.25, xl: 1.5 },
    mx: { xs: 0.5, sm: 0.75, md: 1, lg: 1.25, xl: 1.5 },
    borderRadius: { xs: 1, sm: 1.5, md: 2, lg: 2.5, xl: 3 },
    overflow: 'hidden',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.04)',
    },
  },
  menuButton: {
    minHeight: { xs: 48, sm: 52, md: 56, lg: 60, xl: 64 },
    px: { xs: 1, sm: 1.5, md: 2, lg: 2.5, xl: 3 },
    borderRadius: { xs: 1, sm: 1.5, md: 2, lg: 2.5, xl: 3 },
    transition: 'all 0.2s ease-in-out',
  },
  menuIcon: {
    minWidth: { xs: 36, sm: 40, md: 44, lg: 48, xl: 52 },
  },
  menuText: {
    '& .MuiTypography-root': {
      fontSize: { xs: '0.875rem', sm: '0.9375rem', md: '1rem', lg: '1.0625rem', xl: '1.125rem' },
    },
    '& .MuiListItemText-secondary': {
      fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem', lg: '0.9375rem', xl: '1rem' },
    },
  },
  sectionHeader: {
    px: { xs: 2, sm: 2.5, md: 3, lg: 3.5, xl: 4 },
    py: { xs: 1, sm: 1.25, md: 1.5, lg: 1.75, xl: 2 },
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.02)',
    },
  },
};

// Enhanced responsive layout styles with better proportions
export const layoutStyles = {
  dashboard: {
    display: 'flex',
    minHeight: '100vh',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    transition: 'margin-left 0.3s ease-in-out',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    p: { xs: 1.5, sm: 2, md: 2.5, lg: 3, xl: 3.5 },
    borderBottom: 1,
    borderColor: 'divider',
    backgroundColor: 'background.paper',
    boxShadow: 1,
    minHeight: { xs: 64, sm: 72, md: 80, lg: 88, xl: 96 },
  },
  content: {
    flexGrow: 1,
    p: { xs: 2, sm: 2.5, md: 3, lg: 4, xl: 5 },
    backgroundColor: 'background.default',
    minHeight: 'calc(100vh - 64px - 64px)',
  },
};

// Enhanced responsive form styles with better proportions
export const formStyles = {
  field: {
    '& .MuiOutlinedInput-root': {
      fontSize: { xs: '0.875rem', sm: '0.9375rem', md: '1rem', lg: '1.0625rem', xl: '1.125rem' },
      minHeight: { xs: 40, sm: 44, md: 48, lg: 52, xl: 56 },
    },
    '& .MuiInputLabel-root': {
      fontSize: { xs: '0.875rem', sm: '0.9375rem', md: '1rem', lg: '1.0625rem', xl: '1.125rem' },
    },
    '& .MuiFormHelperText-root': {
      fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem', lg: '0.9375rem', xl: '1rem' },
    },
  },
  button: {
    minHeight: { xs: 40, sm: 44, md: 48, lg: 52, xl: 56 },
    fontSize: { xs: '0.875rem', sm: '0.9375rem', md: '1rem', lg: '1.0625rem', xl: '1.125rem' },
  },
};

// Enhanced responsive dialog styles with better proportions
export const dialogStyles = {
  paper: {
    width: { xs: '95vw', sm: '90vw', md: '80vw', lg: '70vw', xl: '60vw' },
    maxWidth: { xs: '400px', sm: '500px', md: '600px', lg: '700px', xl: '800px' },
    maxHeight: { xs: '90vh', sm: '85vh', md: '80vh', lg: '75vh', xl: '70vh' },
    m: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
  },
  content: {
    p: { xs: 2, sm: 2.5, md: 3, lg: 3.5, xl: 4 },
  },
  actions: {
    p: { xs: 1.5, sm: 2, md: 2.5, lg: 3, xl: 3.5 },
  },
};

// Enhanced responsive table styles with better proportions
export const tableStyles = {
  container: {
    overflowX: 'auto',
    '& .MuiTable-root': {
      minWidth: { xs: 300, sm: 400, md: 500, lg: 600, xl: 700 },
    },
  },
  cell: {
    fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem', lg: '0.9375rem', xl: '1rem' },
    padding: { xs: 1, sm: 1.25, md: 1.5, lg: 1.75, xl: 2 },
  },
  header: {
    fontSize: { xs: '0.8125rem', sm: '0.875rem', md: '0.9375rem', lg: '1rem', xl: '1.0625rem' },
    fontWeight: 600,
  },
};

// Enhanced responsive navigation styles with better proportions
export const navigationStyles = {
  appBar: {
    minHeight: { xs: 64, sm: 72, md: 80, lg: 88, xl: 96 },
  },
  toolbar: {
    minHeight: { xs: 64, sm: 72, md: 80, lg: 88, xl: 96 },
    px: { xs: 1.5, sm: 2, md: 2.5, lg: 3, xl: 3.5 },
  },
  menu: {
    '& .MuiPaper-root': {
      minWidth: { xs: 200, sm: 220, md: 240, lg: 260, xl: 280 },
    },
  },
};

// Enhanced responsive image styles with better proportions
export const imageStyles = {
  responsive: {
    width: '100%',
    height: 'auto',
    maxWidth: '100%',
  },
  cover: {
    width: '100%',
    height: { xs: 200, sm: 250, md: 300, lg: 350, xl: 400 },
    objectFit: 'cover',
  },
  avatar: {
    width: { xs: 40, sm: 48, md: 56, lg: 64, xl: 72 },
    height: { xs: 40, sm: 48, md: 56, lg: 64, xl: 72 },
  },
};

// Enhanced responsive text alignment
export const textAlign = {
  mobile: { xs: 'center', sm: 'left' },
  desktop: { xs: 'left', sm: 'left' },
  center: { xs: 'center', sm: 'center' },
  left: { xs: 'left', sm: 'left' },
  right: { xs: 'right', sm: 'right' },
};

// Enhanced responsive display
export const display = {
  mobileOnly: { xs: 'block', sm: 'none' },
  desktopOnly: { xs: 'none', sm: 'block' },
  tabletUp: { xs: 'none', sm: 'block' },
  mobileDown: { xs: 'block', sm: 'none' },
};

// Enhanced responsive flexbox
export const flex = {
  column: { xs: 'column', sm: 'row' },
  row: { xs: 'row', sm: 'row' },
  wrap: { xs: 'wrap', sm: 'wrap' },
  nowrap: { xs: 'nowrap', sm: 'nowrap' },
};

// Enhanced responsive positioning
export const position = {
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  start: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  end: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  between: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

// Enhanced custom hook for responsive design
export const useResponsive = () => {
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isExtraLarge = useMediaQuery(theme.breakpoints.up('xl'));
  
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isExtraLarge,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    theme,
  };
};

// Enhanced responsive utilities for common patterns
export const responsiveUtils = {
  // Get responsive spacing
  getSpacing: (size = 'md') => spacing[size],
  
  // Get responsive typography
  getTypography: (variant = 'body1') => typography[variant],
  
  // Get responsive grid
  getGrid: (type = 'cards') => gridConfig[type],
  
  // Get responsive container
  getContainer: (type = 'main') => containerStyles[type],
  
  // Get responsive card
  getCard: (type = 'default') => cardStyles[type],
  
  // Get responsive button
  getButton: (type = 'primary') => buttonStyles[type],
  
  // Get responsive sidebar
  getSidebar: (type = 'expanded') => sidebarStyles[type],
  
  // Get responsive layout
  getLayout: (type = 'dashboard') => layoutStyles[type],
  
  // Get responsive form
  getForm: (type = 'field') => formStyles[type],
  
  // Get responsive dialog
  getDialog: (type = 'paper') => dialogStyles[type],
  
  // Get responsive table
  getTable: (type = 'container') => tableStyles[type],
  
  // Get responsive navigation
  getNavigation: (type = 'appBar') => navigationStyles[type],
  
  // Get responsive image
  getImage: (type = 'responsive') => imageStyles[type],
};
