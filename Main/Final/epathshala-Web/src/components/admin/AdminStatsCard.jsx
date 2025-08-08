import React from 'react';
import { Card, CardContent, Typography, Box, Chip, useTheme, alpha } from '@mui/material';
import { TrendingUp as TrendingIcon } from '@mui/icons-material';

const AdminStatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  trend, 
  subtitle, 
  trendColor = 'success',
  size = 'medium' 
}) => {
  const theme = useTheme();
  
  const sizeConfig = {
    small: {
      valueSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
      titleSize: { xs: '0.875rem', sm: '1rem' },
      iconSize: { xs: 20, sm: 24, md: 28 },
      iconBoxSize: { xs: 36, sm: 40, md: 44 }
    },
    medium: {
      valueSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
      titleSize: { xs: '1rem', sm: '1.125rem' },
      iconSize: { xs: 24, sm: 28, md: 32 },
      iconBoxSize: { xs: 48, sm: 56, md: 64 }
    },
    large: {
      valueSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
      titleSize: { xs: '1.125rem', sm: '1.25rem' },
      iconSize: { xs: 28, sm: 32, md: 36 },
      iconBoxSize: { xs: 56, sm: 64, md: 72 }
    }
  };

  const config = sizeConfig[size];

  return (
    <Card sx={{
      height: '100%',
      background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.9)} 100%)`,
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease-in-out',
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
      },
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.shadows[8],
        '&::before': {
          transform: 'translateX(100%)',
        }
      }
    }}>
      <CardContent sx={{ 
        p: { xs: 2, sm: 3 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                fontSize: config.valueSize,
                mb: 1,
                lineHeight: 1
              }}
            >
              {value}
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 500,
                fontSize: config.titleSize,
                mb: 0.5
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography 
                variant="body2" 
                sx={{ 
                  opacity: 0.8,
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: config.iconBoxSize,
            height: config.iconBoxSize,
            borderRadius: '50%',
            backgroundColor: alpha('#fff', 0.2),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha('#fff', 0.3)}`
          }}>
            <Icon sx={{ 
              fontSize: config.iconSize,
              opacity: 0.9
            }} />
          </Box>
        </Box>
        
        {trend && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mt: 2,
            opacity: 0.8
          }}>
            <TrendingIcon sx={{ mr: 0.5, fontSize: 16 }} />
            <Chip 
              label={trend} 
              size="small" 
              color={trendColor}
              sx={{ 
                fontSize: '0.75rem',
                height: 20,
                '& .MuiChip-label': {
                  px: 1
                }
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminStatsCard;
