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
  Divider,
  Avatar
} from '@mui/material';
import {
  People,
  Grade,
  Event,
  Book,
  School
} from '@mui/icons-material';
import axios from 'axios';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);
  const [stats, setStats] = useState({
    children: 0,
    attendance: 0,
    grades: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const childrenRes = await axios.get('http://localhost:8080/ePathshala/api/parents/children');
      setChildren(childrenRes.data);
      setStats({
        children: childrenRes.data.length,
        attendance: childrenRes.data.length * 2, // Mock data
        grades: childrenRes.data.length * 2 // Mock data
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
        Parent Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="My Children"
            value={stats.children}
            icon={<People sx={{ fontSize: 40 }} />}
            color="primary.main"
            onClick={() => navigate('/parent/children')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Attendance Records"
            value={stats.attendance}
            icon={<Book sx={{ fontSize: 40 }} />}
            color="secondary.main"
            onClick={() => navigate('/parent/children')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Grade Reports"
            value={stats.grades}
            icon={<Grade sx={{ fontSize: 40 }} />}
            color="success.main"
            onClick={() => navigate('/parent/children')}
          />
        </Grid>

        {/* Children List */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              My Children
            </Typography>
            {children.length > 0 ? (
              <List>
                {children.map((child, index) => (
                  <React.Fragment key={child.id}>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar>
                          <School />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={child.name}
                        secondary={`Age: ${child.age} • Email: ${child.email}`}
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate('/parent/children')}
                      >
                        View Details
                      </Button>
                    </ListItem>
                    {index < children.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography color="textSecondary" align="center">
                No children found. Please contact the administrator.
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  startIcon={<People />}
                  onClick={() => navigate('/parent/children')}
                  sx={{ height: 60, width: '100%' }}
                >
                  View Children
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  startIcon={<Grade />}
                  onClick={() => navigate('/parent/children')}
                  sx={{ height: 60, width: '100%' }}
                >
                  Check Grades
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  startIcon={<Book />}
                  onClick={() => navigate('/parent/children')}
                  sx={{ height: 60, width: '100%' }}
                >
                  Attendance Report
                </Button>
              </Grid>
              <Grid item xs={12}>
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
      </Grid>
    </Box>
  );
};

export default ParentDashboard; 