import React, { useState } from "react";
import { useAuth } from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Chat as ChatIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  SmartToy as BotIcon,
  Quiz as QuizIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import Chatbot from './Chatbot';

function Navbar({ children }) {
  console.log("Navbar component rendering...");
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleClose();
  };

  const handleProfile = () => {
    // Navigate to profile page based on role
    if (user?.role) {
      navigate(`/${user.role.toLowerCase()}/profile`);
    }
    handleClose();
  };

  const handleChatbotOpen = () => {
    setIsChatbotOpen(true);
  };

  const handleChatbotClose = () => {
    setIsChatbotOpen(false);
  };

  try {
    return (
      <>
        <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
          <Toolbar sx={{ 
            minHeight: { xs: '56px', sm: '64px' },
            px: { xs: 1, sm: 2, md: 3 }
          }}>
            {/* Render children first (like mobile menu button) */}
            {children}
            
            <Box sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 1, sm: 2 },
              flexWrap: 'wrap'
            }}>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                component="div" 
                sx={{ 
                  flexGrow: 1,
                  fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
                }}
              >
                ePathshala
              </Typography>
              
              {/* Show navigation links only if user is logged in and not on mobile */}
              {user && !isMobile ? (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to={`/${user.role?.toLowerCase()}`}
                    sx={{ 
                      textTransform: 'none',
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                      px: { xs: 1, sm: 2 }
                    }}
                  >
                    Dashboard
                  </Button>
                  
                  <Button
                    color="inherit"
                    component={Link}
                    to={`/${user.role?.toLowerCase()}/forum`}
                    sx={{ 
                      textTransform: 'none',
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                      px: { xs: 1, sm: 2 }
                    }}
                  >
                    Forum
                  </Button>
                  
                  <Button
                    color="inherit"
                    component={Link}
                    to={`/${user.role?.toLowerCase()}/chat`}
                    sx={{ 
                      textTransform: 'none',
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                      px: { xs: 1, sm: 2 }
                    }}
                  >
                    Chat
                  </Button>
                </>
              ) : null}
            </Box>

            {/* User section - always visible */}
            {user ? (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: { xs: 1, sm: 2 }
              }}>
                {/* Chatbot button */}
                <IconButton
                  color="inherit"
                  onClick={handleChatbotOpen}
                  sx={{ 
                    p: { xs: 0.5, sm: 1 },
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                  }}
                >
                  <BotIcon />
                </IconButton>

                {/* User info and menu */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: { xs: 0.5, sm: 1 }
                }}>
                  <Chip
                    label={user?.role || 'User'}
                    size={isMobile ? "small" : "medium"}
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontSize: { xs: '0.7rem', sm: '0.8rem' }
                    }}
                  />
                  
                  <IconButton
                    size="small"
                    onClick={handleMenu}
                    sx={{ 
                      p: { xs: 0.5, sm: 1 },
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        width: { xs: 28, sm: 32, md: 36 }, 
                        height: { xs: 28, sm: 32, md: 36 },
                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                      }}
                    >
                      {user?.name?.charAt(0) || 'U'}
                    </Avatar>
                  </IconButton>
                </Box>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleProfile}>
                    <PersonIcon sx={{ mr: 1 }} />
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 } }}>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{ 
                    textTransform: 'none',
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    px: { xs: 1, sm: 2 }
                  }}
                >
                  Login
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>

        {/* Chatbot */}
        <Chatbot 
          open={isChatbotOpen} 
          onClose={handleChatbotClose} 
        />
      </>
    );
  } catch (error) {
    console.error("Error in Navbar component:", error);
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ePathshala
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;