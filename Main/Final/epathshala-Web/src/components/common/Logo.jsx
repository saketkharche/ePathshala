import React from 'react';
import { Box, useTheme } from '@mui/material';

const Logo = ({ 
  size = 40, 
  variant = 'default', // 'default', 'minimal', 'text-only'
  color = 'primary',
  sx = {} 
}) => {
  const theme = useTheme();

  const getLogoColor = () => {
    switch (color) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'white':
        return '#ffffff';
      case 'gradient':
        return 'url(#gradient1)';
      default:
        return theme.palette.primary.main;
    }
  };

  const renderDefaultLogo = () => (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background Circle */}
      <circle cx="100" cy="100" r="90" fill="url(#gradient1)" stroke="url(#gradient2)" strokeWidth="4"/>
      
      {/* Book/Pages */}
      <path d="M60 70 L140 70 L140 130 L60 130 Z" fill="url(#gradient3)" stroke="url(#gradient4)" strokeWidth="2"/>
      <path d="M65 75 L135 75 L135 125 L65 125 Z" fill="white" opacity="0.9"/>
      
      {/* Book Lines (Text) */}
      <line x1="70" y1="85" x2="130" y2="85" stroke="url(#gradient5)" strokeWidth="2" strokeLinecap="round"/>
      <line x1="70" y1="95" x2="120" y2="95" stroke="url(#gradient5)" strokeWidth="2" strokeLinecap="round"/>
      <line x1="70" y1="105" x2="125" y2="105" stroke="url(#gradient5)" strokeWidth="2" strokeLinecap="round"/>
      <line x1="70" y1="115" x2="115" y2="115" stroke="url(#gradient5)" strokeWidth="2" strokeLinecap="round"/>
      
      {/* Graduation Cap */}
      <path d="M85 60 L115 60 L115 65 L85 65 Z" fill="url(#gradient6)" stroke="url(#gradient7)" strokeWidth="1"/>
      <path d="M80 65 L120 65 L110 75 L90 75 Z" fill="url(#gradient6)" stroke="url(#gradient7)" strokeWidth="1"/>
      <circle cx="100" cy="70" r="3" fill="url(#gradient8)"/>
      
      {/* Tassel */}
      <line x1="100" y1="75" x2="100" y2="85" stroke="url(#gradient9)" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="100" cy="85" r="4" fill="url(#gradient9)"/>
      
      {/* E Letter (ePathshala) */}
      <path d="M75 140 L125 140 L125 145 L80 145 L80 150 L120 150 L120 155 L80 155 L80 160 L125 160 L125 165 L75 165 Z" fill="url(#gradient10)"/>
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#667eea', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#764ba2', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#f093fb', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#f5576c', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#4facfe', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#00f2fe', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#43e97b', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#38f9d7', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#667eea', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#764ba2', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#fa709a', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#fee140', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="gradient7" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#a8edea', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#fed6e3', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="gradient8" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#ffecd2', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#fcb69f', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="gradient9" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#ff9a9e', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#fecfef', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="gradient10" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#667eea', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#764ba2', stopOpacity: 1}} />
        </linearGradient>
      </defs>
    </svg>
  );

  const renderMinimalLogo = () => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background Circle */}
      <circle cx="16" cy="16" r="15" fill="url(#gradient1)" stroke="url(#gradient2)" strokeWidth="2"/>
      
      {/* Book */}
      <rect x="8" y="10" width="16" height="12" fill="url(#gradient3)" stroke="url(#gradient4)" strokeWidth="1"/>
      <rect x="9" y="11" width="14" height="10" fill="white" opacity="0.9"/>
      
      {/* Book Lines */}
      <line x1="10" y1="14" x2="22" y2="14" stroke="url(#gradient5)" strokeWidth="1" strokeLinecap="round"/>
      <line x1="10" y1="16" x2="20" y2="16" stroke="url(#gradient5)" strokeWidth="1" strokeLinecap="round"/>
      <line x1="10" y1="18" x2="21" y2="18" stroke="url(#gradient5)" strokeWidth="1" strokeLinecap="round"/>
      
      {/* Graduation Cap */}
      <rect x="12" y="8" width="8" height="2" fill="url(#gradient6)"/>
      <path d="M11 10 L21 10 L19 13 L13 13 Z" fill="url(#gradient6)"/>
      <circle cx="16" cy="10" r="1" fill="url(#gradient7)"/>
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#667eea', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#764ba2', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#f093fb', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#f5576c', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#4facfe', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#00f2fe', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#43e97b', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#38f9d7', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#667eea', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#764ba2', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#fa709a', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#fee140', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="gradient7" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#ffecd2', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#fcb69f', stopOpacity: 1}} />
        </linearGradient>
      </defs>
    </svg>
  );

  const renderTextOnly = () => (
    <Box
      sx={{
        fontSize: size * 0.4,
        fontWeight: 700,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        ...sx
      }}
    >
      ePathshala
    </Box>
  );

  const renderLogo = () => {
    switch (variant) {
      case 'minimal':
        return renderMinimalLogo();
      case 'text-only':
        return renderTextOnly();
      default:
        return renderDefaultLogo();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx
      }}
    >
      {renderLogo()}
    </Box>
  );
};

export default Logo;
