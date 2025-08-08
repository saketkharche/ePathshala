import React, { useState, useEffect } from "react";
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
  useMediaQuery,
  Badge,
  Popover,
  Drawer,
  List as MUIList,
  ListItem as MUIListItem,
  ListItemText as MUIListItemText,
  Tooltip,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  SmartToy as BotIcon,
  Quiz as QuizIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import Chatbot from './Chatbot';
import Logo from './Logo';
import {
  fetchUserNotifications,
  fetchUnreadNotificationCount,
  markAllNotificationsAsRead
} from '../../api/notifications';

const ROLE_COLORS = {
  ADMIN: '#d32f2f',
  STUDENT: '#1976d2',
  TEACHER: '#388e3c',
  PARENT: '#fbc02d',
};
const ROLE_ICONS = {
  ADMIN: <PersonIcon />,
  STUDENT: <QuizIcon />,
  TEACHER: <PersonIcon />,
  PARENT: <PersonIcon />,
};

const NAV_LINKS = [
  { label: 'Dashboard', path: (role) => `/${role}/`, icon: <QuizIcon fontSize="small" /> },
  { label: 'Forum', path: (role) => `/${role}/forum`, icon: <ChatIcon fontSize="small" /> },
  { label: 'Chat', path: (role) => `/${role}/chat`, icon: <ChatIcon fontSize="small" /> },
];

const PUBLIC_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

