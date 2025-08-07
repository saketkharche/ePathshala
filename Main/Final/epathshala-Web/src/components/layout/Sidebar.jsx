import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
  Fade,
  Avatar,
  Chip
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  Forum as ForumIcon,
  Chat as ChatIcon,
  Notifications as NotificationsIcon,
  Quiz as QuizIcon,
  Assignment as AssignmentIcon,
  CalendarToday as CalendarIcon,
  ContactSupport as ContactIcon,
  Info as InfoIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import { useResponsive, spacing, typography } from '../../utils/responsive';

const SIDEBAR_COLLAPSED_WIDTH = 60;
const SIDEBAR_EXPANDED_WIDTH = 280;

const menuItems = {
  main: [
    { text: 'Home', icon: HomeIcon, path: '/home' },
    { text: 'About Us', icon: InfoIcon, path: '/about' },
    { text: 'Contact Us', icon: ContactIcon, path: '/contact' },
  ],
  dashboards: [
    { text: 'Admin Dashboard', icon: AdminIcon, path: '/admin', role: 'ADMIN' },
    { text: 'Student Dashboard', icon: SchoolIcon, path: '/student', role: 'STUDENT' },
    { text: 'Teacher Dashboard', icon: PersonIcon, path: '/teacher', role: 'TEACHER' },
    { text: 'Parent Dashboard', icon: PersonIcon, path: '/parent', role: 'PARENT' },
  ],
  adminSections: [
    { text: 'Summary', icon: DashboardIcon, path: '/admin/summary', role: 'ADMIN' },
    { text: 'Add Student', icon: PersonIcon, path: '/admin/add-student', role: 'ADMIN' },
    { text: 'Add Teacher', icon: PersonIcon, path: '/admin/add-teacher', role: 'ADMIN' },
    { text: 'Add Parent', icon: PersonIcon, path: '/admin/add-parent', role: 'ADMIN' },
    { text: 'Assign Teacher', icon: AssignmentIcon, path: '/admin/assign-teacher', role: 'ADMIN' },
    { text: 'Reset Password', icon: SettingsIcon, path: '/admin/reset-password', role: 'ADMIN' },
    { text: 'Academic Calendar', icon: CalendarIcon, path: '/admin/calendar', role: 'ADMIN' },
    { text: 'Online Classes', icon: ChatIcon, path: '/admin/online-classes', role: 'ADMIN' },
    { text: 'Session Management', icon: SettingsIcon, path: '/admin/sessions', role: 'ADMIN' },
  ],
  features: [
    { text: 'Exams', icon: QuizIcon, path: '/student/exams', role: 'STUDENT' },
    { text: 'Assignments', icon: AssignmentIcon, path: '/assignments' },
    { text: 'Calendar', icon: CalendarIcon, path: '/calendar' },
    { text: 'Forum', icon: ForumIcon, path: '/forum' },
    { text: 'Notifications', icon: NotificationsIcon, path: '/notifications' },
  ],
  adminFeatures: [
    { text: 'Forum', icon: ForumIcon, path: '/forum' },
    { text: 'Notifications', icon: NotificationsIcon, path: '/notifications' },
  ],
};

