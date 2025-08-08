import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  useTheme,
  alpha
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Quiz as QuizIcon,
  Grade as GradeIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { useAuth } from '../../../utils/auth';

function StudentProgressPage() {
  const theme = useTheme();
  const { user } = useAuth();
  const [progressData, setProgressData] = useState({
    overallProgress: 85,
    attendancePercentage: 92,
    averageGrade: 87,
    completedAssignments: 24,
    totalAssignments: 30,
    completedExams: 8,
    totalExams: 10,
    subjects: [
      { name: 'Mathematics', progress: 90, grade: 'A', attendance: 95 },
      { name: 'Science', progress: 85, grade: 'B+', attendance: 88 },
      { name: 'English', progress: 92, grade: 'A-', attendance: 96 },
      { name: 'History', progress: 78, grade: 'B', attendance: 85 },
      { name: 'Computer Science', progress: 88, grade: 'A', attendance: 92 }
    ],
    recentActivities: [
      { type: 'assignment', text: 'Submitted Math Assignment #5', date: '2024-01-15', status: 'completed' },
      { type: 'exam', text: 'Completed Science Midterm', date: '2024-01-12', status: 'completed' },
      { type: 'grade', text: 'Received A in English Essay', date: '2024-01-10', status: 'completed' },
      { type: 'attendance', text: 'Present in all classes', date: '2024-01-08', status: 'completed' }
    ]
  });

  const getGradeColor = (grade) => {
    const gradeColors = {
      'A+': 'success',
      'A': 'success',
      'A-': 'success',
      'B+': 'info',
      'B': 'info',
      'B-': 'warning',
      'C+': 'warning',
      'C': 'warning',
      'C-': 'error',
      'D': 'error',
      'F': 'error'
    };
    return gradeColors[grade] || 'default';
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'success';
    if (progress >= 80) return 'info';
    if (progress >= 70) return 'warning';
    return 'error';
  };

  const getActivityIcon = (type) => {
    const icons = {
      assignment: AssignmentIcon,
      exam: QuizIcon,
      grade: GradeIcon,
      attendance: PersonIcon
    };
    return icons[type] || CheckCircleIcon;
  };

  const getActivityColor = (type) => {
    const colors = {
      assignment: theme.palette.primary.main,
      exam: theme.palette.secondary.main,
      grade: theme.palette.success.main,
      attendance: theme.palette.info.main
    };
    return colors[type] || theme.palette.grey[500];
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
          My Academic Progress
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your academic performance, attendance, and overall progress
        </Typography>
      </Box>

      {/* Overall Progress Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ 
                  bgcolor: theme.palette.primary.main, 
                  mr: 2,
                  width: 48,
                  height: 48
                }}>
                  <TrendingUpIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                    {progressData.overallProgress}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Overall Progress
                  </Typography>
                </Box>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={progressData.overallProgress} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: theme.palette.primary.main
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.success.main, 0.05)} 100%)`,
            border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ 
                  bgcolor: theme.palette.success.main, 
                  mr: 2,
                  width: 48,
                  height: 48
                }}>
                  <PersonIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                    {progressData.attendancePercentage}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Attendance Rate
                  </Typography>
                </Box>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={progressData.attendancePercentage} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: alpha(theme.palette.success.main, 0.2),
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: theme.palette.success.main
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.1)} 0%, ${alpha(theme.palette.info.main, 0.05)} 100%)`,
            border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ 
                  bgcolor: theme.palette.info.main, 
                  mr: 2,
                  width: 48,
                  height: 48
                }}>
                  <GradeIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                    {progressData.averageGrade}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Average Grade
                  </Typography>
                </Box>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={progressData.averageGrade} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: alpha(theme.palette.info.main, 0.2),
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: theme.palette.info.main
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.1)} 0%, ${alpha(theme.palette.warning.main, 0.05)} 100%)`,
            border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ 
                  bgcolor: theme.palette.warning.main, 
                  mr: 2,
                  width: 48,
                  height: 48
                }}>
                  <AssignmentIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                    {progressData.completedAssignments}/{progressData.totalAssignments}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Assignments
                  </Typography>
                </Box>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(progressData.completedAssignments / progressData.totalAssignments) * 100} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: alpha(theme.palette.warning.main, 0.2),
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: theme.palette.warning.main
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Subject-wise Progress */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Subject-wise Progress
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {progressData.subjects.map((subject, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {subject.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Chip 
                          label={subject.grade} 
                          size="small" 
                          color={getGradeColor(subject.grade)}
                          variant="outlined"
                        />
                        <Typography variant="body2" color="text.secondary">
                          {subject.progress}%
                        </Typography>
                      </Box>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={subject.progress} 
                      color={getProgressColor(subject.progress)}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        Attendance: {subject.attendance}%
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Recent Activities
              </Typography>
              <List sx={{ p: 0 }}>
                {progressData.recentActivities.map((activity, index) => {
                  const ActivityIcon = getActivityIcon(activity.type);
                  return (
                    <ListItem key={index} sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <ActivityIcon sx={{ color: getActivityColor(activity.type) }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.text}
                        secondary={activity.date}
                        primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                        secondaryTypographyProps={{ variant: 'caption' }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudentProgressPage;
