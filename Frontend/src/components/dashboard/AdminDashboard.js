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
  People,
  School,
  Assignment,
  Event,
  Add,
  TrendingUp,
  Notifications
} from '@mui/icons-material';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    parents: 0,
    assignments: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch statistics
      const [studentsRes, teachersRes, parentsRes, assignmentsRes] = await Promise.all([
        axios.get('http://localhost:5129/ePathshala/api/students'),
        axios.get('http://localhost:5129/ePathshala/api/teachers'),
        axios.get('http://localhost:5129/ePathshala/api/parents'),
        axios.get('http://localhost:5129/ePathshala/api/assignments')
      ]);

      setStats({
        students: studentsRes.data.length,
        teachers: teachersRes.data.length,
        parents: parentsRes.data.length,
        assignments: assignmentsRes.data.length
      });

      // Fetch recent activities (last 5 students)
      setRecentActivities(studentsRes.data.slice(0, 5));
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
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Students"
            value={stats.students}
            icon={<People sx={{ fontSize: 40 }} />}
            color="primary.main"
            onClick={() => navigate('/admin/students')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Teachers"
            value={stats.teachers}
            icon={<School sx={{ fontSize: 40 }} />}
            color="secondary.main"
            onClick={() => navigate('/admin/teachers')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Parents"
            value={stats.parents}
            icon={<People sx={{ fontSize: 40 }} />}
            color="success.main"
            onClick={() => navigate('/admin/parents')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Assignments"
            value={stats.assignments}
            icon={<Assignment sx={{ fontSize: 40 }} />}
            color="warning.main"
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
                  title="Add Student"
                  description="Register new student"
                  icon={<Add />}
                  onClick={() => navigate('/admin/students')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <QuickAction
                  title="Add Teacher"
                  description="Register new teacher"
                  icon={<Add />}
                  onClick={() => navigate('/admin/teachers')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <QuickAction
                  title="Academic Calendar"
                  description="Manage events"
                  icon={<Event />}
                  onClick={() => navigate('/calendar')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <QuickAction
                  title="View Reports"
                  description="System analytics"
                  icon={<TrendingUp />}
                  onClick={() => navigate('/admin/students')}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Students
            </Typography>
            <List>
              {recentActivities.map((student, index) => (
                <React.Fragment key={student.id}>
                  <ListItem>
                    <ListItemIcon>
                      <People color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={student.name}
                      secondary={`${student.email} • Age: ${student.age}`}
                    />
                  </ListItem>
                  {index < recentActivities.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard; 