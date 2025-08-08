import React from 'react';
import { Card, CardContent, Typography, Box, useTheme, alpha } from '@mui/material';

const AdminActionCard = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  onClick, 
  disabled = false,
  size = 'medium',
  variant = 'default'
}) => {
  const theme = useTheme();
  
  const sizeConfig = {
    small: {
      iconSize: { xs: 32, sm: 36, md: 40 },
      titleSize: { xs: '0.875rem', sm: '1rem' },
      descSize: { xs: '0.75rem', sm: '0.875rem' },
      padding: { xs: 1.5, sm: 2 }
    },
    medium: {
      iconSize: { xs: 40, sm: 48, md: 56 },
      titleSize: { xs: '1rem', sm: '1.125rem' },
      descSize: { xs: '0.875rem', sm: '1rem' },
      padding: { xs: 2, sm: 3 }
    },
    large: {
      iconSize: { xs: 48, sm: 56, md: 64 },
      titleSize: { xs: '1.125rem', sm: '1.25rem' },
      descSize: { xs: '1rem', sm: '1.125rem' },
      padding: { xs: 2.5, sm: 3.5 }
    }
  };

  const variantConfig = {
    default: {
      background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
      hoverTransform: 'translateY(-4px)',
      hoverShadow: theme.shadows[8]
    },
    outlined: {
      background: 'transparent',
      border: `2px solid ${color}`,
      color: color,
      hoverTransform: 'translateY(-2px)',
      hoverShadow: theme.shadows[4]
    },
    glass: {
      background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`,
      border: `1px solid ${alpha(color, 0.2)}`,
      color: theme.palette.text.primary,
      hoverTransform: 'translateY(-2px)',
      hoverShadow: theme.shadows[6]
    }
  };

  const config = sizeConfig[size];
  const variantStyle = variantConfig[variant];

  return (
    <Card
      onClick={onClick}
      sx={{
        height: '100%',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease-in-out',
        ...variantStyle,
        opacity: disabled ? 0.6 : 1,
        '&:hover': {
          transform: disabled ? 'none' : variantStyle.hoverTransform,
          boxShadow: disabled ? theme.shadows[2] : variantStyle.hoverShadow,
          '& .MuiCardContent-root': {
            transform: 'scale(1.02)',
          }
        },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(45deg, transparent 30%, ${alpha('#fff', 0.1)} 50%, transparent 70%)`,
          transform: 'translateX(-100%)',
          transition: 'transform 0.6s ease-in-out',
          opacity: disabled ? 0 : 1,
        },
        '&:hover::before': {
          transform: 'translateX(100%)',
        }
      }}
    >
      <CardContent sx={{ 
        p: config.padding,
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: 'transform 0.3s ease-in-out'
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mb: 2,
          opacity: 0.9
        }}>
          <Icon sx={{ fontSize: config.iconSize }} />
        </Box>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            mb: 1,
            fontSize: config.titleSize
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            opacity: 0.9,
            fontSize: config.descSize
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AdminActionCard;
