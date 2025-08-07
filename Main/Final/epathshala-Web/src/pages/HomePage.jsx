import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  School as SchoolIcon,
  Computer as ComputerIcon,
  Group as GroupIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Support as SupportIcon,
  ArrowForward as ArrowForwardIcon,
  PlayArrow as PlayIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer } from '../components/layout';

function HomePage() {
  console.log('HomePage component rendering...');
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const features = [
    {
      icon: SchoolIcon,
      title: 'Interactive Learning',
      description: 'Engage with dynamic content, quizzes, and real-time feedback to enhance your learning experience.'
    },
    {
      icon: ComputerIcon,
      title: 'Online Classes',
      description: 'Join virtual classrooms with high-quality video streaming and interactive whiteboards.'
    },
    {
      icon: GroupIcon,
      title: 'Collaborative Tools',
      description: 'Work together with classmates through forums, group projects, and shared resources.'
    },
    {
      icon: SecurityIcon,
      title: 'Secure Platform',
      description: 'Your data is protected with enterprise-grade security and privacy controls.'
    },
    {
      icon: SpeedIcon,
      title: 'Fast Performance',
      description: 'Optimized for speed with cloud-based infrastructure ensuring smooth operation.'
    },
    {
      icon: SupportIcon,
      title: '24/7 Support',
      description: 'Get help anytime with our comprehensive support system and documentation.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Students' },
    { number: '500+', label: 'Expert Teachers' },
    { number: '50+', label: 'Courses Available' },
    { number: '99.9%', label: 'Uptime' }
  ];

  try {
    return (
      <Box sx={{ minHeight: '100vh' }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: 'white',
            py: { xs: 6, sm: 8, md: 12 },
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h1"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.2,
                    textAlign: { xs: 'center', md: 'left' }
                  }}
                >
                  Transform Your
                  <Box component="span" sx={{ display: 'block', color: 'secondary.main' }}>
                    Learning Journey
                  </Box>
                </Typography>
                
                <Typography
                  variant="h6"
                  sx={{
                    mb: { xs: 3, md: 4 },
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                    textAlign: { xs: 'center', md: 'left' },
                    opacity: 0.9,
                    lineHeight: 1.6
                  }}
                >
                  Experience the future of education with our comprehensive online learning platform. 
                  Connect, collaborate, and excel in your academic pursuits.
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 2, sm: 3 },
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  alignItems: { xs: 'stretch', sm: 'center' }
                }}>
                  <Button
                    variant="contained"
                    size={isSmallMobile ? "medium" : "large"}
                    onClick={() => navigate('/login')}
                    sx={{
                      backgroundColor: 'secondary.main',
                      color: 'white',
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1.5, sm: 2 },
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: 'secondary.dark',
                      }
                    }}
                  >
                    Get Started
                  </Button>
                  
                  <Button
                    variant="outlined"
                    size={isSmallMobile ? "medium" : "large"}
                    onClick={() => navigate('/about')}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1.5, sm: 2 },
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: 'secondary.main',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: { xs: 'center', md: 'flex-end' },
                  mt: { xs: 4, md: 0 }
                }}>
                  <Box
                    sx={{
                      width: { xs: '100%', sm: '80%', md: '100%' },
                      maxWidth: 500,
                      height: { xs: 250, sm: 300, md: 400 },
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <PlayIcon sx={{ fontSize: { xs: 60, sm: 80, md: 100 }, opacity: 0.8 }} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Stats Section */}
        <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: 'grey.50' }}>
          <Container maxWidth="lg">
            <Grid container spacing={{ xs: 2, md: 4 }}>
              {stats.map((stat, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                        fontWeight: 500
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                  mb: 2
                }}
              >
                Why Choose ePathshala?
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  maxWidth: 600,
                  mx: 'auto'
                }}
              >
                Discover the features that make our platform the preferred choice for modern education
              </Typography>
            </Box>
            
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[8]
                      },
                      p: { xs: 2, sm: 3 }
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', p: { xs: 1, sm: 2 } }}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        mb: { xs: 2, sm: 3 }
                      }}>
                        <feature.icon 
                          sx={{ 
                            fontSize: { xs: 40, sm: 50, md: 60 },
                            color: 'primary.main'
                          }} 
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: { xs: 1, sm: 2 },
                          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontSize: { xs: '0.85rem', sm: '0.9rem' },
                          lineHeight: 1.6
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
            color: 'white',
            py: { xs: 6, md: 8 }
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                  mb: { xs: 2, md: 3 }
                }}
              >
                Ready to Start Learning?
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: { xs: 3, md: 4 },
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  opacity: 0.9,
                  maxWidth: 600,
                  mx: 'auto'
                }}
              >
                Join thousands of students who are already transforming their education with ePathshala
              </Typography>
              <Button
                variant="contained"
                size={isSmallMobile ? "large" : "large"}
                onClick={() => navigate('/login')}
                sx={{
                  backgroundColor: 'white',
                  color: 'secondary.main',
                  px: { xs: 4, sm: 6 },
                  py: { xs: 2, sm: 2.5 },
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  }
                }}
              >
                Join Now
                <ArrowForwardIcon sx={{ ml: 1 }} />
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    );
  } catch (error) {
    console.error("Error in HomePage component:", error);
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" color="error">
          Something went wrong
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Please try refreshing the page
        </Typography>
      </Box>
    );
  }
}

export default HomePage; 