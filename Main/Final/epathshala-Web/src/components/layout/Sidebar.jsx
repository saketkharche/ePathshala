import React, { useState } from 'react';
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
  useMediaQuery
} from '@mui/material';
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
  ExpandLess,
  ExpandMore,
  Wifi as WebSocketIcon,
  BugReport as DebugIcon,
  Message as MessageIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../utils/auth';

const drawerWidth = 280;

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
  chat: [
    { text: 'Simple Chat', icon: ChatIcon, path: '/chat' },
    { text: 'Threaded Chat', icon: MessageIcon, path: '/threaded-chat' },
    { text: 'WebSocket Test', icon: WebSocketIcon, path: '/websocket-test' },
    { text: 'Chat Debug', icon: DebugIcon, path: '/chat-debug' },
    { text: 'Message Test', icon: MessageIcon, path: '/message-test' },
    { text: 'Simple Test', icon: MessageIcon, path: '/simple-test' },
    { text: 'Simple WebSocket Test', icon: WebSocketIcon, path: '/simple-websocket-test' },
    { text: 'Simple Chat Test', icon: ChatIcon, path: '/simple-chat-test' },
  ],
  admin: [
    { text: 'User Management', icon: AdminIcon, path: '/admin/users', role: 'ADMIN' },
    { text: 'System Settings', icon: SettingsIcon, path: '/admin/settings', role: 'ADMIN' },
  ]
};

function Sidebar({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [expanded, setExpanded] = useState({
    dashboards: true,
    features: true,
    chat: false,
    admin: false
  });

  const handleDrawerClose = () => {
    if (isMobile) {
      onClose();
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

  const renderMenuItem = (item, index) => {
    if (!isItemVisible(item)) return null;
    
    const isActive = location.pathname === item.path;
    
    return (
      <ListItem key={index} disablePadding>
        <ListItemButton
          onClick={() => handleItemClick(item.path)}
          selected={isActive}
          sx={{
            '&.Mui-selected': {
              backgroundColor: theme.palette.primary.light,
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
              },
            },
          }}
        >
          <ListItemIcon>
            <item.icon color={isActive ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText 
            primary={item.text}
            primaryTypographyProps={{
              color: isActive ? 'primary' : 'inherit',
              fontWeight: isActive ? 600 : 400,
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  const renderSection = (title, items, sectionKey) => (
    <Box key={sectionKey}>
      <ListItemButton onClick={() => handleExpandClick(sectionKey)}>
        <ListItemIcon>
          {title === 'Dashboards' && <DashboardIcon />}
          {title === 'Features' && <SettingsIcon />}
          {title === 'Chat & Communication' && <ChatIcon />}
          {title === 'Admin Tools' && <AdminIcon />}
        </ListItemIcon>
        <ListItemText primary={title} />
        {expanded[sectionKey] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={expanded[sectionKey]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((item, index) => renderMenuItem(item, index))}
        </List>
      </Collapse>
    </Box>
  );

  // Only show adminSections if user is ADMIN, and only show dashboards/features/chat for other roles
  const getSidebarSections = (user) => {
    if (user?.role === 'ADMIN') {
      return [
        { title: 'Admin', items: menuItems.adminSections, sectionKey: 'adminSections' },
        { title: 'Dashboards', items: menuItems.dashboards, sectionKey: 'dashboards' },
        { title: 'Features', items: menuItems.features, sectionKey: 'features' },
        { title: 'Chat & Communication', items: menuItems.chat, sectionKey: 'chat' },
      ];
    }
    if (user?.role === 'STUDENT') {
      return [
        { title: 'Student Dashboard', items: menuItems.dashboards.filter(i => i.role === 'STUDENT'), sectionKey: 'studentDashboard' },
        { title: 'Features', items: menuItems.features, sectionKey: 'features' },
        { title: 'Chat & Communication', items: menuItems.chat, sectionKey: 'chat' },
      ];
    }
    if (user?.role === 'TEACHER') {
      return [
        { title: 'Teacher Dashboard', items: menuItems.dashboards.filter(i => i.role === 'TEACHER'), sectionKey: 'teacherDashboard' },
        { title: 'Features', items: menuItems.features, sectionKey: 'features' },
        { title: 'Chat & Communication', items: menuItems.chat, sectionKey: 'chat' },
      ];
    }
    if (user?.role === 'PARENT') {
      return [
        { title: 'Parent Dashboard', items: menuItems.dashboards.filter(i => i.role === 'PARENT'), sectionKey: 'parentDashboard' },
        { title: 'Features', items: menuItems.features, sectionKey: 'features' },
        { title: 'Chat & Communication', items: menuItems.chat, sectionKey: 'chat' },
      ];
    }
    // Default: show only main pages
    return [
      { title: 'Main Pages', items: menuItems.main, sectionKey: 'main' },
    ];
  };

  const drawerContent = (
    <Box sx={{ width: drawerWidth }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" color="primary" fontWeight="bold">
          ePathshala
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Learning Management System
        </Typography>
      </Box>
      
      <List sx={{ pt: 1 }}>
        {/* Main Pages */}
        <Typography variant="overline" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
          Main Pages
        </Typography>
        {menuItems.main.map((item, index) => renderMenuItem(item, index))}
        
        {getSidebarSections(user).map(section => (
          <React.Fragment key={section.sectionKey}>
            <Divider sx={{ my: 2 }} />
            {renderSection(section.title, section.items, section.sectionKey)}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: 1,
            borderColor: 'divider',
          },
          display: { xs: 'none', md: 'block' }
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default React.memo(Sidebar); 