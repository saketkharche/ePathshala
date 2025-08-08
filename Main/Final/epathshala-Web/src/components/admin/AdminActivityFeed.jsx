import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Avatar, 
  Chip, 
  Divider,
  IconButton,
  Tooltip,
  useTheme,
  alpha
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  FamilyRestroom as FamilyIcon,
  Event as EventIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  Assignment as AssignmentIcon,
  CalendarToday as CalendarIcon,
  VideoCall as VideoCallIcon,
  Forum as ForumIcon,
  Chat as ChatIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

const AdminActivityFeed = ({ 
  activities = [], 
  title = 'Recent Activity',
  maxHeight = 400,
  showIcons = true,
  showTime = true,
  showActions = false,
  variant = 'default'
}) => {
  const theme = useTheme();

  const getActivityIcon = (type) => {
    const iconMap = {
      'student': SchoolIcon,
      'teacher': PersonIcon,
      'parent': FamilyIcon,
      'event': EventIcon,
      'security': SecurityIcon,
      'settings': SettingsIcon,
      'assignment': AssignmentIcon,
      'calendar': CalendarIcon,
      'online-class': VideoCallIcon,
      'forum': ForumIcon,
      'chat': ChatIcon,
      'default': NotificationsIcon
    };
    return iconMap[type] || iconMap.default;
  };

  const getActivityColor = (type) => {
    const colorMap = {
      'student': '#667eea',
      'teacher': '#f093fb',
      'parent': '#4facfe',
      'event': '#43e97b',
      'security': '#fa709a',
      'settings': '#a8edea',
      'assignment': '#ff9a9e',
      'calendar': '#a8edea',
      'online-class': '#667eea',
      'forum': '#f093fb',
      'chat': '#4facfe',
      'default': '#667eea'
    };
    return colorMap[type] || colorMap.default;
  };

  const variantConfig = {
    default: {
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      itemBackground: 'rgba(255, 255, 255, 0.7)',
      itemBorder: '1px solid rgba(255, 255, 255, 0.2)'
    },
    glass: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      itemBackground: 'rgba(255, 255, 255, 0.1)',
      itemBorder: '1px solid rgba(255, 255, 255, 0.2)'
    },
    dark: {
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      itemBackground: 'rgba(255, 255, 255, 0.1)',
      itemBorder: '1px solid rgba(255, 255, 255, 0.1)'
    }
  };

  const config = variantConfig[variant];

  return (
    <Paper sx={{ 
      p: { xs: 2, sm: 3 },
      height: '100%',
      background: config.background,
      backdropFilter: 'blur(10px)',
      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
    }}>
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 600,
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: variant === 'dark' ? 'white' : 'inherit'
        }}
      >
        <NotificationsIcon />
        {title}
      </Typography>
      
      <Box sx={{ 
        maxHeight: maxHeight, 
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: 6,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: alpha(theme.palette.primary.main, 0.3),
          borderRadius: 3,
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.5),
        },
      }}>
        {activities.length > 0 ? (
          activities.map((activity, index) => {
            const ActivityIcon = getActivityIcon(activity.type);
            const iconColor = getActivityColor(activity.type);
            
            return (
              <Box key={index}>
                <Box 
                  sx={{ 
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: config.itemBackground,
                    backdropFilter: 'blur(10px)',
                    border: config.itemBorder,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateX(4px)',
                      backgroundColor: alpha(config.itemBackground, 1.2),
                      boxShadow: theme.shadows[2]
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    {showIcons && (
                      <Avatar 
                        sx={{ 
                          bgcolor: iconColor,
                          width: 32,
                          height: 32,
                          flexShrink: 0
                        }}
                      >
                        <ActivityIcon sx={{ fontSize: 16 }} />
                      </Avatar>
                    )}
                    
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 500, 
                          mb: 0.5,
                          color: variant === 'dark' ? 'white' : 'inherit'
                        }}
                      >
                        {activity.title}
                      </Typography>
                      
                      {activity.description && (
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            opacity: 0.7,
                            color: variant === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'inherit'
                          }}
                        >
                          {activity.description}
                        </Typography>
                      )}
                      
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1, 
                        mt: 1 
                      }}>
                        {showTime && (
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              opacity: 0.7,
                              color: variant === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'inherit'
                            }}
                          >
                            {activity.time}
                          </Typography>
                        )}
                        
                        {activity.status && (
                          <Chip 
                            label={activity.status} 
                            size="small" 
                            color={activity.status === 'success' ? 'success' : 'default'}
                            sx={{ height: 20, fontSize: '0.75rem' }}
                          />
                        )}
                      </Box>
                    </Box>
                    
                    {showActions && (
                      <Tooltip title="More actions">
                        <IconButton size="small" sx={{ opacity: 0.7 }}>
                          <MoreVertIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Box>
                
                {index < activities.length - 1 && (
                  <Divider sx={{ 
                    my: 1, 
                    opacity: 0.3,
                    borderColor: variant === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'inherit'
                  }} />
                )}
              </Box>
            );
          })
        ) : (
          <Box sx={{ 
            textAlign: 'center', 
            py: 4,
            color: variant === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'inherit'
          }}>
            <NotificationsIcon sx={{ fontSize: 48, opacity: 0.3, mb: 2 }} />
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              No recent activity
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default AdminActivityFeed;
