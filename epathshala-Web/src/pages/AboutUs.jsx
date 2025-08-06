import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  useTheme,
  Chip
} from '@mui/material';
import {
  School as SchoolIcon,
  Lightbulb as LightbulbIcon,
  Group as GroupIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Support as SupportIcon,
  TrendingUp as TrendingUpIcon,
  EmojiEvents as EmojiEventsIcon
} from '@mui/icons-material';
import { ResponsiveContainer } from '../components/layout';

function AboutUs() {
  const theme = useTheme();

  const values = [
    {
      icon: SchoolIcon,
      title: 'Excellence in Education',
      description: 'We strive for academic excellence and continuous improvement in all our educational offerings.'
    },
    {
      icon: GroupIcon,
      title: 'Collaboration',
      description: 'Fostering a collaborative environment where students, teachers, and parents work together.'
    },
    {
      icon: SecurityIcon,
      title: 'Security & Privacy',
      description: 'Protecting student data and maintaining the highest standards of privacy and security.'
    },
    {
      icon: SpeedIcon,
      title: 'Innovation',
      description: 'Embracing new technologies to enhance the learning experience and outcomes.'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Executive Officer',
      avatar: 'SJ',
      bio: 'Education technology expert with 15+ years of experience in digital learning platforms.'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      avatar: 'MC',
      bio: 'Software architect specializing in scalable educational technology solutions.'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Head of Academic Affairs',
      avatar: 'ER',
      bio: 'Curriculum specialist with expertise in online learning methodologies.'
    },
    {
      name: 'David Thompson',
      role: 'Head of Student Success',
      avatar: 'DT',
      bio: 'Student experience advocate focused on improving learning outcomes.'
    }
  ];

  const milestones = [
    { year: '2020', title: 'Platform Launch', description: 'ePathshala launched with basic LMS features' },
    { year: '2021', title: '10,000 Students', description: 'Reached our first major milestone of active users' },
    { year: '2022', title: 'Mobile App', description: 'Launched mobile applications for iOS and Android' },
    { year: '2023', title: 'AI Integration', description: 'Introduced AI-powered learning recommendations' },
    { year: '2024', title: 'Global Expansion', description: 'Expanded to serve students in 50+ countries' }
  ];

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <ResponsiveContainer>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            About ePathshala
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}
          >
            We're on a mission to revolutionize education through technology, 
            making quality learning accessible to students worldwide.
          </Typography>
        </Box>

        {/* Mission & Vision */}
        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LightbulbIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Our Mission
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" paragraph>
                To provide accessible, high-quality education through innovative technology, 
                empowering students to achieve their full potential regardless of their location 
                or background.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                We believe that education should be a right, not a privilege, and we're committed 
                to breaking down barriers to learning through our comprehensive digital platform.
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Our Vision
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" paragraph>
                To become the world's leading digital learning platform, connecting millions of 
                students with quality education and creating a global community of lifelong learners.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                We envision a future where every student has access to world-class education 
                through technology that adapts to their individual learning needs and preferences.
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Values */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, textAlign: 'center', mb: 4 }}>
            Our Core Values
          </Typography>
          
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ p: 3, height: '100%', textAlign: 'center' }}>
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
                    <value.icon sx={{ fontSize: 40 }} />
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Team */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, textAlign: 'center', mb: 4 }}>
            Our Leadership Team
          </Typography>
          
          <Grid container spacing={4}>
            {team.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: 'primary.main',
                      fontSize: '1.5rem',
                      fontWeight: 600
                    }}
                  >
                    {member.avatar}
                  </Avatar>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {member.name}
                  </Typography>
                  <Chip
                    label={member.role}
                    color="primary"
                    variant="outlined"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {member.bio}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Milestones */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, textAlign: 'center', mb: 4 }}>
            Our Journey
          </Typography>
          
          <Grid container spacing={3}>
            {milestones.map((milestone, index) => (
              <Grid item xs={12} sm={6} md={2.4} key={index}>
                <Card sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'white',
                      mb: 2
                    }}
                  >
                    <EmojiEventsIcon />
                  </Box>
                  <Typography variant="h5" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                    {milestone.year}
                  </Typography>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {milestone.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {milestone.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Stats */}
        <Box sx={{ bgcolor: 'background.default', p: 6, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, textAlign: 'center', mb: 4 }}>
            Impact by the Numbers
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                  50,000+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Active Students
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                  1,000+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Expert Teachers
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                  200+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Courses Available
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                  50+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Countries Served
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ResponsiveContainer>
    </Box>
  );
}

export default React.memo(AboutUs);