function Sidebar({ open, onClose, collapsed, onCollapse }) {
  const theme = useTheme();
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [expanded, setExpanded] = useState({
    dashboards: true,
    features: true,
    adminSections: true
  });

  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile && !collapsed) {
      onCollapse?.();
    }
  }, [isMobile, collapsed, onCollapse]);

  const handleDrawerClose = () => {
    if (isMobile) {
      onClose?.();
    }
  };

  const handleItemClick = (path) => {
    navigate(path);
    handleDrawerClose();
  };

  const handleExpandClick = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isItemVisible = (item) => {
    if (!item.role) return true;
    return user?.role === item.role;
  };

  const renderMenuItem = (item, index, isCollapsed) => {
    const isActive = location.pathname === item.path;
    const isVisible = isItemVisible(item);
    
    if (!isVisible) return null;

    const menuItem = (
      <ListItem
        key={item.text}
        disablePadding
        sx={{
          mb: { xs: 0.5, sm: 1 },
          mx: { xs: 0.5, sm: 1 },
          borderRadius: { xs: 1, sm: 2 },
          overflow: 'hidden',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.04)',
          },
        }}
      >
        <ListItemButton
          onClick={() => handleItemClick(item.path)}
          sx={{
            minHeight: { xs: 48, sm: 56 },
            px: { xs: 1, sm: 2 },
            borderRadius: { xs: 1, sm: 2 },
            backgroundColor: isActive ? 'primary.main' : 'transparent',
            color: isActive ? 'primary.contrastText' : 'inherit',
            '&:hover': {
              backgroundColor: isActive ? 'primary.dark' : 'rgba(0,0,0,0.04)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: { xs: 36, sm: 40 },
              color: isActive ? 'primary.contrastText' : 'inherit',
            }}
          >
            <item.icon />
          </ListItemIcon>
          {!isCollapsed && (
            <ListItemText
              primary={item.text}
              sx={{
                '& .MuiTypography-root': {
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  fontWeight: isActive ? 600 : 400,
                },
              }}
            />
          )}
        </ListItemButton>
      </ListItem>
    );

    return isCollapsed ? (
      <Tooltip title={item.text} placement="right" key={item.text}>
        {menuItem}
      </Tooltip>
    ) : menuItem;
  };

  const renderSection = (title, items, sectionKey, isCollapsed) => (
    <Box key={sectionKey}>
      {!isCollapsed && (
        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            py: { xs: 1, sm: 1.5 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.02)',
            },
          }}
          onClick={() => handleExpandClick(sectionKey)}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              fontWeight: 600,
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {title}
          </Typography>
          {expanded[sectionKey] ? <ExpandLess /> : <ExpandMore />}
        </Box>
      )}
      <Collapse in={!isCollapsed || expanded[sectionKey]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.filter(isItemVisible).map((item, index) =>
            renderMenuItem(item, index, isCollapsed)
          )}
        </List>
      </Collapse>
    </Box>
  );

  const getSidebarSections = (user) => {
    const sections = [];
    
    if (user?.role === 'ADMIN') {
      sections.push(
        renderSection('Admin Management', menuItems.adminSections, 'adminSections', collapsed)
      );
    }
    
    sections.push(
      renderSection('Dashboards', menuItems.dashboards, 'dashboards', collapsed)
    );
    
    sections.push(
      renderSection('Features', menuItems.features, 'features', collapsed)
    );
    
    return sections;
  };

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH,
        transition: 'width 0.3s ease-in-out',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          p: { xs: 1.5, sm: 2 },
          borderBottom: 1,
          borderColor: 'divider',
          minHeight: { xs: 64, sm: 72 },
        }}
      >
        {!collapsed && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar
              sx={{
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 },
                bgcolor: 'primary.main',
              }}
            >
              <AdminIcon />
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                ePathshala
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  color: 'text.secondary',
                }}
              >
                Admin Panel
              </Typography>
            </Box>
          </Box>
        )}
        
        <IconButton
          onClick={onCollapse}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.04)',
            },
          }}
        >
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      {/* Navigation Items */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: 6,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: 3,
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
        }}
      >
        {getSidebarSections(user)}
      </Box>

      {/* Footer */}
      {!collapsed && user && (
        <Box
          sx={{
            p: { xs: 1.5, sm: 2 },
            borderTop: 1,
            borderColor: 'divider',
            backgroundColor: 'background.paper',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Avatar
              sx={{
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 },
                bgcolor: 'primary.main',
              }}
            >
              {user.name?.charAt(0) || 'U'}
            </Avatar>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {user.name || 'User'}
              </Typography>
              <Chip
                label={user.role || 'User'}
                size="small"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  height: { xs: 20, sm: 24 },
                }}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: SIDEBAR_EXPANDED_WIDTH,
              border: 'none',
              boxShadow: 8,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Desktop Drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH,
              border: 'none',
              boxShadow: 2,
              transition: 'width 0.3s ease-in-out',
              overflowX: 'hidden',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}

export default Sidebar; 