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

function Navbar({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifError, setNotifError] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const loadNotifications = async () => {
    setNotifLoading(true);
    setNotifError("");
    try {
      const notifData = await fetchUserNotifications();
      setNotifications(notifData.notifications || []);
      setUnreadCount(notifData.unreadCount || 0);
    } catch (e) {
      setNotifications([]);
      setUnreadCount(0);
      setNotifError("Failed to load notifications");
    } finally {
      setNotifLoading(false);
    }
  };

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => { logout(); navigate('/login'); handleClose(); };
  const handleProfile = () => { if (user?.role) navigate(`/${user.role.toLowerCase()}/profile`); handleClose(); };
  const handleChatbotOpen = () => setIsChatbotOpen(true);
  const handleChatbotClose = () => setIsChatbotOpen(false);
  const handleNotifOpen = async (event) => { setNotifAnchorEl(event.currentTarget); await loadNotifications(); };
  const handleNotifClose = async () => { setNotifAnchorEl(null); await markAllNotificationsAsRead(); await loadNotifications(); };
  const notifOpen = Boolean(notifAnchorEl);
  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  React.useEffect(() => {
    fetchUnreadNotificationCount().then(data => {
      setUnreadCount(data.unreadCount || 0);
      setNotifError("");
    }).catch(() => {
      setUnreadCount(0);
      setNotifError("Failed to load notifications");
    });
  }, []);

  const roleColor = user?.role ? ROLE_COLORS[user.role.toUpperCase()] || theme.palette.primary.main : theme.palette.primary.main;
  const roleIcon = user?.role ? ROLE_ICONS[user.role.toUpperCase()] : <PersonIcon />;

  return (
    <>
      <AppBar position="static" elevation={4} sx={{
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
        borderRadius: 3,
        mx: { xs: 0, sm: 2 },
        mt: { xs: 0, sm: 2 },
        color: 'text.primary',
        transition: 'background 0.3s',
      }}>
        <Toolbar sx={{
          minHeight: { xs: '56px', sm: '64px' },
          px: { xs: 1, sm: 2, md: 3 },
          borderRadius: 3,
          boxShadow: 'none',
          bgcolor: 'transparent',
          display: 'flex',
          gap: 2,
        }}>
          {/* Left: App logo/title */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              component="div"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                letterSpacing: 1,
                color: roleColor,
                textShadow: '0 1px 8px rgba(0,0,0,0.04)',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {roleIcon}
              ePathshala
            </Typography>
          </Box>

          {/* Center: Navigation links (desktop) or hamburger (mobile) */}
          {user && !isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
              {NAV_LINKS.map(link => (
                <Button
                  key={link.label}
                  color="inherit"
                  component={Link}
                  to={link.path(user.role?.toLowerCase())}
                  startIcon={link.icon}
                  sx={{
                    textTransform: 'none',
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    px: { xs: 1, sm: 2 },
                    borderRadius: 2,
                    transition: 'background 0.2s',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}
          {user && isMobile && (
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Right: User actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, ml: 'auto' }}>
            {user && (
              <>
                {/* Notification bell */}
                <Tooltip title="Notifications">
                  <IconButton
                    color="inherit"
                    onClick={handleNotifOpen}
                    sx={{ p: { xs: 0.5, sm: 1 }, transition: 'background 0.2s', '&:hover': { backgroundColor: 'rgba(0,0,0,0.06)' } }}
                  >
                    <Badge badgeContent={unreadCount} color="error" sx={{ transition: 'all 0.2s' }}>
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Popover
                  open={notifOpen}
                  anchorEl={notifAnchorEl}
                  onClose={handleNotifClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  PaperProps={{ sx: { minWidth: 260, borderRadius: 2, boxShadow: 4 } }}
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
                {/* Chatbot button */}
                <Tooltip title="AI Assistant">
                  <IconButton
                    color="inherit"
                    onClick={handleChatbotOpen}
                    sx={{
                      p: { xs: 0.5, sm: 1 },
                      '&:hover': { backgroundColor: 'rgba(0,0,0,0.06)' },
                      transition: 'background 0.2s',
                    }}
                  >
                    <BotIcon />
                  </IconButton>
                </Tooltip>
                {/* User avatar and menu */}
                <Tooltip title={user.name} arrow>
                  <IconButton
                    size="small"
                    onClick={handleMenu}
                    sx={{
                      p: { xs: 0.5, sm: 1 },
                      '&:hover': { backgroundColor: 'rgba(0,0,0,0.06)' },
                      transition: 'background 0.2s',
                    }}
                  >
                    <Avatar
                      sx={{
                        width: { xs: 28, sm: 32, md: 36 },
                        height: { xs: 28, sm: 32, md: 36 },
                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                        bgcolor: roleColor,
                        color: 'white',
                        fontWeight: 700,
                      }}
                    >
                      {user?.name?.charAt(0) || 'U'}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{ sx: { borderRadius: 2, boxShadow: 4 } }}
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
              </>
            )}
            {!user && (
              <Button
                color="primary"
                variant="contained"
                component={Link}
                to="/login"
                sx={{
                  textTransform: 'none',
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  px: { xs: 1, sm: 2 },
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {/* Mobile Drawer for navigation */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{ sx: { width: 220, borderRadius: 2, boxShadow: 4 } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: roleColor, display: 'flex', alignItems: 'center', gap: 1 }}>
            {roleIcon} ePathshala
          </Typography>
          <MUIList>
            {user && NAV_LINKS.map(link => (
              <MUIListItem button key={link.label} component={Link} to={link.path(user.role?.toLowerCase())} onClick={handleDrawerToggle}>
                {link.icon}
                <MUIListItemText primary={link.label} sx={{ ml: 1 }} />
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