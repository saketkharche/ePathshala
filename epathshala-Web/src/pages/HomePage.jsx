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

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2
                }}
              >
                Transform Your
                <Box component="span" sx={{ display: 'block', color: 'secondary.light' }}>
                  Learning Journey
                </Box>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontWeight: 300,
                  lineHeight: 1.5
                }}
              >
                Experience the future of education with our comprehensive learning management system. 
                Connect, learn, and grow in a digital environment designed for success.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                    px: 4,
                    py: 1.5
                  }}
                >
                  Get Started
                  <ArrowForwardIcon sx={{ ml: 1 }} />
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayIcon />}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                    px: 4,
                    py: 1.5
                  }}
                >
                  Watch Demo
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: { xs: 300, md: 400 }
                }}
              >
                <SchoolIcon sx={{ fontSize: { xs: 200, md: 300 }, opacity: 0.3 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 6, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h3"
                    component="div"
                    color="primary"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <ResponsiveContainer>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Why Choose ePathshala?
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Our platform combines cutting-edge technology with proven educational 
              methodologies to deliver an exceptional learning experience.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: 'primary.light',
                        color: 'primary.main',
                        mb: 3
                      }}
                    >
                      <feature.icon sx={{ fontSize: 40 }} />
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </ResponsiveContainer>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Ready to Start Learning?
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, opacity: 0.9 }}
          >
            Join thousands of students already using ePathshala to achieve their educational goals.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              px: 6,
              py: 2,
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            Start Your Journey Today
            <ArrowForwardIcon sx={{ ml: 1 }} />
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default React.memo(HomePage); 