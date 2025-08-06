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
  Chip
} from '@mui/material';
import {
  Chat as ChatIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  SmartToy as BotIcon,
  Quiz as QuizIcon
} from '@mui/icons-material';
import Chatbot from './Chatbot';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ePathshala
            </Typography>
            
            {/* Show navigation links only if user is logged in */}
            {user ? (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to={`/${user.role?.toLowerCase()}`}
                  sx={{ textTransform: 'none' }}
                >
                  Dashboard
                </Button>
                
                <Button
                  color="inherit"
                  component={Link}
                  to={`/${user.role?.toLowerCase()}/forum`}
                  sx={{ textTransform: 'none' }}
                >
                  Forum
                </Button>
                
                <Button
                  color="inherit"
                  component={Link}
                  to={`/${user.role?.toLowerCase()}/chat`}
                  sx={{ textTransform: 'none' }}
                >
                  Chat
                </Button>
                
                <Button
                  color="inherit"
                  component={Link}
                  to={`/${user.role?.toLowerCase()}/notifications`}
                  sx={{ textTransform: 'none' }}
                >
                  Notifications
                </Button>
              </>
            ) : (
              <>
                {/* Public navigation links for non-logged in users */}
                <Button
                  color="inherit"
                  component={Link}
                  to="/home"
                  sx={{ textTransform: 'none' }}
                >
                  Home
                </Button>
                
                <Button
                  color="inherit"
                  component={Link}
                  to="/about"
                  sx={{ textTransform: 'none' }}
                >
                  About
                </Button>
                
                <Button
                  color="inherit"
                  component={Link}
                  to="/contact"
                  sx={{ textTransform: 'none' }}
                >
                  Contact
                </Button>
              </>
            )}
          </Box>

          {/* Right side of navbar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {user ? (
              <>
                {/* Chatbot Button */}
                <IconButton
                  color="inherit"
                  onClick={handleChatbotOpen}
                  aria-label="chatbot"
                >
                  <BotIcon />
                </IconButton>

                {/* User Menu */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    label={user.role || 'User'}
                    size="small"
                    color="secondary"
                    sx={{ color: 'white' }}
                  />
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      <PersonIcon />
                    </Avatar>
                  </IconButton>
                </Box>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
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
              </>
            ) : (
              <>
                {/* Login/Register buttons for non-logged in users */}
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{ textTransform: 'none' }}
                >
                  Login
                </Button>
                
                <Button
                  variant="outlined"
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{ 
                    textTransform: 'none',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    }
                  }}
                >
                  Get Started
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Chatbot */}
      {user && (
        <Chatbot
          open={isChatbotOpen}
          onClose={handleChatbotClose}
        />
      )}
    </>
  );
}

export default React.memo(Navbar);