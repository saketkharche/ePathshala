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
  Collapse
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Event as EventIcon,
  Schedule as ScheduleIcon,
  Notifications as NotificationsIcon,
  Forum as ForumIcon,
  Chat as ChatIcon,
  FamilyRestroom as FamilyIcon,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../utils/auth';

const drawerWidth = 280;

const parentMenuItems = [
  {
    text: 'Dashboard Overview',
    icon: DashboardIcon,
    path: '/parent',
    description: 'Main dashboard view'
  },
  {
    text: 'Child Progress',
    icon: PersonIcon,
    path: '/parent/child-progress',
    description: 'Monitor child academic progress'
  },
  {
    text: 'Leave Approvals',
    icon: ScheduleIcon,
    path: '/parent/leave-approvals',
    description: 'Approve child leave requests'
  },
  {
    text: 'Academic Calendar',
    icon: EventIcon,
    path: '/parent/calendar',
    description: 'View academic events and schedules'
  }
];

const communicationItems = [
  {
    text: 'Forum',
    icon: ForumIcon,
    path: '/parent/forum',
    description: 'Participate in discussions'
  },
  {
    text: 'Chat',
    icon: ChatIcon,
    path: '/parent/chat',
    description: 'Real-time messaging'
  },
  {
    text: 'Notifications',
    icon: NotificationsIcon,
    path: '/parent/notifications',
    description: 'View system notifications'
  }
];

function ParentSidebar({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [expanded, setExpanded] = useState({
    communication: false
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

  const renderMenuItem = (item, index) => {
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
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <ListItemIcon>
            <item.icon color={isActive ? 'primary' : 'inherit'} />
          </ListItemIcon>
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
        </ListItemButton>
      </ListItem>
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

  const drawerContent = (
    <Box sx={{ width: drawerWidth }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" color="primary" fontWeight="bold">
          ePathshala
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Parent Portal
        </Typography>
      </Box>

      {/* Parent Profile Section */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main }}>
            <FamilyIcon />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {user?.name || 'Parent'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Parent ID: {user?.id}
            </Typography>
          </Box>
        </Box>
      </Box>
      
      <List sx={{ pt: 1 }}>
        {/* Main Parent Functions */}
        <Typography variant="overline" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
          Parent Functions
        </Typography>
        {parentMenuItems.map((item, index) => renderMenuItem(item, index))}
        
        <Divider sx={{ my: 2 }} />
        
        {/* Communication Section */}
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

export default React.memo(ParentSidebar);