function Navbar({ onMenuClick, isMobile: propIsMobile, sidebarCollapsed = false }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = propIsMobile || useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifError, setNotifError] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Determine if we're on a page with sidebar (dashboard pages)
  // If onMenuClick is provided, we're on a dashboard page with sidebar
  const hasSidebar = onMenuClick !== undefined;

  // Load notifications when user is authenticated
  useEffect(() => {
    if (user && user.role && ['ADMIN', 'STUDENT', 'TEACHER', 'PARENT'].includes(user.role)) {
      loadNotifications();
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [user]);

  const loadNotifications = async () => {
    // Only load notifications for authenticated users with proper roles
    if (!user || !user.role || !['ADMIN', 'STUDENT', 'TEACHER', 'PARENT'].includes(user.role)) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    setNotifLoading(true);
    setNotifError("");
    try {
      const notifData = await fetchUserNotifications();
      setNotifications(notifData.notifications || []);
      setUnreadCount(notifData.unreadCount || 0);
    } catch (e) {
      console.warn('Failed to load notifications:', e.message);
      setNotifications([]);
      setUnreadCount(0);
      // Don't show error for 403/401 as it might be normal for some users
      if (e.message.includes('403') || e.message.includes('401')) {
        setNotifError("");
      } else {
        setNotifError("Failed to load notifications");
      }
    } finally {
      setNotifLoading(false);
    }
  };

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  
  const handleLogout = () => { 
    logout(); 
    try {
      if (navigate) {
        navigate('/login');
      } else {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = '/login';
    }
    handleClose(); 
  };
  
  const handleProfile = () => { 
    if (user?.role) {
      try {
        if (navigate) {
          navigate(`/${user.role.toLowerCase()}/profile`);
        } else {
          window.location.href = `/${user.role.toLowerCase()}/profile`;
        }
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = `/${user.role.toLowerCase()}/profile`;
      }
    }
    handleClose(); 
  };
  
  const handleChatbotOpen = () => setIsChatbotOpen(true);
  const handleChatbotClose = () => setIsChatbotOpen(false);
  
  const handleNotifOpen = async (event) => { 
    setNotifAnchorEl(event.currentTarget); 
    await loadNotifications(); 
  };
  
  const handleNotifClose = async () => { 
    setNotifAnchorEl(null); 
    
    // Only mark notifications as read for authenticated users with proper roles
    if (!user || !user.role || !['ADMIN', 'STUDENT', 'TEACHER', 'PARENT'].includes(user.role)) {
      return;
    }
    
    try {
      await markAllNotificationsAsRead();
      await loadNotifications();
    } catch (error) {
      console.warn('Failed to mark notifications as read:', error.message);
      // Don't show error for 403/401 as it might be normal for some users
    }
  };
  const notifOpen = Boolean(notifAnchorEl);
  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  const roleColor = user?.role ? ROLE_COLORS[user.role.toUpperCase()] || theme.palette.primary.main : theme.palette.primary.main;
  const roleIcon = user?.role ? ROLE_ICONS[user.role.toUpperCase()] : <PersonIcon />;

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={4} 
        sx={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
          color: 'text.primary',
          transition: 'all 0.3s ease',
          // Ensure navbar stays above all content
          zIndex: theme.zIndex.appBar,
          // Position based on whether we have a sidebar
          top: 0,
          left: hasSidebar ? { 
            xs: 0, // Full width on mobile
            md: sidebarCollapsed ? '60px' : '280px' // Start after sidebar
          } : 0, // Full width on public pages
          right: 0,
          width: hasSidebar ? { 
            xs: '100%', // Full width on mobile
            md: sidebarCollapsed ? 'calc(100% - 60px)' : 'calc(100% - 280px)' // Width minus sidebar
          } : '100%', // Full width on public pages
          // Ensure proper height with responsive sizing
          height: { xs: '56px', sm: '64px', md: '72px' },
          minHeight: { xs: '56px', sm: '64px', md: '72px' },
          // Prevent content from showing through
          backgroundColor: 'rgba(255,255,255,0.95)',
          // Add responsive container
          maxWidth: '100vw',
          overflow: 'hidden'
        }}
      >
        <Toolbar sx={{
          height: { xs: '56px', sm: '64px', md: '72px' },
          minHeight: { xs: '56px', sm: '64px', md: '72px' },
          px: { xs: 3, sm: 4, md: 6 },
          py: 0,
          boxShadow: 'none',
          bgcolor: 'transparent',
          display: 'flex',
          gap: { xs: 2, sm: 3, md: 4 },
          // Ensure proper alignment
          alignItems: 'center',
          justifyContent: 'space-between',
          // Prevent overflow
          overflow: 'hidden',
          // Make it flexible
          flexWrap: 'nowrap',
          // Add max width container for better centering
          maxWidth: hasSidebar ? '100%' : '1400px', // Increased width for better spacing
          mx: 'auto'
        }}>
          {/* Left: App logo/title */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 1, sm: 1.5 }, 
            // Prevent text overflow
            minWidth: 0,
            flexShrink: 0,
            // Give more space to logo
            maxWidth: { xs: '45%', sm: '40%', md: '35%' }
          }}>
            <Logo 
              variant="minimal"
              size={isMobile ? 'small' : 'medium'}
              sx={{ 
                color: roleColor,
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                fontWeight: 700,
                letterSpacing: 1,
                textShadow: '0 1px 8px rgba(0,0,0,0.04)'
              }}
            />
          </Box>



          {/* Right: Navigation links and User actions */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 1, sm: 1.5, md: 2 }, 
            ml: 'auto',
            // Prevent overflow
            overflow: 'hidden',
            flexShrink: 0
          }}>
            {/* Mobile Menu Buttons */}
            {user && isMobile && onMenuClick && (
              <IconButton
                color="inherit"
                aria-label="open sidebar"
                onClick={onMenuClick}
                sx={{ 
                  display: { xs: 'flex', md: 'none' },
                  p: { xs: 0.75, sm: 1, md: 1.25 },
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    backgroundColor: 'rgba(0,0,0,0.06)',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            {user && isMobile && !onMenuClick && (
              <IconButton
                color="inherit"
                onClick={handleDrawerToggle}
                sx={{ 
                  display: { xs: 'flex', md: 'none' },
                  p: { xs: 0.75, sm: 1, md: 1.25 },
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    backgroundColor: 'rgba(0,0,0,0.06)',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            {!user && isMobile && (
              <IconButton
                color="inherit"
                onClick={handleDrawerToggle}
                sx={{ 
                  display: { xs: 'flex', md: 'none' },
                  p: { xs: 0.75, sm: 1, md: 1.25 },
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    backgroundColor: 'rgba(0,0,0,0.06)',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            {/* Navigation links (desktop) */}
            {user && !isMobile && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: { xs: 1, sm: 1.5, md: 2 }, 
                mr: 2
              }}>
                {NAV_LINKS.map(link => (
                  <Button
                    key={link.label}
                    color="inherit"
                    component={Link}
                    to={link.path(user.role?.toLowerCase())}
                    startIcon={link.icon}
                    sx={{
                      textTransform: 'none',
                      fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                      px: { xs: 1.5, sm: 2, md: 2.5 },
                      py: { xs: 0.75, sm: 1 },
                      borderRadius: 2,
                      transition: 'all 0.2s ease',
                      '&:hover': { 
                        backgroundColor: 'rgba(0,0,0,0.04)',
                        transform: 'translateY(-1px)'
                      },
                      // Prevent text overflow
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      // Make buttons more flexible
                      minWidth: 'auto',
                      flexShrink: 0
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Box>
            )}
            {!user && !isMobile && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: { xs: 1, sm: 1.5, md: 2 }, 
                mr: 2
              }}>
                {PUBLIC_LINKS.map(link => (
                  <Button
                    key={link.label}
                    color="inherit"
                    component={Link}
                    to={link.path}
                    sx={{
                      textTransform: 'none',
                      fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                      px: { xs: 1.5, sm: 2, md: 2.5 },
                      py: { xs: 0.75, sm: 1 },
                      borderRadius: 2,
                      transition: 'all 0.2s ease',
                      '&:hover': { 
                        backgroundColor: 'rgba(0,0,0,0.04)',
                        transform: 'translateY(-1px)'
                      },
                      // Prevent text overflow
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      // Make buttons more flexible
                      minWidth: 'auto',
                      flexShrink: 0
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Box>
            )}
            {user && (
              <>
                {/* Notification bell - only show if user has permission */}
                {user.role && ['ADMIN', 'STUDENT', 'TEACHER', 'PARENT'].includes(user.role) && (
                  <Tooltip title="Notifications">
                    <IconButton
                      color="inherit"
                      onClick={handleNotifOpen}
                      sx={{ 
                        p: { xs: 0.75, sm: 1, md: 1.25 }, 
                        transition: 'all 0.2s ease', 
                        '&:hover': { 
                          backgroundColor: 'rgba(0,0,0,0.06)',
                          transform: 'scale(1.05)'
                        } 
                      }}
                    >
                      <Badge badgeContent={unreadCount} color="error" max={99}>
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                )}

                {/* Chatbot button */}
                <Tooltip title="AI Assistant">
                  <IconButton
                    color="inherit"
                    onClick={handleChatbotOpen}
                    sx={{ 
                      p: { xs: 0.75, sm: 1, md: 1.25 }, 
                      transition: 'all 0.2s ease', 
                      '&:hover': { 
                        backgroundColor: 'rgba(0,0,0,0.06)',
                        transform: 'scale(1.05)'
                      } 
                    }}
                  >
                    <BotIcon />
                  </IconButton>
                </Tooltip>

                {/* User menu */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  // Prevent overflow
                  minWidth: 0
                }}>
                  <Chip
                    label={user.role || 'User'}
                    size="small"
                    sx={{
                      backgroundColor: roleColor,
                      color: 'white',
                      fontSize: { xs: '0.7rem', sm: '0.8rem' },
                      height: { xs: 24, sm: 28 },
                      '& .MuiChip-label': {
                        px: { xs: 1, sm: 1.5 },
                      },
                      // Prevent text overflow
                      maxWidth: { xs: 60, sm: 80 },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  />
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleMenu}
                      sx={{ 
                        p: { xs: 0.75, sm: 1, md: 1.25 }, 
                        transition: 'all 0.2s ease', 
                        '&:hover': { 
                          backgroundColor: 'rgba(0,0,0,0.06)',
                          transform: 'scale(1.05)'
                        } 
                      }}
                    >
                      <Avatar
                        sx={{
                          width: { xs: 32, sm: 36, md: 40 },
                          height: { xs: 32, sm: 36, md: 40 },
                          backgroundColor: roleColor,
                          fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                        }}
                      >
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            )}

            {!user && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: { xs: 1, sm: 2 },
                // Prevent overflow
                overflow: 'hidden'
              }}>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{
                    textTransform: 'none',
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    px: { xs: 1.5, sm: 2 },
                    py: { xs: 0.5, sm: 0.75 },
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'rgba(0,0,0,0.12)',
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.04)',
                      borderColor: 'rgba(0,0,0,0.24)',
                    },
                    // Prevent text overflow
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  Sign In
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Notification Popover */}
      <Popover
        open={Boolean(notifAnchorEl)}
        anchorEl={notifAnchorEl}
        onClose={handleNotifClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ 
          sx: { 
            minWidth: 260, 
            borderRadius: 2, 
            boxShadow: 4,
            // Ensure popover appears above other content
            zIndex: theme.zIndex.modal + 1
          } 
        }}
      >
        <Box sx={{ p: 1 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Notifications
          </Typography>
          {notifError && (
            <Typography variant="body2" color="error">{notifError}</Typography>
          )}
          {notifLoading ? (
            <Typography variant="body2">Loading...</Typography>
          ) : (
            <MUIList dense>
              {notifications.length === 0 && !notifError && (
                <MUIListItem>
                  <MUIListItemText primary="No notifications" />
                </MUIListItem>
              )}
              {notifications.map((notif) => (
                <MUIListItem key={notif.id} selected={!notif.read}>
                  <MUIListItemText primary={notif.text || notif.content || notif.title} />
                </MUIListItem>
              ))}
            </MUIList>
          )}
        </Box>
      </Popover>

      {/* User Menu */}
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{ 
          sx: { 
            borderRadius: 2, 
            boxShadow: 4,
            // Ensure menu appears above other content
            zIndex: theme.zIndex.modal + 1
          } 
        }}
      >
        <MenuItem onClick={handleProfile}>
          <PersonIcon sx={{ mr: 1 }} />
          Profile
          <Chip
            label={user?.role}
            color="default"
            size="small"
            sx={{ ml: 1, bgcolor: roleColor, color: 'white', fontWeight: 600 }}
          />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Mobile Drawer for navigation */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{ 
          sx: { 
            width: 220, 
            borderRadius: 2, 
            boxShadow: 4,
            // Ensure mobile drawer appears above all content
            zIndex: theme.zIndex.modal + 2
          } 
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: roleColor, display: 'flex', alignItems: 'center', gap: 1 }}>
            {roleIcon} ePathshala
          </Typography>
          <MUIList>
            {user
              ? NAV_LINKS.map(link => (
                  <MUIListItem button key={link.label} component={Link} to={link.path(user.role?.toLowerCase())} onClick={handleDrawerToggle}>
                    {link.icon}
                    <MUIListItemText primary={link.label} sx={{ ml: 1 }} />
                  </MUIListItem>
                ))
              : PUBLIC_LINKS.map(link => (
                  <MUIListItem button key={link.label} component={Link} to={link.path} onClick={handleDrawerToggle}>
                    <MUIListItemText primary={link.label} />
                  </MUIListItem>
                ))}
          </MUIList>
        </Box>
      </Drawer>
      
      {/* Chatbot */}
      <Chatbot open={isChatbotOpen} onClose={handleChatbotClose} />
    </>
  );
}

export default Navbar;