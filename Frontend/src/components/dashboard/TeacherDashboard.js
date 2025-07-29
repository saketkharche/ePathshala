import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  Assignment,
  Grade,
  Book,
  Event,
  Add,
  TrendingUp
} from '@mui/icons-material';
import axios from 'axios';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    assignments: 0,
    grades: 0,
    attendance: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [assignmentsRes, gradesRes, attendanceRes] = await Promise.all([
        axios.get('http://localhost:8080/ePathshala/api/assignments'),
        axios.get('http://localhost:8080/ePathshala/api/grades'),
        axios.get('http://localhost:8080/ePathshala/api/attendance')
      ]);

      setStats({
        assignments: assignmentsRes.data.length,
        grades: gradesRes.data.length,
        attendance: attendanceRes.data.length
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const StatCard = ({ title, value, icon, color, onClick }) => (
    <Card 
      sx={{ 
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? { transform: 'translateY(-2px)', boxShadow: 3 } : {}
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4" component="div" color={color}>
              {value}
            </Typography>
          </Box>
          <Box sx={{ color: color }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const QuickAction = ({ title, description, icon, onClick }) => (
    <Button
      variant="outlined"
      startIcon={icon}
      onClick={onClick}
      sx={{ 
        height: 80, 
        width: '100%', 
        justifyContent: 'flex-start',
        textTransform: 'none',
        fontSize: '1rem'
      }}
    >
      <Box sx={{ textAlign: 'left' }}>
        <Typography variant="subtitle1" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </Box>
    </Button>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Teacher Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Assignments"
            value={stats.assignments}
            icon={<Assignment sx={{ fontSize: 40 }} />}
            color="primary.main"
            onClick={() => navigate('/assignments')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Grades"
            value={stats.grades}
            icon={<Grade sx={{ fontSize: 40 }} />}
            color="secondary.main"
            onClick={() => navigate('/grades')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Attendance"
            value={stats.attendance}
            icon={<Book sx={{ fontSize: 40 }} />}
            color="success.main"
            onClick={() => navigate('/attendance')}
          />
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <QuickAction
                  title="Create Assignment"
                  description="Add new assignment"
                  icon={<Add />}
                  onClick={() => navigate('/assignments')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <QuickAction
                  title="Mark Attendance"
                  description="Record attendance"
                  icon={<Book />}
                  onClick={() => navigate('/attendance')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <QuickAction
                  title="Add Grades"
                  description="Enter student grades"
                  icon={<Grade />}
                  onClick={() => navigate('/grades')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <QuickAction
                  title="Academic Calendar"
                  description="View events"
                  icon={<Event />}
                  onClick={() => navigate('/calendar')}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Assignment color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Mathematics Assignment 1"
                  secondary="Due: 7 days • Class 10A"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Grade color="secondary" />
                </ListItemIcon>
                <ListItemText
                  primary="Midterm Grades Updated"
                  secondary="Mathematics • 15 students"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Book color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Attendance Marked"
                  secondary="Today • Class 10A"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacherDashboard; 