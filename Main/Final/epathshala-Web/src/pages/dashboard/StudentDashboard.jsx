import React from 'react';
import { Grid, Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import StudentOverview from '../../components/dashboard/StudentOverview';
import {
  Assignment as AssignmentIcon,
  Quiz as QuizIcon,
  Grade as GradeIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  Event as EventIcon
} from '@mui/icons-material';

function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const dashboardCards = [
    {
      title: 'My Assignments',
      description: 'View and submit your assignments on time',
      icon: AssignmentIcon,
      path: '/student/assignments',
      color: '#f57c00'
    },
    {
      title: 'My Exams',
      description: 'Take online exams and view your results',
      icon: QuizIcon,
      path: '/student/exams',
      color: '#d32f2f'
    },
    {
      title: 'My Grades',
      description: 'Check your academic performance and grades',
      icon: GradeIcon,
      path: '/student/grades',
      color: '#388e3c'
    },
    {
      title: 'My Attendance',
      description: 'View your attendance records and statistics',
      icon: PersonIcon,
      path: '/student/attendance',
      color: '#1976d2'
    },
    {
      title: 'Leave Requests',
      description: 'Submit and track your leave applications',
      icon: ScheduleIcon,
      path: '/student/leave-requests',
      color: '#7b1fa2'
    },
    {
      title: 'Academic Calendar',
      description: 'View upcoming events and important dates',
      icon: EventIcon,
      path: '/student/calendar',
      color: '#ff9800'
    }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <Box>
      {/* Overview Component */}
      <StudentOverview />
      
      {/* Quick Access Cards */}
      <Box sx={{ mt: { xs: 3, md: 4 } }}>
        <Typography 
          variant="h5" 
          gutterBottom 
          fontWeight="bold"
          sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' } }}
        >
          Quick Access
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            mb: { xs: 2, md: 3 },
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
        >
          Access all your academic tools and stay organized with your studies
        </Typography>
        
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {dashboardCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardActionArea 
                  onClick={() => handleCardClick(card.path)}
                  sx={{ height: '100%', p: { xs: 2, sm: 3 } }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 1.5, sm: 2 } }}>
                      <card.icon sx={{ 
                        fontSize: { xs: 36, sm: 48, md: 48 }, 
                        color: card.color 
                      }} />
                    </Box>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      fontWeight="bold"
                      sx={{ 
                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                        mb: { xs: 1, sm: 1.5 }
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                    >
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default StudentDashboard; 