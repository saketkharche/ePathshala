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
  Event,
  Book,
  Add
} from '@mui/icons-material';
import axios from 'axios';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    assignments: 0,
    grades: 0,
    leaves: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [assignmentsRes, gradesRes, leavesRes] = await Promise.all([
        axios.get('http://localhost:8080/ePathshala/api/assignments'),
        axios.get('http://localhost:8080/ePathshala/api/grades'),
        axios.get('http://localhost:8080/ePathshala/api/leaveapplications')
      ]);

      setStats({
        assignments: assignmentsRes.data.length,
        grades: gradesRes.data.length,
        leaves: leavesRes.data.length
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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Student Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Assignments"
            value={stats.assignments}
            icon={<Assignment sx={{ fontSize: 40 }} />}
            color="primary.main"
            onClick={() => navigate('/student/assignments')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Grades"
            value={stats.grades}
            icon={<Grade sx={{ fontSize: 40 }} />}
            color="secondary.main"
            onClick={() => navigate('/student/grades')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Leave Applications"
            value={stats.leaves}
            icon={<Event sx={{ fontSize: 40 }} />}
            color="success.main"
            onClick={() => navigate('/student/leave')}
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
                <Button
                  variant="outlined"
                  startIcon={<Assignment />}
                  onClick={() => navigate('/student/assignments')}
                  sx={{ height: 60, width: '100%' }}
                >
                  View Assignments
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  startIcon={<Grade />}
                  onClick={() => navigate('/student/grades')}
                  sx={{ height: 60, width: '100%' }}
                >
                  Check Grades
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={() => navigate('/student/leave')}
                  sx={{ height: 60, width: '100%' }}
                >
                  Apply for Leave
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  startIcon={<Event />}
                  onClick={() => navigate('/calendar')}
                  sx={{ height: 60, width: '100%' }}
                >
                  Academic Calendar
                </Button>
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
                  secondary="Due: 7 days • Mathematics"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Grade color="secondary" />
                </ListItemIcon>
                <ListItemText
                  primary="Mathematics Midterm"
                  secondary="Grade: 85/100 • Excellent work"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Event color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Leave Application"
                  secondary="Status: Pending • Family vacation"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboard; 