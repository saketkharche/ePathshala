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
  SmartToy as BotIcon
} from '@mui/icons-material';
import Chatbot from './Chatbot';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

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
    navigate(`/${user?.role?.toLowerCase()}/profile`);
    handleClose();
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'inherit',
              fontWeight: 'bold'
            }}
          >
            ePathshala
          </Typography>

          {!user ? (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                color="inherit" 
                component={Link} 
                to="/about"
              >
                About Us
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/contact"
              >
                Contact Us
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Role Chip */}
              <Chip
                label={user.role}
                color="secondary"
                size="small"
                variant="outlined"
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.3)'
                }}
              />

              {/* User Info */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                  <PersonIcon />
                </Avatar>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  {user.name}
                </Typography>
              </Box>

              {/* Profile Menu */}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <PersonIcon />
              </IconButton>
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

              {/* Chatbot Button */}
              <IconButton
                color="inherit"
                aria-label="chatbot"
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <BotIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Chatbot Component - Only show when user is logged in */}
      {user && <Chatbot />}
    </>
  );
}

export default Navbar;