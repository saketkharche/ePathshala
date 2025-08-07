import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
  Avatar,
  Collapse,
  Tooltip,
  IconButton,
  Fade
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  Grade as GradeIcon,
  Event as EventIcon,
  VideoCall as VideoCallIcon,
  Quiz as QuizIcon,
  Notifications as NotificationsIcon,
  Forum as ForumIcon,
  Chat as ChatIcon,
  School as SchoolIcon,
  ExpandLess,
  ExpandMore,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../utils/auth';

const SIDEBAR_COLLAPSED_WIDTH = 60;
const SIDEBAR_EXPANDED_WIDTH = 280;

const teacherMenuItems = [
  {
    text: 'Dashboard Overview',
    icon: DashboardIcon,
    path: '/teacher',
    description: 'Main dashboard view'
  },
  {
    text: 'Attendance Management',
    icon: PersonIcon,
    path: '/teacher/attendance',
    description: 'Mark and view student attendance'
  },
  {
    text: 'Grade Management',
    icon: GradeIcon,
    path: '/teacher/grades',
    description: 'Enter and manage student grades'
  },
  {
    text: 'Assignment Management',
    icon: AssignmentIcon,
    path: '/teacher/assignments',
    description: 'Create and manage assignments'
  },
  {
    text: 'Leave Requests',
    icon: NotificationsIcon,
    path: '/teacher/leave-requests',
    description: 'Approve student leave requests'
  },
  {
    text: 'Academic Calendar',
    icon: EventIcon,
    path: '/teacher/calendar',
    description: 'View academic events and schedules'
  },
  {
    text: 'Online Classes',
    icon: VideoCallIcon,
    path: '/teacher/online-classes',
    description: 'Manage online class sessions'
  },
  {
    text: 'Exam Management',
    icon: QuizIcon,
    path: '/teacher/exams',
    description: 'Create and manage exams'
  }
];

const communicationItems = [
  {
    text: 'Forum',
    icon: ForumIcon,
    path: '/teacher/forum',
    description: 'Participate in discussions'
  },
  {
    text: 'Chat',
    icon: ChatIcon,
    path: '/teacher/chat',
    description: 'Real-time messaging'
  },
  {
    text: 'Notifications',
    icon: NotificationsIcon,
    path: '/teacher/notifications',
    description: 'View system notifications'
  }
];

function TeacherSidebar({ open, onClose, collapsed, onCollapse }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [expanded, setExpanded] = useState({ communication: false });

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

  const renderMenuItem = (item, index) => {
    const isActive = location.pathname === item.path;
    return (
      <Tooltip title={collapsed ? item.text : ''} placement="right" key={item.text} arrow disableHoverListener={!collapsed}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleItemClick(item.path)}
            selected={isActive}
            sx={{
              px: 2, py: 1.5, minHeight: 48,
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.light,
                '&:hover': { backgroundColor: theme.palette.primary.light },
              },
              '&:hover': { backgroundColor: theme.palette.action.hover },
            }}
            aria-label={item.text}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 2, justifyContent: 'center' }}>
              <item.icon color={isActive ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <Fade in={!collapsed} timeout={300} unmountOnExit>
              <ListItemText
                primary={item.text}
                secondary={item.description}
                primaryTypographyProps={{
                  color: isActive ? 'primary' : 'inherit',
                  fontWeight: isActive ? 600 : 400,
                }}
                secondaryTypographyProps={{
                  fontSize: '0.75rem',
                  color: isActive ? 'primary' : 'text.secondary',
                }}
              />
            </Fade>
          </ListItemButton>
        </ListItem>
      </Tooltip>
    );
  };

  const renderSection = (title, items, sectionKey) => (
    <Box key={sectionKey}>
      <ListItemButton onClick={() => handleExpandClick(sectionKey)}>
        <ListItemIcon>
          {title === 'Communication' && <ChatIcon />}
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

  const drawerWidth = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH;
  const drawerContent = (
    <Box sx={{ width: drawerWidth, transition: 'width 0.3s' }}>
      {/* Collapse/Expand Button (desktop only) */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-end', p: 1 }}>
        <Tooltip title={collapsed ? 'Expand' : 'Collapse'}>
          <IconButton
            size="small"
            onClick={onCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            sx={{
              transition: 'transform 0.3s',
              transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      <Fade in={!collapsed} timeout={300} unmountOnExit>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            ePathshala
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Teacher Portal
          </Typography>
        </Box>
      </Fade>
      {/* Teacher Profile Section */}
      <Fade in={!collapsed} timeout={300} unmountOnExit>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main }}>
              <SchoolIcon />
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {user?.name || 'Teacher'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Teacher ID: {user?.id}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Fade>
      <List sx={{ pt: 1 }}>
        <Fade in={!collapsed} timeout={300} unmountOnExit>
          <Typography variant="overline" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
            Academic Functions
          </Typography>
        </Fade>
        {teacherMenuItems.map((item, index) => renderMenuItem(item, index))}
        <Divider sx={{ my: 2 }} />
        {renderSection('Communication', communicationItems, 'communication')}
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
            transition: 'width 0.3s',
            overflowX: 'hidden',
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
            width: SIDEBAR_EXPANDED_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default React.memo(TeacherSidebar);
